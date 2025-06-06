/* global process, global, Buffer */
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { google } from "googleapis";
import https from "https";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import cron from "node-cron";
import nodemailer from "nodemailer";

dotenv.config();

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://hung1111:Hung20021@museumassets.0rx4ai2.mongodb.net/?retryWrites=true&w=majority&appName=museumassets"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    // Initialize GridFS
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "assets",
    });
    global.bucket = bucket;
  })
  .catch((err) => console.error("MongoDB connection error:", err));

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

const SERVER_URL =
  process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`;

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

// Send feedback email to admin
const sendFeedbackEmail = (feedbackData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: "Phản hồi mới từ khách hàng - Bảo tàng Thông",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e6e6e6; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Phản hồi mới từ khách hàng</h1>
        </div>
        <div style="padding: 20px;">
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Thông tin người gửi</h3>
            <p><strong>Tên:</strong> ${feedbackData.name}</p>
            <p><strong>Email:</strong> ${feedbackData.email}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Nội dung phản hồi</h3>
            <p>${feedbackData.feedback}</p>
          </div>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// Send confirmation email to customer
const sendFeedbackConfirmation = (feedbackData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: feedbackData.email,
    subject: "Xác nhận phản hồi - Bảo tàng Thông",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e6e6e6; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Xác nhận phản hồi</h1>
        </div>
        <div style="padding: 20px;">
          <p>Xin chào ${feedbackData.name},</p>
          <p>Cảm ơn bạn đã gửi phản hồi cho Bảo tàng Thông. Chúng tôi đã nhận được phản hồi của bạn và sẽ xem xét trong thời gian sớm nhất.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Nội dung phản hồi của bạn</h3>
            <p>${feedbackData.feedback}</p>
          </div>
          
          <p>Nếu cần thiết, chúng tôi sẽ liên hệ với bạn qua email để trao đổi thêm.</p>
          <p>Trân trọng,<br>Đội ngũ Bảo tàng Thông</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// Send experience booking confirmation email to customer
const sendExperienceBookingEmail = (bookingData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: bookingData.email,
    subject: "Xác nhận đặt vé trải nghiệm tại Bảo tàng Thông (Musée Du Pin)",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e6e6e6; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #2c2f11, #3d4016); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Xác nhận đặt vé trải nghiệm</h1>
        </div>
        <div style="padding: 20px;">
          <p>Xin chào <strong>${bookingData.name}</strong>,</p>
          <p>Cảm ơn bạn đã đặt vé trải nghiệm tại Bảo tàng Thông (Musée Du Pin). Dưới đây là thông tin đặt vé của bạn:</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c2f11; margin-top: 0;">Chi tiết đặt vé</h3>
            <p><strong>Gói trải nghiệm:</strong> ${bookingData.package}</p>
            <p><strong>Ngày tham quan:</strong> ${new Date(
              bookingData.date
            ).toLocaleDateString("vi-VN")}</p>
            <p><strong>Giờ tham quan:</strong> ${bookingData.time}</p>
            <p><strong>Số lượng khách:</strong> ${bookingData.guests} người</p>
            <p><strong>Giá vé:</strong> ${bookingData.price}</p>
            ${
              bookingData.specialRequests
                ? `<p><strong>Yêu cầu đặc biệt:</strong> ${bookingData.specialRequests}</p>`
                : ""
            }
          </div>
          
          <p>Chúng tôi rất mong được đón tiếp bạn tại Bảo tàng Thông (Musée Du Pin).</p>
          <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua:</p>
          <ul style="list-style: none; padding-left: 0;">
            <li>📞 Hotline: +84 86 235 6368</li>
            <li>📧 Email: info@museedupin.com</li>
          </ul>
          
          <p style="margin-top: 30px;">Trân trọng,<br>Đội ngũ Bảo tàng Thông (Musée Du Pin)</p>
        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 10px 10px;">
          © 2024 Bảo tàng Thông (Musée Du Pin). Tất cả các quyền được bảo lưu.
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// Send experience booking notification to admin
const sendExperienceBookingAdminEmail = (bookingData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: "Có đặt vé trải nghiệm mới tại Bảo tàng Thông",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e6e6e6; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #2c2f11, #3d4016); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Đặt vé trải nghiệm mới</h1>
        </div>
        <div style="padding: 20px;">
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c2f11; margin-top: 0;">Thông tin khách hàng</h3>
            <p><strong>Tên:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Số điện thoại:</strong> ${bookingData.phone}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c2f11; margin-top: 0;">Chi tiết đặt vé</h3>
            <p><strong>Gói trải nghiệm:</strong> ${bookingData.package}</p>
            <p><strong>Ngày tham quan:</strong> ${new Date(
              bookingData.date
            ).toLocaleDateString("vi-VN")}</p>
            <p><strong>Giờ tham quan:</strong> ${bookingData.time}</p>
            <p><strong>Số lượng khách:</strong> ${bookingData.guests} người</p>
            <p><strong>Giá vé:</strong> ${bookingData.price}</p>
            ${
              bookingData.specialRequests
                ? `<p><strong>Yêu cầu đặc biệt:</strong> ${bookingData.specialRequests}</p>`
                : ""
            }
          </div>
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
    await Promise.all([
      sendCustomerEmail(bookingData),
      sendAdminEmail(bookingData),
    ]);

    res.status(200).json({
      success: true,
      message: "Booking saved successfully and email notifications sent.",
      sheetsResponse: sheetsResponse.data,
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

// API endpoint để xử lý phản hồi
app.post("/api/feedback", async (req, res) => {
  const feedbackData = req.body;

  try {
    // Lưu vào Google Sheets
    const row = [
      new Date().toISOString(), // Timestamp
      feedbackData.name,
      feedbackData.email,
      feedbackData.feedback,
      "New", // Status
    ];

    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: "Feedback!A:E",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [row],
      },
    };

    // Gửi dữ liệu tới Google Sheets
    await sheets.spreadsheets.values.append(request);

    // Gửi email xác nhận
    await Promise.all([
      sendFeedbackEmail(feedbackData),
      sendFeedbackConfirmation(feedbackData),
    ]);

    res.status(200).json({
      success: true,
      message: "Feedback received and processed successfully",
    });
  } catch (error) {
    console.error("Error processing feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process feedback",
      error: error.message,
    });
  }
});

// API endpoints for assets
app.post("/api/assets/upload", async (req, res) => {
  try {
    if (!global.bucket) {
      return res.status(503).json({
        success: false,
        message: "Asset storage not initialized. Please try again later.",
      });
    }
    const { file, metadata } = req.body;
    const buffer = Buffer.from(file.split(",")[1], "base64");

    const uploadStream = global.bucket.openUploadStream(metadata.filename, {
      metadata: metadata,
    });

    uploadStream.write(buffer);
    uploadStream.end();

    uploadStream.on("finish", (file) => {
      res.status(200).json({
        success: true,
        fileId: file._id,
        filename: file.filename,
        url: `${SERVER_URL}/api/assets/${file.filename}`,
      });
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload file",
    });
  }
});

app.get("/api/assets/:filename", async (req, res) => {
  try {
    if (!global.bucket) {
      return res.status(503).json({
        success: false,
        message: "Asset storage not initialized. Please try again later.",
      });
    }
    const filename = req.params.filename;
    const files = await global.bucket.find({ filename }).toArray();

    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const downloadStream = global.bucket.openDownloadStream(files[0]._id);
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({
      success: false,
      message: "Failed to download file",
    });
  }
});

app.get("/api/assets", async (req, res) => {
  try {
    if (!global.bucket) {
      return res.status(503).json({
        success: false,
        message: "Asset storage not initialized. Please try again later.",
      });
    }
    const files = await global.bucket.find().toArray();
    res.status(200).json({
      success: true,
      files: files.map((file) => ({
        id: file._id,
        filename: file.filename,
        metadata: file.metadata,
        url: `${SERVER_URL}/api/assets/${file.filename}`,
      })),
    });
  } catch (error) {
    console.error("Error listing files:", error);
    res.status(500).json({
      success: false,
      message: "Failed to list files",
    });
  }
});

// API endpoint for experience package bookings
app.post("/api/experience-bookings", async (req, res) => {
  const bookingData = req.body;

  try {
    // Save to Google Sheets
    const row = [
      new Date().toISOString(), // Timestamp
      bookingData.package, // Experience package name
      bookingData.name, // Customer name
      bookingData.email, // Email
      bookingData.phone, // Phone
      bookingData.date, // Visit date
      bookingData.guests, // Number of guests
      bookingData.price, // Price
      bookingData.specialRequests || "", // Special requests
      "New", // Status
    ];

    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: "Bookings!A:M",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [row],
      },
    };

    // Send data to Google Sheets
    const sheetsResponse = await sheets.spreadsheets.values.append(request);

    // Send confirmation emails
    await Promise.all([
      sendExperienceBookingEmail(bookingData),
      sendExperienceBookingAdminEmail(bookingData),
    ]);

    res.status(200).json({
      success: true,
      message:
        "Experience booking saved successfully and email notifications sent.",
      sheetsResponse: sheetsResponse.data,
    });
  } catch (error) {
    console.error("Error processing experience booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process experience booking",
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
