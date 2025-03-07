import { useEffect, useState } from "react";
import TelegramWebApp from "@twa-dev/sdk"; // Установи: npm install @twa-dev/sdk
import Chat from "./Chat";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    TelegramWebApp.ready();

    const initData = TelegramWebApp.initDataUnsafe;
    if (initData?.user) {
      setUser(initData.user);
    } else {
      console.warn("Ошибка авторизации. Проверьте, запущено ли Web App в Telegram.");
    }

    // Настройка темы в зависимости от Telegram Web App
    document.body.style.backgroundColor = TelegramWebApp.themeParams.bg_color || "#ffffff";
    document.body.style.color = TelegramWebApp.themeParams.text_color || "#000000";
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {user ? (
        <>
          <Chat user={user} />
        </>
      ) : (
        <p>Ошибка авторизации. Пожалуйста, откройте Web App через Telegram.</p>
      )}
    </div>
  );
}

export default App;