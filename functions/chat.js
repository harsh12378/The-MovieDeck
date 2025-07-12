
import { InferenceClient } from "@huggingface/inference";
const hf = new InferenceClient(process.env.HF_TOKEN);

const SYSTEM_PROMPT = `suggest some latest movies based on this,dont give any thing extra`;


export async function handler(event) {
console.log("✅ Loaded HF_TOKEN:", !!process.env.HF_TOKEN); // Should print: true

  if (!event.body) {
    console.log("empety body")
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing request body" }),
    };
  }
 const {message}= JSON.parse(event.body);

  try {
    const response = await hf.chatCompletion({
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 128,
      temperature: 0.7,
    
    });

    return {
      statusCode: 200,
       headers: {
    "Access-Control-Allow-Origin": "*",  // or restrict to your domain
    "Content-Type": "application/json",
  },
      body: JSON.stringify({
        reply: response.choices[0].message.content,
      }),
    };
    
  } catch (err) {
    console.error("❌ Hugging Face error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}