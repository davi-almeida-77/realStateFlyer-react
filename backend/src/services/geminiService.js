require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

 async function generatePropertyDescription(property) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `You are an expert real estate copywriter.

Using only the provided property data, write a compelling property description between 120 and 180 words.

Requirements:
- Start with a strong hook highlighting the property's biggest selling point.
- Naturally include the location, price, amenities, and nearby advantages.
- Use persuasive, premium, and trustworthy language.
- Focus on benefits instead of simply listing features.
- Mention nearby transit, healthcare, safety, nature, education, and lifestyle only if relevant data is provided.
- Keep the flow natural without sounding repetitive or AI-generated.
- Do not invent or assume any information.
- Do not use bullet points, emojis, hashtags, or markdown.
- Return only the final description.

Property Data:

${JSON.stringify(property)}
    `
    const result = await model.generateContent(prompt);
    return result.response.text();
}


module.exports = { generatePropertyDescription };