import { useState, useEffect, useRef } from "react";
import CryptoJS from "crypto-js"; // npm install crypto-js
import { fetchSecretKey } from "./api"; // Заглушка для ключа
import "./chat.css";

// Функция для шифрования сообщений
function encryptMessage(message, key) {
  return CryptoJS.AES.encrypt(message, key).toString();
}

// Функция для дешифрования сообщений
function decryptMessage(ciphertext, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText || "Ошибка дешифрования";
  } catch (error) {
    return "Ошибка дешифрования";
  }
}

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [secretKey, setSecretKey] = useState(null);
  const chatEndRef = useRef(null);

  // Загружаем ключ шифрования при монтировании компонента
  useEffect(() => {
    fetchSecretKey().then(setSecretKey);
  }, []);

  // Автопрокрутка вниз при появлении нового сообщения
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Таймер для удаления сообщений через 5 минут
  useEffect(() => {
    const timers = messages.map((msg) =>
      setTimeout(() => {
        setMessages((prevMessages) => prevMessages.filter((m) => m.id !== msg.id));
      }, 5 * 60 * 1000)
    );

    return () => timers.forEach(clearTimeout);
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !secretKey) return;

    const encryptedMessage = encryptMessage(newMessage, secretKey);
    const messageObject = {
      id: Date.now(),
      user: user.id,
      text: encryptedMessage,
      timestamp: new Date().getTime(),
    };

    setMessages([...messages, messageObject]);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      {/* Верхняя панель */}
      <div className="chat-header">
        <span>Приватный Чат</span>
        <button className="settings-button" onClick={() => setShowSettings(!showSettings)}>⋮</button>
      </div>

      {/* Меню настроек */}
      {showSettings && (
        <div className="settings-menu">
          <button onClick={() => setShowSettings(false)}>Закрыть</button>
        </div>
      )}

      {/* Основной чат */}
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.user === user.id ? "my-message" : "other-message"}`}>
            <span>{decryptMessage(msg.text, secretKey)}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Поле ввода */}
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">Отправить</button>
      </div>
    </div>
  );
}

export default Chat;