/* global process, global, Buffer */
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
import express from "express";
import { google } from "googleapis";
import https from "https";
import jwt from "jsonwebtoken";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import cron from "node-cron";
import nodemailer from "nodemailer";
import User from "./models/User.js";

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
    origin: [
      "http://localhost:5173",
      "https://museedupin.netlify.app",
      "https://online-museeduphin.netlify.app",
      "https://ticket-museeduphin.netlify.app",
    ],
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
const sendExperienceBookingEmail = async (bookingData) => {
  const paymentMethodText = {
    bank: "Chuyển khoản ngân hàng",
    cash: "Tiền mặt",
    paypal: "PayPal (Đã thanh toán)",
  };

  const paymentStatusText =
    bookingData.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán";

  const emailContent = `
    <h2>Xác nhận đặt vé tại Musée Du Pin</h2>
    <p>Cảm ơn bạn đã đặt vé tại Musée Du Pin. Dưới đây là chi tiết đơn hàng của bạn:</p>
    
    <h3>Thông tin đơn hàng</h3>
    <p>Mã đơn hàng: ${bookingData.id}</p>
    <p>Gói trải nghiệm: ${bookingData.packageId || "Không xác định"}</p>
    <p>Ngày: ${new Date(bookingData.selectedDate).toLocaleDateString(
      "vi-VN"
    )}</p>
    <p>Thời gian: ${bookingData.selectedTime}</p>
    <p>Số lượng: ${bookingData.tickets.reduce(
      (total, ticket) => total + (ticket.quantity || 0),
      0
    )} người</p>
    <p>Tổng tiền: ${bookingData.totalAmount?.toLocaleString() || 0}đ</p>
    <p>Phương thức thanh toán: ${
      paymentMethodText[bookingData.paymentMethod] || "Không xác định"
    }</p>
    <p>Trạng thái thanh toán: ${paymentStatusText}</p>
    ${
      bookingData.paypalOrderId
        ? `<p>Mã giao dịch PayPal: ${bookingData.paypalOrderId}</p>`
        : ""
    }
    
    <h3>Thông tin liên hệ</h3>
    <p>Họ tên: ${bookingData.userInfo?.fullName || "Không xác định"}</p>
    <p>Số điện thoại: ${bookingData.userInfo?.phone || "Không xác định"}</p>
    <p>Email: ${bookingData.userInfo?.email || "Không xác định"}</p>
    
    <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua số điện thoại: +84 86 235 6368</p>
  `;

  await sendEmail({
    to: bookingData.userInfo?.email,
    subject: `Xác nhận đặt vé - ${bookingData.id}`,
    html: emailContent,
  });
};

// Send experience booking notification to admin
const sendExperienceBookingAdminEmail = async (bookingData) => {
  const paymentMethodText = {
    bank: "Chuyển khoản ngân hàng",
    cash: "Tiền mặt",
    paypal: "PayPal (Đã thanh toán)",
  };

  const paymentStatusText =
    bookingData.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán";

  const emailContent = `
    <h2>Đơn đặt vé mới tại Musée Du Pin</h2>
    
    <h3>Thông tin đơn hàng</h3>
    <p>Mã đơn hàng: ${bookingData.id}</p>
    <p>Gói trải nghiệm: ${
      bookingData.packageData?.title ||
      bookingData.packageId ||
      "Không xác định"
    }</p>
    <p>Ngày: ${new Date(bookingData.selectedDate).toLocaleDateString(
      "vi-VN"
    )}</p>
    <p>Thời gian: ${bookingData.selectedTime}</p>
    <p>Số lượng: ${bookingData.tickets.reduce(
      (total, ticket) => total + (ticket.quantity || 0),
      0
    )} người</p>
    <p>Tổng tiền: ${bookingData.totalAmount?.toLocaleString() || 0}đ</p>
    <p>Phương thức thanh toán: ${
      paymentMethodText[bookingData.paymentMethod] || "Không xác định"
    }</p>
    <p>Trạng thái thanh toán: ${paymentStatusText}</p>
    ${
      bookingData.paypalOrderId
        ? `<p>Mã giao dịch PayPal: ${bookingData.paypalOrderId}</p>`
        : ""
    }
    
    <h3>Thông tin khách hàng</h3>
    <p>Họ tên: ${bookingData.userInfo?.fullName || "Không xác định"}</p>
    <p>Số điện thoại: ${bookingData.userInfo?.phone || "Không xác định"}</p>
    <p>Email: ${bookingData.userInfo?.email || "Không xác định"}</p>
    
    <p>Vui lòng kiểm tra và xác nhận đơn hàng trong hệ thống quản lý.</p>
  `;

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `Đơn đặt vé mới - ${bookingData.id}`,
    html: emailContent,
  });
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

