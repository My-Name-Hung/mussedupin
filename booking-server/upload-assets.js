import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { glob } from "glob";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dn0br7hj0",
  api_key: "858213595484572",
  api_secret: "DPgIubL29wODRxmV49RoiapTuiI",
  secure: true,
});

// Function to upload a single file
const uploadFile = async (filePath, folder) => {
  try {
    // Get the original filename with extension
    const originalFilename = path.basename(filePath);
    // Create public_id that preserves the original filename
    const publicId = `${folder}/${originalFilename.split(".")[0]}`;

    console.log(`Attempting to upload: ${filePath}`);
    console.log(`Will be stored as: ${publicId}`);

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId, // Use the original filename as public_id
      resource_type: "auto",
      overwrite: true,
      invalidate: true,
      use_filename: true, // Use the original filename
      unique_filename: false, // Don't add unique suffix
    });

    console.log(`✅ Uploaded: ${filePath} to ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error);
    return null;
  }
};

// Function to process a directory
const processDirectory = async (dirPath, cloudinaryFolder) => {
  // Use absolute path for glob
  const absolutePath = path.resolve(dirPath);
  console.log(`Searching in absolute path: ${absolutePath}`);

  const files = await glob("**/*.{jpg,jpeg,png,webp,gif}", {
    cwd: absolutePath,
    absolute: true,
    nodir: true,
  });

  console.log(`\n📁 Processing directory: ${absolutePath}`);
  console.log(
    `Found ${files.length} images to upload to folder: ${cloudinaryFolder}\n`
  );

  for (const file of files) {
    await uploadFile(file, cloudinaryFolder);
  }
};

// Main function to upload all assets
const uploadAllAssets = async () => {
  // Get the absolute path to the project root
  const projectRoot = path.resolve(__dirname, "..");
  const assetsDir = path.join(projectRoot, "src", "assets");

  console.log(`Project root: ${projectRoot}`);
  console.log(`Assets directory: ${assetsDir}`);

  // Define directories to process
  const directories = [
    { path: path.join(assetsDir, "Home/Collections"), folder: "collections" },
  ];

  console.log("🚀 Starting Cloudinary upload process...\n");

  for (const dir of directories) {
    const absolutePath = path.resolve(dir.path);
    if (fs.existsSync(absolutePath)) {
      console.log(`Directory exists: ${absolutePath}`);
      await processDirectory(absolutePath, dir.folder);
    } else {
      console.log(`⚠️ Directory not found: ${absolutePath}`);
    }
  }

  console.log("\n✨ Upload process completed!");
};

// Run the upload process
try {
  await uploadAllAssets();
} catch (error) {
  console.error("Fatal error:", error);
  // Exit with error code
  globalThis.process?.exit(1);
}
