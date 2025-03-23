import { promises as fs } from "fs";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "daily-dua"; // Default to 'daily-dua'

  try {
    const validCategories = [
      "daily-dua",
      "dhikr-after-salah",
      "evening-dhikr",
      "morning-dhikr",
      "selected-dua",
    ];

    const selectedCategory = category === "all" ? "daily-dua" : category;
    if (!validCategories.includes(selectedCategory)) {
      return new Response(JSON.stringify({ message: "Invalid category" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const filePath = path.join(
      process.cwd(),
      "data",
      "dua-dhikr",
      selectedCategory,
      "en.json"
    );
    const jsonData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    // Normalize the data: Convert object with numeric keys to an array
    const duasArray = Object.keys(data)
      .filter((key) => key !== "category") // Exclude the 'category' key
      .map((key) => ({
        ...data[key],
        category: data.category || selectedCategory, // Add category to each dua
      }));

    if (category === "all") {
      const allDuas = [];
      for (const cat of validCategories) {
        const catFilePath = path.join(
          process.cwd(),
          "data",
          "dua-dhikr",
          cat,
          "en.json"
        );
        const catData = JSON.parse(await fs.readFile(catFilePath, "utf-8"));
        const catDuas = Object.keys(catData)
          .filter((key) => key !== "category")
          .map((key) => ({
            ...catData[key],
            category: catData.category || cat,
          }));
        allDuas.push(...catDuas);
      }
      return new Response(JSON.stringify(allDuas), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(duasArray), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return new Response(
      JSON.stringify({ message: "Error reading JSON file", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}