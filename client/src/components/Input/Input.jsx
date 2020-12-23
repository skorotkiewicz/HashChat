export const Input = ({
  current,
  message,
  setMessage,
  sendMessage,
  ftyping,
  setTypingA,
  typingA,
  t,
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
          placeholder={t.t1}
          value={message}
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
        <button onClick={(e) => send(e)}>{t.t2}</button>
      </form>
    </div>
  );
};
