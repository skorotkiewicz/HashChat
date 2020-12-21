export const Input = ({
  current,
  message,
  setMessage,
  sendMessage,
  ftyping,
  setTypingA,
  typingA,
}) => {
  return (
    <div className="input box">
      <form className="form">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          disabled={current.id ? false : true}
          onChange={(e) => {
            if (typingA === false) {
              ftyping(current, setTypingA, true);
            }
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (message.length > 0) {
                sendMessage(e);
              }
            }
          }}
        />
        {/* <button className="sendButton" onClick={(e) => sendMessage(e)}></button> */}
      </form>
    </div>
  );
};
