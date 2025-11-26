"use client";

function UserBubble({ text }) {
  return (
    <div className="user-row">
      <div className="user-bubble">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default UserBubble;