// API endpoint để xử lý đặt vé trải nghiệm
app.post("/api/experience-bookings", async (req, res) => {
  try {
    const bookingData = req.body;

    // Validate bookingId
    if (!bookingData.id) {
      throw new Error("Missing booking ID");
    }

    // Lưu booking vào database hoặc storage
    await saveBooking(bookingData);

    // Gửi email xác nhận
    await Promise.all([
      sendExperienceBookingEmail(bookingData),
      sendExperienceBookingAdminEmail(bookingData),
    ]);

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      bookingId: bookingData.id,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
});

// Authentication APIs
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, fullName, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email đã được sử dụng",
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      fullName,
      phone,
      address,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET ||
        "cf24ff8c036b8c2d16f546bcb923d7f90bc2f8d63ae8603bd525380795a6ae81185456896d4522356d250849823f28179b3c0f708a6aceeb420cf87ff863357c6a87d8b93423418803663ddd85f407580817314b8e8dbd29205ab2e27cf78cfe5e34c9fde7d6458b024696c80bff9bdf73df4b314c4d8b4f9a7a7ddf22c678700d12857a91b1b2bc3f5e803057bc9b585b02129e4bb455f6d9d7c2ac1b6df69a8d9f74c120973cf26d28e851068ca3f0d823b25c94917fa3edf6c871bd04b68c9693a7c6375307acab1688287574dca58530df0ee44ee9109c30b626d5318726774341bfd233e90c1950c4ab9ae7d373940cfb173308f5db1d697a8a1de821bf",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Đăng ký thất bại",
      error: error.message,
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Đăng nhập thất bại",
      error: error.message,
    });
  }
});

app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email không tồn tại trong hệ thống",
      });
    }

    // Generate 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetToken = await bcrypt.hash(resetCode, 10);

    // Save reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email with reset code
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Đặt lại mật khẩu - Musée Du Pin",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Đặt lại mật khẩu</h2>
          <p>Bạn đã yêu cầu đặt lại mật khẩu. Đây là mã xác nhận của bạn:</p>
          <h1 style="color: #2c2f11; font-size: 32px; letter-spacing: 5px;">${resetCode}</h1>
          <p>Mã này sẽ hết hạn sau 1 giờ.</p>
          <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Mã xác nhận đã được gửi đến email của bạn",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Không thể gửi mã xác nhận",
      error: error.message,
    });
  }
});

app.post("/api/auth/verify-reset-code", async (req, res) => {
  try {
    const { email, resetCode } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Mã xác nhận đã hết hạn hoặc không hợp lệ",
      });
    }

    const isValidCode = await bcrypt.compare(
      resetCode,
      user.resetPasswordToken
    );
    if (!isValidCode) {
      return res.status(400).json({
        success: false,
        message: "Mã xác nhận không đúng",
      });
    }

    res.json({
      success: true,
      message: "Mã xác nhận hợp lệ",
    });
  } catch (error) {
    console.error("Verify reset code error:", error);
    res.status(500).json({
      success: false,
      message: "Không thể xác thực mã",
      error: error.message,
    });
  }
});

