// src/components/ChatBotWrapper.js
import React from "react";
import ChatBot from "./ChatBots.js/ChatBot";
import "./chatbotWrapper.css";

const ChatBotWrapper = () => {
  return (
    <div className="chatbot-container">
      <ChatBot />
    </div>
  );
};

export default ChatBotWrapper;
