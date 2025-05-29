import { readdirSync } from "fs";
import { dirname, join } from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(
  __dirname,
  "../src/assets/Home/drive-download-20250528T131143Z-1-001/DungcuAmNhacTayNguyen"
);
const outputDir = join(__dirname, "../src/assets/Home/drive-download-20250528T131143Z-1-001/DungcuAmNhacTayNguyen");

// Image configurations
const configs = {
  cards: { width: 500, quality: 75 },
};

// Process images
const processImages = async () => {
  const files = readdirSync(sourceDir);

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
      const sourcePath = join(sourceDir, file);
      const filename = file.split(".")[0];

      // Generate different sizes
      for (const [size, config] of Object.entries(configs)) {
        const outputPath = join(outputDir, `${filename}_${size}.webp`);

        try {
          await sharp(sourcePath)
            .resize(config.width, null, {
              withoutEnlargement: true,
              fit: "inside",
            })
            .webp({ quality: config.quality })
            .toFile(outputPath);

          console.log(`Converted ${file} to ${size} size WebP`);
        } catch (error) {
          console.error(`Error converting ${file} to ${size} size:`, error);
        }
      }
    }
  }
};

processImages()
  .then(() => {
    console.log("Image optimization complete!");
  })
  .catch((err) => {
    console.error("Error during image optimization:", err);
  });
