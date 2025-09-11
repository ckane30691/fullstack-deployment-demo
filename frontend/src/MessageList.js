import React from "react";

function MessageList({ messages }) {
    return (
        <ul>
            {messages.map(m => (
                <li key={m.id}>{m.text}</li>
            ))}
        </ul>
    );
}

export default MessageList;
