import { useEffect } from 'react';

function chatBot() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const dfMessenger = document.querySelector('df-messenger');
      if (dfMessenger) {
        dfMessenger.setAttribute('intent', 'WELCOME');
        dfMessenger.setAttribute('chat-title', 'Chat-à-la-Carte');
        dfMessenger.setAttribute('agent-id', '6b155a74-1d8f-46c3-a655-50dea19cc6e6');
        dfMessenger.setAttribute('language-code', 'en');
      }
    };

    return () => {
      const script = document.querySelector('script[src*="dialogflow-console"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
      <df-messenger></df-messenger>
  );
}

export default chatBot;