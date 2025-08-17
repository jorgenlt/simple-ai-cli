import OpenAI from "openai";

const api = async (options, key) => {
  if (!options || !key) {
    throw new Error("Invalid input parameters");
  }

  try {
    const client = new OpenAI({ apiKey: key });

    const response = await client.chat.completions.create({
      model: options.model,
      messages: options.messages,
      max_tokens: options.max_tokens,
      temperature: options.temperature,
    });

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export default api;
