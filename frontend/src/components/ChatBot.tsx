import React, { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(true);

  // Dynamically inject the Dialogflow Messenger script into the head
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.head.appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 w-[350px] flex flex-col">
      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 rounded-t-lg flex items-center self-end cursor-pointer hover:from-orange-700 hover:to-orange-600 transition-all shadow-lg"
      >
        <Bot className="w-6 h-6 mr-2" />
        <span className="font-semibold">Chat-à-la-Carte</span>
      </button>

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl p-4 flex flex-col items-center">
          {/* Dialogflow Messenger widget */}
          <df-messenger
            intent="WELCOME"
            chat-title="Chat-à-la-Carte"
            agent-id="6b155a74-1d8f-46c3-a655-50dea19cc6e6"
            language-code="en"
          ></df-messenger>

          <p className="mt-2 text-gray-600 text-sm">
            If the chatbot doesn’t load, please refresh or check your internet connection.
          </p>
        </div>
      )}
    </div>
  );
}
