// Simple test script to verify Vietnamese translations
import { translateText } from "./utils/translate";

const testTranslation = async () => {
  const testCases = [
    "Welcome to the Art Museum",
    "VISIT",
    "EXHIBITIONS AND EVENTS",
    "EXPLORE",
    "Online Boutique",
    "This is a test phrase that doesn't have a translation",
  ];

  console.log("Testing Vietnamese translations:");
  console.log("===============================");

  for (const text of testCases) {
    try {
      const translated = await translateText(text, "vi");
      console.log(`Original: "${text}"`);
      console.log(`Translated: "${translated}"`);
      console.log(`Success: ${translated !== text}`);
      console.log("---------------");
    } catch (error) {
      console.error(`Error translating "${text}":`, error);
    }
  }
};

// Run the test
testTranslation();

export default testTranslation;