app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Mã xác nhận đã hết hạn hoặc không hợp lệ",
      });
    }

    const isValidCode = await bcrypt.compare(
      resetCode,
      user.resetPasswordToken
    );
    if (!isValidCode) {
      return res.status(400).json({
        success: false,
        message: "Mã xác nhận không đúng",
      });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Mật khẩu đã được cập nhật thành công",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Không thể cập nhật mật khẩu",
      error: error.message,
    });
  }
});

// API endpoint để lấy thông tin user
app.get("/api/user/info", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy token xác thực",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin người dùng",
      error: error.message,
    });
  }
});

// API endpoint để cập nhật địa chỉ
app.put("/api/user/update-address", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy token xác thực",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    user.address = req.body.address;
    await user.save();

    res.json({
      success: true,
      message: "Cập nhật địa chỉ thành công",
      address: user.address,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật địa chỉ",
      error: error.message,
    });
  }
});

// API endpoint để tạo đơn hàng mới
app.post("/api/orders", async (req, res) => {
  try {
    const {
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      discountInfo,
    } = req.body;

    // Tạo mã đơn hàng
    const orderCode = `ORDER${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Lưu vào Google Sheets
    const row = [
      new Date().toISOString(), // Timestamp
      orderCode, // Mã đơn hàng
      userId, // ID người dùng
      JSON.stringify(items), // Danh sách sản phẩm
      totalAmount, // Tổng tiền
      JSON.stringify(shippingAddress), // Địa chỉ giao hàng
      paymentMethod, // Phương thức thanh toán
      "Pending", // Trạng thái
      discountInfo ? JSON.stringify(discountInfo) : "", // Thông tin giảm giá
    ];

    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: "Bookings!A:I",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [row],
      },
    };

    await sheets.spreadsheets.values.append(request);

    // Gửi email xác nhận
    const user = await User.findById(userId);
    if (user) {
      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const discountAmount = discountInfo?.applied
        ? subtotal * discountInfo.rate
        : 0;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Xác nhận đơn hàng - Musée Du Pin",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Xác nhận đơn hàng</h2>
            <p>Cảm ơn bạn đã đặt hàng tại Musée Du Pin. Dưới đây là thông tin đơn hàng của bạn:</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Mã đơn hàng:</strong> ${orderCode}</p>
              <p><strong>Tạm tính:</strong> ${subtotal.toLocaleString()}đ</p>
              ${
                discountInfo?.applied
                  ? `
              <p style="color: #28a745"><strong>Giảm giá (${
                discountInfo.rate * 100
              }%):</strong> -${discountAmount.toLocaleString()}đ</p>
              `
                  : ""
              }
              <p><strong>Tổng tiền:</strong> ${totalAmount.toLocaleString()}đ</p>
              <p><strong>Phương thức thanh toán:</strong> ${
                paymentMethod === "bank" ? "Chuyển khoản ngân hàng" : "Tiền mặt"
              }</p>
            </div>

            <div style="margin-top: 20px;">
              <h3>Địa chỉ giao hàng:</h3>
              <p>${shippingAddress.street}</p>
              <p>${shippingAddress.city}, ${shippingAddress.state}</p>
            </div>

            <div style="margin-top: 20px;">
              <h3>Danh sách sản phẩm:</h3>
              ${items
                .map(
                  (item) => `
                <div style="margin-bottom: 10px;">
                  <p><strong>${item.name}</strong></p>
                  <p>Số lượng: ${item.quantity}</p>
                  <p>Giá: ${item.price.toLocaleString()}đ</p>
                  <p>Thành tiền: ${(
                    item.price * item.quantity
                  ).toLocaleString()}đ</p>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      // Gửi email thông báo cho admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: "Đơn hàng mới - Musée Du Pin",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Đơn hàng mới</h2>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Mã đơn hàng:</strong> ${orderCode}</p>
              <p><strong>Khách hàng:</strong> ${user.fullName}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Số điện thoại:</strong> ${user.phone}</p>
              <p><strong>Tạm tính:</strong> ${subtotal.toLocaleString()}đ</p>
              ${
                discountInfo?.applied
                  ? `
              <p style="color: #28a745"><strong>Giảm giá (${
                discountInfo.rate * 100
              }%):</strong> -${discountAmount.toLocaleString()}đ</p>
              <p><strong>Mã giảm giá đã sử dụng:</strong> ${
                discountInfo.code
              }</p>
              `
                  : ""
              }
              <p><strong>Tổng tiền:</strong> ${totalAmount.toLocaleString()}đ</p>
              <p><strong>Phương thức thanh toán:</strong> ${
                paymentMethod === "bank" ? "Chuyển khoản ngân hàng" : "Tiền mặt"
              }</p>
            </div>

            <div style="margin-top: 20px;">
              <h3>Địa chỉ giao hàng:</h3>
              <p>${shippingAddress.street}</p>
              <p>${shippingAddress.city}, ${shippingAddress.state}</p>
            </div>

            <div style="margin-top: 20px;">
              <h3>Danh sách sản phẩm:</h3>
              ${items
                .map(
                  (item) => `
                <div style="margin-bottom: 10px;">
                  <p><strong>${item.name}</strong></p>
                  <p>Số lượng: ${item.quantity}</p>
                  <p>Giá: ${item.price.toLocaleString()}đ</p>
                  <p>Thành tiền: ${(
                    item.price * item.quantity
                  ).toLocaleString()}đ</p>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `,
      };

      await transporter.sendMail(adminMailOptions);
    }

    res.status(200).json({
      success: true,
      message: "Đơn hàng đã được tạo thành công",
      orderCode,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo đơn hàng",
      error: error.message,
    });
  }
});

