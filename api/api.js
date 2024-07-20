import axios from "axios";

const api = async (options, key) => {
  if (!options || !key) {
    throw new Error("Invalid input parameters");
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      options,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export default api;
