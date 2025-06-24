import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

// Lấy đường dẫn hiện tại trong ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: "dco63bsah", // Thay thế bằng cloud name của bạn
  api_key: "613166122899756", // Thay thế bằng API key của bạn
  api_secret: "V4fqjHWT9GqOWQH5yQOk75ZboTg", // Thay thế bằng API secret của bạn
});

// Tạo thư mục nếu chưa tồn tại
const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Tạo thư mục gốc để lưu ảnh nếu chưa tồn tại
const downloadDir = path.join(__dirname, "downloaded_images");
createDirectoryIfNotExists(downloadDir);

// Hàm tải một ảnh
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const writeStream = fs.createWriteStream(filepath);
          response.pipe(writeStream);
          writeStream.on("finish", () => {
            writeStream.close();
            resolve();
          });
        } else {
          reject(`Failed to download image: ${response.statusCode}`);
        }
      })
      .on("error", (err) => {
        reject(`Error downloading image: ${err.message}`);
      });
  });
};

// Hàm xử lý public ID để tạo đường dẫn thư mục
const processPublicId = (publicId) => {
  // Tách public ID thành các phần
  const parts = publicId.split("/");

  // Lấy tên file (phần cuối cùng)
  const filename = parts.pop();

  // Đường dẫn thư mục
  const folderPath = parts.length > 0 ? parts.join("/") : "";

  return {
    folderPath,
    filename,
  };
};

// Hàm chính để tải tất cả ảnh
async function downloadAllImages() {
  try {
    // Tạo file JSON để lưu thông tin ảnh
    const imageInfo = [];

    // Lấy danh sách tất cả resources từ Cloudinary
    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 500, // Số lượng ảnh tối đa muốn tải, có thể điều chỉnh
    });

    console.log(`Found ${result.resources.length} images`);

    // Tải từng ảnh và lưu thông tin
    for (const resource of result.resources) {
      const publicId = resource.public_id;
      const format = resource.format;
      const url = resource.secure_url;

      // Xử lý public ID để tạo cấu trúc thư mục
      const { folderPath, filename } = processPublicId(publicId);

      // Tạo đường dẫn đầy đủ cho thư mục
      const fullFolderPath = path.join(downloadDir, folderPath);
      createDirectoryIfNotExists(fullFolderPath);

      // Tạo đường dẫn đầy đủ cho file
      const filepath = path.join(fullFolderPath, `${filename}.${format}`);

      console.log(`Downloading: ${publicId}`);
      console.log(`Saving to: ${filepath}`);

      // Tải ảnh
      await downloadImage(url, filepath);

      // Lưu thông tin ảnh
      imageInfo.push({
        public_id: publicId,
        url: url,
        format: format,
        folder: folderPath,
        filename: `${filename}.${format}`,
        local_path: path.relative(downloadDir, filepath),
      });

      console.log(`Downloaded: ${publicId}`);
    }

    // Lưu thông tin vào file JSON
    const infoFilePath = path.join(downloadDir, "image_info.json");
    fs.writeFileSync(infoFilePath, JSON.stringify(imageInfo, null, 2));

    console.log("Download completed successfully!");
    console.log(`Images saved to: ${downloadDir}`);
    console.log(`Image information saved to: ${infoFilePath}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Chạy hàm tải ảnh
downloadAllImages();
