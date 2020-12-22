export const Input = ({
  current,
  message,
  setMessage,
  sendMessage,
  ftyping,
  setTypingA,
  typingA,
}) => {
  const send = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      sendMessage(e);
    }
  };

  return (
    <div>
      <form className="input-form">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          // disabled={current.id ? false : true}
          onChange={(e) => {
            if (typingA === false) {
              ftyping(current, setTypingA, true);
            }
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              send(e);
            }
          }}
        />
        <button
          // disabled={current.id ? false : true}
          onClick={(e) => send(e)}
        >
          Send
        </button>
      </form>
    </div>
  );
};
