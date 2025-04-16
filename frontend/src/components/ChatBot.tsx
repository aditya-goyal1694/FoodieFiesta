import React, { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.head.appendChild(script);

    // Hide default launcher after script loads
    script.onload = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        df-messenger {
          --df-messenger-button-display: none;
        }
      `;
      document.head.appendChild(style);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 w-[350px] flex flex-col z-50">
      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 rounded-t-lg flex items-center self-end cursor-pointer hover:from-orange-700 hover:to-orange-600 transition-all shadow-lg"
      >
        <Bot className="w-6 h-6 mr-2" />
        <span className="font-semibold">Chat-à-la-Carte</span>
      </button>

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl p-4 flex flex-col items-center">
          <df-messenger
            intent="WELCOME"
            chat-title="Chat-à-la-Carte"
            agent-id="6b155a74-1d8f-46c3-a655-50dea19cc6e6"
            language-code="en"
          ></df-messenger>
          <p className="mt-2 text-gray-600 text-sm text-center">
            If the chatbot doesn’t load, please refresh or check your internet connection.
          </p>
        </div>
      )}
    </div>
  );
}
