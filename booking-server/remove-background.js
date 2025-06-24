import { Buffer } from "node:buffer";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Configuration
const API_KEY = "2Rem7zbbgLMEiFSjuqmtnuov";
const INPUT_FOLDER = "../src/assets/inyeucau";
const OUTPUT_FOLDER = "../src/assets/inyeucau/no-background";

async function convertToBlob(filePath) {
  const buffer = await fs.promises.readFile(filePath);
  // Convert webp to png if needed
  if (path.extname(filePath).toLowerCase() === ".webp") {
    const pngBuffer = await sharp(buffer).png().toBuffer();
    return new Blob([pngBuffer], { type: "image/png" });
  }
  return new Blob([buffer], { type: "image/png" });
}

async function removeBg(blob) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", blob);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": API_KEY },
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

async function processImage(inputPath) {
  try {
    const fileName = path.basename(inputPath, path.extname(inputPath));
    const originalExt = path.extname(inputPath);
    const outputPath = path.join(
      OUTPUT_FOLDER,
      `${fileName}-no-bg${originalExt}`
    );

    console.log(`Processing: ${fileName}`);

    const fileBlob = await convertToBlob(inputPath);
    const rbgResultData = await removeBg(fileBlob);
    await fs.promises.writeFile(outputPath, Buffer.from(rbgResultData));

    console.log(`✓ Completed: ${fileName}`);
    return true;
  } catch (error) {
    console.error(
      `✗ Failed to process ${path.basename(inputPath)}: ${error.message}`
    );
    return false;
  }
}

async function main() {
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_FOLDER)) {
      fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
    }

    // Get all image files
    const files = await fs.promises.readdir(INPUT_FOLDER);
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ext === ".png" || ext === ".webp";
    });

    console.log(`Found ${imageFiles.length} images to process`);
    console.log("Starting batch processing...\n");

    let successful = 0;
    let failed = 0;

    // Process all images
    for (const file of imageFiles) {
      const result = await processImage(path.join(INPUT_FOLDER, file));
      if (result) successful++;
      else failed++;
    }

    console.log("\nBatch processing completed!");
    console.log(`Successfully processed: ${successful}`);
    console.log(`Failed: ${failed}`);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

// Run the script
main();
