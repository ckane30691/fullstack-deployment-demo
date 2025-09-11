import React, { useState } from "react";

function MessageForm({ onAddMessage }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAddMessage(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter a message"
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default MessageForm;