// API endpoint để cập nhật trạng thái đơn hàng
app.put("/api/orders/:orderCode", async (req, res) => {
  try {
    const { orderCode } = req.params;
    const { status } = req.body;

    // Cập nhật trạng thái trong Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Bookings!A:H",
    });

    const rows = response.data.values;
    const orderIndex = rows.findIndex((row) => row[1] === orderCode);

    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const updateRequest = {
      spreadsheetId: SPREADSHEET_ID,
      range: `Bookings!H${orderIndex + 1}`,
      valueInputOption: "RAW",
      resource: {
        values: [[status]],
      },
    };

    await sheets.spreadsheets.values.update(updateRequest);

    res.json({
      success: true,
      message: "Cập nhật trạng thái đơn hàng thành công",
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật trạng thái đơn hàng",
      error: error.message,
    });
  }
});

// API endpoint để lấy danh sách đơn hàng của user
app.get("/api/orders", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy token xác thực",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // Lấy danh sách đơn hàng từ Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Orders!A:Z",
    });

    const rows = response.data.values || [];
    const orders = rows
      .filter((row) => row[2] === user.id.toString()) // Lọc theo userId
      .map((row) => ({
        orderCode: row[1],
        items: JSON.parse(row[3] || "[]"),
        totalAmount: parseFloat(row[4] || 0),
        shippingAddress: JSON.parse(row[5] || "{}"),
        paymentMethod: row[6],
        status: row[7],
        createdAt: row[0],
      }))
      .reverse(); // Sắp xếp mới nhất lên đầu

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách đơn hàng",
      error: error.message,
    });
  }
});

// API endpoint để xóa đơn hàng
app.delete("/api/orders/:orderCode", async (req, res) => {
  try {
    const { orderCode } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy token xác thực",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // Lấy dữ liệu hiện tại
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Bookings!A:H",
    });

    const rows = response.data.values;
    const orderIndex = rows.findIndex(
      (row) => row[1] === orderCode && row[2] === user.id.toString()
    );

    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng hoặc không có quyền xóa",
      });
    }

    // Xóa dòng trong Google Sheets
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // Giả sử sheet Orders có ID là 0
                dimension: "ROWS",
                startIndex: orderIndex,
                endIndex: orderIndex + 1,
              },
            },
          },
        ],
      },
    });

    res.json({
      success: true,
      message: "Đã xóa đơn hàng thành công",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa đơn hàng",
      error: error.message,
    });
  }
});

