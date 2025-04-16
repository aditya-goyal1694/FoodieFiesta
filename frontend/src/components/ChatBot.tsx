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

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl p-4 flex flex-col items-center">
          {/* Dialogflow Messenger widget */}
          <df-messenger
            intent="WELCOME"
            chat-title="Chat-à-la-Carte"
            agent-id="6b155a74-1d8f-46c3-a655-50dea19cc6e6"
            language-code="en"
          ></df-messenger>
        </div>
      )}
    </div>
  );
}
