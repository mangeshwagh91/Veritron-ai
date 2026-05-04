/* eslint-disable @typescript-eslint/no-explicit-any */
import Groq from "groq-sdk";

const getGroqApiKey = () => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Groq API key not configured. Please set VITE_GROQ_API_KEY in .env");
  }
  return apiKey;
};

export const analyzeContentWithGemini = async (data: any) => {
  const apiKey = getGroqApiKey();
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

  const prompt = `Given the title of a news article or social media post, perform a comprehensive analysis to determine its authenticity. First, conduct a deep web search using the title to find matching or similar articles across credible news sources and fact-checking websites. Then determine whether the content is fake or real based on this thorough investigation.

Provide a detailed, evidence-based explanation for your assessment:
- For fake content: Specify what the search revealed, such as "No credible sources reporting this news" or "Found contradicting information from verified sources"
- For real content: Detail the verification process, like "Multiple reputable news outlets have reported this with consistent details" or "Official sources have confirmed this information"

Structure the response as a valid JSON object with these key-value pairs:
{
  fake: boolean,
  real: boolean,
  fake_percentage: number (0-100),
  real_percentage: number (0-100),
  explanation: string (detailed reasoning),
  related_links: string[] (verified source URLs),
  author_verified: boolean,
  post_date: string,
  subject_expertise: string,
  media_presence: boolean,
  cross_check_sources: string[]
}

Focus your analysis on:
1. Find matching articles from credible news sources
2. Check fact-checking websites
3. Verify the timeline of events
4. Cross-reference with official statements
5. Examine the author's credibility

Return ONLY valid JSON, no other text.

Input Data:
${JSON.stringify(data)}`;

  try {
    const message = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2048,
    });

    const text = message.choices[0]?.message?.content || "";
    if (typeof text !== "string") {
      throw new Error("Invalid response format from Groq");
    }

    const jsonStartIndex = text.indexOf("{");
    const jsonEndIndex = text.lastIndexOf("}") + 1;
    
    if (jsonStartIndex === -1 || jsonEndIndex === 0) {
      console.error("No JSON found in response:", text);
      throw new Error("No JSON object found in Groq response");
    }

    const jsonString = text.slice(jsonStartIndex, jsonEndIndex);

    try {
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      console.error("Original response:", text);
      console.error("Extracted JSON:", jsonString);
      throw new Error("Invalid JSON response from Groq");
    }
  } catch (error) {
    console.error("Error analyzing content with Groq:", error);
    throw error;
  }
};
