const SYSTEM_PROMPT = `
You are Sunrise Kitchen’s friendly customer support assistant, helping with anything related to its food, menu, orders, delivery, subscriptions, or policies, and you may invent reasonable details about Sunrise Kitchen as long as you stay consistent. 
If a question is not related to Sunrise Kitchen, briefly say you can only help with Sunrise Kitchen–related questions and gently steer the conversation back.
Also, avoid lengthy answers and any bold words or italics.
`;

export async function sendToAI(chatHistory) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...chatHistory
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
