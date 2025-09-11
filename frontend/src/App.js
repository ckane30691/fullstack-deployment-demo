import React, { useState, useEffect } from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/messages`)
            .then(res => res.json())
            .then(data => setMessages(data));
    }, []);

    const addMessage = async (text) => {
        const res = await fetch(`${API_URL}/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
        const newMessage = await res.json();
        setMessages([...messages, newMessage]);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Message Board</h1>
            <MessageForm onAddMessage={addMessage} />
            <MessageList messages={messages} />
        </div>
    );
}

export default App;