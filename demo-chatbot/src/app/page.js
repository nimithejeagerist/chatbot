"use client";

import React, { useState } from "react";
import AssistantBubble from "@/components/assistant_bubble";
import UserBubble from "@/components/user_bubble";
import { sendToAI } from "./api";


export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Welcome to SunriseKitchen support. How can I help?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    // Don't do anything if the input is empty
    if (!input.trim()) return;

    // Place the input in another variable
    const userInput = input;
    setInput("");

    // Build the new messages array
    const usrMsg = { role: "user", text: userInput };
    const newMessages = [...messages, usrMsg];
    setMessages(newMessages);

    // Call API (to get AI response)
    const aiReply = await sendToAI(
      newMessages.map(m => ({ role: m.role, content: m.text }))
    );

    // Append the assistant reply to our array
    const reply = { role: "assistant", text: aiReply };
    setMessages(prev => [...prev, reply]);
  };

  return (
    <div className="page">

      {/* Chat Messages */}
      <div className="message-list">
        {messages.map((msg, index) => 
          msg.role === "assistant" ? (
            <AssistantBubble key={index} text={msg.text} />
          ) : (
            <UserBubble key={index} text={msg.text} />
          )
        )}
      </div>

      {/* Input Bar */}
      <div className="input-bar">
        <input 
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />x
        <button onClick={sendMessage}>
          Send
        </button>
      </div>
      
    </div>  
  );
}