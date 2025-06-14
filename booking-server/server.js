/* global process, global, Buffer */
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors";
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

// Send order confirmation email to customer
const sendOrderConfirmationEmail = (orderData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: orderData.email,
    subject: "Xác nhận đơn hàng - Musée Du Pin",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e6e6e6; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Xác nhận đơn hàng</h1>
        </div>
        <div style="padding: 20px;">
          <p>Xin chào <strong>${orderData.fullName}</strong>,</p>
          <p>Cảm ơn bạn đã đặt hàng tại Musée Du Pin. Dưới đây là thông tin đơn hàng của bạn:</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Chi tiết đơn hàng</h3>
            <p><strong>Mã đơn hàng:</strong> ${orderData.orderId}</p>
            <p><strong>Phương thức thanh toán:</strong> ${
              orderData.paymentMethod === "zalopay"
                ? "ZaloPay"
                : "Thanh toán khi nhận hàng"
            }</p>
            <p><strong>Tổng tiền:</strong> ${orderData.totalAmount.toLocaleString()}đ</p>
            ${
              orderData.paymentMethod === "zalopay"
                ? "<p><strong>Trạng thái:</strong> Đã thanh toán</p>"
                : ""
            }
          </div>

          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Địa chỉ giao hàng</h3>
            <p>${orderData.address.street}</p>
            <p>${orderData.address.city}, ${orderData.address.state}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Sản phẩm</h3>
            ${orderData.items
              .map(
                (item) => `
              <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>${item.name} x ${item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()}đ</span>
              </div>
            `
              )
              .join("")}
          </div>
          
          <p>Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</p>
          <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
          
          <p style="margin-top: 30px;">Trân trọng,<br>Đội ngũ Musée Du Pin</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// Send order notification to admin
const sendOrderNotificationEmail = (orderData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: "Đơn hàng mới - Musée Du Pin",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e6e6e6; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Đơn hàng mới</h1>
        </div>
        <div style="padding: 20px;">
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Thông tin khách hàng</h3>
            <p><strong>Tên:</strong> ${orderData.fullName}</p>
            <p><strong>Email:</strong> ${orderData.email}</p>
            <p><strong>Số điện thoại:</strong> ${orderData.phone}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Chi tiết đơn hàng</h3>
            <p><strong>Mã đơn hàng:</strong> ${orderData.orderId}</p>
            <p><strong>Phương thức thanh toán:</strong> ${
              orderData.paymentMethod === "zalopay"
                ? "ZaloPay"
                : "Thanh toán khi nhận hàng"
            }</p>
            <p><strong>Tổng tiền:</strong> ${orderData.totalAmount.toLocaleString()}đ</p>
            ${
              orderData.paymentMethod === "zalopay"
                ? "<p><strong>Trạng thái:</strong> Đã thanh toán</p>"
                : ""
            }
          </div>

          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Địa chỉ giao hàng</h3>
            <p>${orderData.address.street}</p>
            <p>${orderData.address.city}, ${orderData.address.state}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Sản phẩm</h3>
            ${orderData.items
              .map(
                (item) => `
              <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>${item.name} x ${item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()}đ</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// API endpoint for creating ZaloPay order
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { items, address } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const orderId = `ORDER${Date.now()}`;

    // Create order data for ZaloPay
    const orderData = {
      app_id: process.env.ZALOPAY_APP_ID,
      app_trans_id: orderId,
      app_user: user.email,
      amount: totalAmount,
      description: `Thanh toán đơn hàng ${orderId}`,
      bank_code: "",
      callback_url: `${process.env.SERVER_URL}/api/payment/callback`,
    };

    // Call ZaloPay API to create order
    const response = await fetch("https://sb-openapi.zalopay.vn/v2/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (data.return_code === 1) {
      res.json({
        success: true,
        order_url: data.order_url,
        orderId: orderId,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to create ZaloPay order",
      });
    }
  } catch (error) {
    console.error("Error creating ZaloPay order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// API endpoint for ZaloPay callback
app.post("/api/payment/callback", async (req, res) => {
  try {
    const { app_trans_id, amount, status } = req.body;

    if (status === 1) {
      // Payment successful
      // Update order status and send confirmation emails
      const orderData = {
        orderId: app_trans_id,
        paymentMethod: "zalopay",
        totalAmount: amount,
        // Add other order details
      };

      await Promise.all([
        sendOrderConfirmationEmail(orderData),
        sendOrderNotificationEmail(orderData),
      ]);
    }

    res.json({ return_code: 1, return_message: "success" });
  } catch (error) {
    console.error("Error processing ZaloPay callback:", error);
    res.status(500).json({ return_code: 0, return_message: "error" });
  }
});

// API endpoint for creating regular orders
app.post("/api/orders/create", async (req, res) => {
  try {
    const { items, address, paymentMethod } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const orderId = `ORDER${Date.now()}`;

    const orderData = {
      orderId,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address,
      items,
      totalAmount,
      paymentMethod,
    };

    // Send confirmation emails
    await Promise.all([
      sendOrderConfirmationEmail(orderData),
      sendOrderNotificationEmail(orderData),
    ]);

    res.json({
      success: true,
      message: "Order created successfully",
      orderId,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// API endpoint for getting user profile
app.get("/api/user/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// API endpoint for updating user address
app.post("/api/user/update-address", async (req, res) => {
  try {
    const { address } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    user.address = address;
    await user.save();

    res.json({
      success: true,
      message: "Address updated successfully",
      address: user.address,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
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