// VNPAY Return URL handler
app.get("/api/vnpay-return", async (req, res) => {
  try {
    const vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];

    // Remove hash and hash type from params
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    // Sort params by field name
    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((acc, key) => {
        if (vnp_Params[key] !== undefined && vnp_Params[key] !== null) {
          acc[key] = vnp_Params[key];
        }
        return acc;
      }, {});

    // Create signature
    const secretKey = "V78RAFZJ7WFQO8P8DDJQZ4TA1V44QK1S";
    const signData = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex")
      .toUpperCase();

    // Compare signatures
    if (secureHash === signed) {
      const orderId = vnp_Params["vnp_TxnRef"];
      const rspCode = vnp_Params["vnp_ResponseCode"];

      // Redirect to frontend with status
      res.redirect(
        `http://localhost:5173/payment-result?orderId=${orderId}&vnp_ResponseCode=${rspCode}`
      );
    } else {
      console.log("Invalid signature");
      console.log("Expected:", signed);
      console.log("Received:", secureHash);
      res.redirect(
        `http://localhost:5173/payment-result?error=invalid_signature`
      );
    }
  } catch (error) {
    console.error("VNPAY return error:", error);
    res.redirect(`http://localhost:5173/payment-result?error=server_error`);
  }
});

// VNPAY IPN URL handler
app.post("/api/vnpay-ipn", async (req, res) => {
  try {
    const vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((acc, key) => {
        if (vnp_Params[key] !== undefined && vnp_Params[key] !== null) {
          acc[key] = vnp_Params[key];
        }
        return acc;
      }, {});

    const secretKey = "V78RAFZJ7WFQO8P8DDJQZ4TA1V44QK1S";
    const signData = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex")
      .toUpperCase();

    if (secureHash === signed) {
      const orderId = vnp_Params["vnp_TxnRef"];
      const rspCode = vnp_Params["vnp_ResponseCode"];

      // Cập nhật trạng thái đơn hàng
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Orders!A:Z",
      });

      const rows = response.data.values || [];
      const orderIndex = rows.findIndex((row) => row[1] === orderId);

      if (orderIndex !== -1) {
        let newStatus = "Pending";
        if (rspCode === "00") {
          newStatus = "Paid";
        } else if (rspCode === "07") {
          newStatus = "Pending_Review";
        } else {
          newStatus = "Payment_Failed";
        }

        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `Orders!H${orderIndex + 1}`,
          valueInputOption: "RAW",
          resource: {
            values: [[newStatus]],
          },
        });

        res.status(200).json({ RspCode: "00", Message: "success" });
      } else {
        res.status(200).json({ RspCode: "01", Message: "Order not found" });
      }
    } else {
      console.log("Invalid signature in IPN");
      console.log("Expected:", signed);
      console.log("Received:", secureHash);
      res.status(200).json({ RspCode: "97", Message: "Invalid signature" });
    }
  } catch (error) {
    console.error("VNPAY IPN error:", error);
    res.status(200).json({ RspCode: "99", Message: "Unknown error" });
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

const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };
  return transporter.sendMail(mailOptions);
};

const saveBooking = async (booking) => {
  const row = [
    booking.id,
    booking.packageId,
    new Date(booking.selectedDate).toISOString(),
    booking.selectedTime,
    JSON.stringify(booking.tickets),
    booking.userId,
    booking.userInfo.fullName,
    booking.userInfo.email,
    booking.userInfo.phone,
    booking.status || "pending",
    new Date().toISOString(),
  ];

  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: "Bookings!A:K",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [row],
    },
  };

  return sheets.spreadsheets.values.append(request);
};
