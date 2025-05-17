// Test Vietnamese Translations for Visit Page and Navbar Dropdown
import { translateText } from "./utils/translate";

// Sample phrases from Visit page and Navbar dropdown that we want to check for translation
const visitPagePhrases = [
  // Navbar dropdown items
  "Hours & admission",
  "Map, entrances & directions",
  "Restaurants & cafés",
  "Visitor amenities",
  "Prepare your visit",
  "Everything you need to know before visiting the museum",
  "FAQ",

  // Visit page headers
  "HOURS & ADMISSION",
  "Plan and book your visit",
  "WHEN TO VISIT",
  "TICKET PRICES",
  "MEMBERSHIPS",

  // Museum info
  "The museum is open today from 7:00 AM to 21:00 PM",
  "Monday to Sunday",
  "Last entry:",
  "1 hour before closing",
  "Clearing of rooms:",
  "30 minutes before closing",
  "Public holidays:",

  // Ticket info
  "General admission",
  "Admission is free for the following visitors:",
  "Proof of ID required.",
  "Time-slot bookings are recommended, including for free-admission visitors.",
  "See full list of visitors eligible for free admission",
  "See group prices",
  "VISITORS ELIGIBLE FOR FREE ADMISSION",
  "Are you coming in a group (7 or more people)?",

  // Visitor categories
  "Under 18s",
  "Under 26 year-old residents of the European Economic Area (EU, Norway, Iceland, and Liechtenstein)",
  "All visitors",
  "Disabled visitors and the person accompanying them",
  "Art teachers (plastic arts, archeology, applied arts, architecture and art history only)",
  "Journalists",

  // Tours and activities
  "Tours & activities",
  "FULL PRICE - Guided tours, storytime and workshops",
  "This price does not include admission to the museum.",
  "COMBINED TICKET - Guided tours, storytime and workshops + Musée Du Pin",
  "Including museum admission ticket",
  "REDUCED PRICE - Guided tours, storytime and workshops",
  "GROUP PRICE (7-25 people) - Guided tours",
  "Price per person, advance booking required",
  "SCHOOL GROUPS - Guided educational tours",
  "For primary and secondary school groups, includes educational materials",

  // Other
  "Payment methods",
  "ADMISSION AND EXIT",
  "Think ahead of everything you would like to do at the museum as any exit is final.",
];

// Function to test translations
const testVietnameseTranslations = async () => {
  console.log("Testing Vietnamese translations for Visit page and Navbar");
  console.log("=====================================================");

  let missingTranslations = 0;

  for (const phrase of visitPagePhrases) {
    try {
      const translated = await translateText(phrase, "vi");
      const hasTranslation = translated !== phrase;

      if (hasTranslation) {
        console.log(`✓ "${phrase}" → "${translated}"`);
      } else {
        console.log(`✗ Missing: "${phrase}"`);
        missingTranslations++;
      }
    } catch (error) {
      console.error(`Error translating "${phrase}":`, error);
    }
  }

  console.log("=====================================================");
  console.log(
    `Found ${missingTranslations} missing translations out of ${visitPagePhrases.length} phrases.`
  );
};

// Export the test function
export default testVietnameseTranslations;
