import dotenv from "dotenv";
import fs from "fs";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import path from "path";

dotenv.config();

const ASSETS_DIR = path.join(process.cwd(), "..", "src", "assets");

async function uploadFile(filePath, bucket) {
  const fileStream = fs.createReadStream(filePath);
  const filename = path.basename(filePath);
  const metadata = {
    category: path.relative(ASSETS_DIR, path.dirname(filePath)),
    uploadDate: new Date(),
  };

  const uploadStream = bucket.openUploadStream(filename, {
    metadata,
  });

  return new Promise((resolve, reject) => {
    fileStream.pipe(uploadStream).on("error", reject).on("finish", resolve);
  });
}

async function uploadAssets() {
  try {
    await mongoose.connect(
      "mongodb+srv://hung1111:Hung20021@museumassets.0rx4ai2.mongodb.net/?retryWrites=true&w=majority&appName=museumassets"
    );
    console.log("Connected to MongoDB");

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "assets",
    });

    async function processDirectory(dir) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          await processDirectory(filePath);
        } else if (stat.isFile()) {
          const ext = path.extname(file).toLowerCase();
          if ([".webp", ".mp4", ".jpg", ".jpeg", ".png"].includes(ext)) {
            console.log(`Uploading ${filePath}...`);
            await uploadFile(filePath, bucket);
            console.log(`Uploaded ${filePath}`);
          }
        }
      }
    }

    await processDirectory(ASSETS_DIR);
    console.log("All assets uploaded successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error uploading assets:", error);
    process.exit(1);
  }
}

uploadAssets();
