import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { google } from "googleapis";
import https from "https";
import cron from "node-cron";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://museedupin.netlify.app"],
  })
);

// Google Sheets API setup
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, "\n") : "",
  SCOPES
);
const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.SHEET_ID;

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email to customer
const sendCustomerEmail = (bookingData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: bookingData.email,
    subject: "Xác nhận đặt phòng tại Bảo tàng Thông (Musée Du Pin)",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e6e6e6; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Xác nhận đặt phòng</h1>
        </div>
        <div style="padding: 20px;">
          <p>Xin chào <strong>${bookingData.name}</strong>,</p>
          <p>Cảm ơn bạn đã đặt phòng tại Bảo tàng Thông (Musée Du Pin). Dưới đây là thông tin đặt phòng của bạn:</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Chi tiết đặt phòng</h3>
            <p><strong>Homestay:</strong> ${bookingData.homestay}</p>
            <p><strong>Ngày nhận phòng:</strong> ${new Date(
              bookingData.checkIn
            ).toLocaleDateString()}</p>
            <p><strong>Giờ nhận phòng:</strong> ${
              bookingData.selectedTime || "Chưa chọn"
            }</p>
            <p><strong>Ngày trả phòng:</strong> ${new Date(
              bookingData.checkOut
            ).toLocaleDateString()}</p>
            <p><strong>Số đêm:</strong> ${bookingData.nights}</p>
            <p><strong>Số khách:</strong> ${bookingData.guests}</p>
            <p><strong>Tổng giá tiền:</strong> $${bookingData.totalPrice}</p>
          </div>
          
          <p>Chúng tôi rất mong được đón tiếp bạn tại homestay của Bảo tàng Thông (Musée Du Pin).</p>
          <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email này.</p>
          
          <p style="margin-top: 30px;">Trân trọng,<br>Đội ngũ Bảo tàng Thông (Musée Du Pin)</p>
        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 10px 10px;">
          © 2023 Bảo tàng Thông (Musée Du Pin). Tất cả các quyền được bảo lưu.
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// Send email to admin
const sendAdminEmail = (bookingData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: "Có đặt phòng mới tại Bảo tàng Thông (Musée Du Pin)",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e6e6e6; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Đặt phòng mới</h1>
        </div>
        <div style="padding: 20px;">
          <p>Có một đặt phòng mới với thông tin như sau:</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Thông tin khách hàng</h3>
            <p><strong>Tên:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Số điện thoại:</strong> ${bookingData.phone}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Chi tiết đặt phòng</h3>
            <p><strong>Homestay:</strong> ${bookingData.homestay}</p>
            <p><strong>Ngày nhận phòng:</strong> ${new Date(
              bookingData.checkIn
            ).toLocaleDateString()}</p>
            <p><strong>Giờ nhận phòng:</strong> ${
              bookingData.selectedTime || "Chưa chọn"
            }</p>
            <p><strong>Ngày trả phòng:</strong> ${new Date(
              bookingData.checkOut
            ).toLocaleDateString()}</p>
            <p><strong>Số đêm:</strong> ${bookingData.nights}</p>
            <p><strong>Số khách:</strong> ${bookingData.guests}</p>
            <p><strong>Tổng giá tiền:</strong> $${bookingData.totalPrice}</p>
            <p><strong>Yêu cầu đặc biệt:</strong> ${
              bookingData.specialRequests || "Không có"
            }</p>
          </div>
          
          <p>Vui lòng liên hệ khách hàng để xác nhận đặt phòng.</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// API endpoint để xử lý đặt phòng
app.post("/api/bookings", async (req, res) => {
  const bookingData = req.body;

  try {
    // Lưu vào Google Sheets
    const row = [
      new Date().toISOString(), // Timestamp
      bookingData.homestay, // Homestay name
      bookingData.name, // Customer name
      bookingData.email, // Email
      bookingData.phone, // Phone
      bookingData.checkIn, // Check-in date
      bookingData.selectedTime || "", // Check-in time
      bookingData.checkOut, // Check-out date
      bookingData.guests, // Number of guests
      bookingData.nights, // Number of nights
      bookingData.totalPrice, // Total price
      bookingData.specialRequests || "", // Special requests
      "New", // Status
    ];

    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: "Bookings!A:M", // Updated to include time column
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [row],
      },
    };

    // Gửi dữ liệu tới Google Sheets
    const sheetsResponse = await sheets.spreadsheets.values.append(request);

    // Gửi email xác nhận
    const [customerEmailResponse, adminEmailResponse] = await Promise.all([
      sendCustomerEmail(bookingData),
      sendAdminEmail(bookingData),
    ]);

    res.status(200).json({
      success: true,
      message: "Booking saved successfully and email notifications sent.",
      sheetsResponse: sheetsResponse.data,
      emailResponse: {
        customerEmailSent: true,
        adminEmailSent: true,
      },
    });
  } catch (error) {
    console.error("Error processing booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process booking",
      error: error.message,
    });
  }
});

// API endpoint để lấy các time slots còn trống
app.get("/api/available-slots", async (req, res) => {
  const { date } = req.query;

  // In a real application, you would check database/sheets for bookings
  // Here we'll return a simulated availability response
  try {
    // Sample data - in production would come from database
    const morningSlots = ["11h00", "11h30", "12h00", "12h30"];
    const afternoonSlots = [
      "13h00",
      "13h30",
      "14h00",
      "14h30",
      "15h00",
      "15h30",
      "16h00",
      "16h30",
    ];

    // Simulate some slots being limited or unavailable
    let limitedSlots = [];
    let unavailableSlots = [];

    // Just for demo - make the first slot limited availability and last one unavailable
    if (date) {
      const dayOfWeek = new Date(date).getDay();

      // Make different slots limited based on the day of week
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekend
        limitedSlots = ["11h00", "14h00"];
        unavailableSlots = ["16h30"];
      } else {
        // Weekday
        limitedSlots = ["12h30"];
        unavailableSlots = ["15h30"];
      }
    }

    res.status(200).json({
      success: true,
      data: {
        date,
        slots: {
          morning: morningSlots,
          afternoon: afternoonSlots,
        },
        limitedAvailability: limitedSlots,
        unavailable: unavailableSlots,
      },
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch available time slots",
      error: error.message,
    });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Booking Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Cron job to ping server every 5 minutes (để giữ server không bị ngủ nếu host trên Render hoặc Heroku)
cron.schedule("*/5 * * * *", () => {
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000";

  if (serverUrl.startsWith("https")) {
    https
      .get(serverUrl, (res) => {
        if (res.statusCode === 200) {
          console.log("Server pinged successfully to prevent sleep.");
        } else {
          console.error(
            `Server ping failed with status code: ${res.statusCode}`
          );
        }
      })
      .on("error", (error) => {
        console.error("Error pinging server:", error);
      });
  }
});
