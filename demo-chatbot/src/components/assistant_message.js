"use client";

function AssistantBubble({ text }) {
  return (
    <div className="assistant-row">
      <div className="assistant-bubble">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default AssistantBubble;
