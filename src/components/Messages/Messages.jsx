import React, { useRef, useEffect } from "react";
// import ReactTooltip from "react-tooltip";

import { useSelector } from "react-redux";

export const Messages = React.memo(
  ({ myId, messages, bitcoin, decrypt, typingB }) => {
    // redux state
    const current = useSelector((state) => state.current);

    const divRef = useRef(null);

    useEffect(() => {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const Welcome = () => {
      return (
        <div className="welcome">
          {!myId ? (
            <h4>You are not connected, reload this page.</h4>
          ) : (
            <h3>Hello! To start chat, click the user from left userlist. </h3>
          )}
        </div>
      );
    };

    return (
      <div className="log box">
        {bitcoin && (
          <details>
            <hr />
            <summary>Click to show your bitcoin address with keys</summary>
            <span>
              Public address: <br></br>
              <strong>{bitcoin.address}</strong>
            </span>
            <hr />
            <span>
              Public key: (used to encrypt/decrypt messages)<br></br>
              <strong>{bitcoin.pubkey}</strong>
            </span>
            <hr />
            <span>
              Private key (don't share with others!): <br></br>
              <strong>{bitcoin.privkey}</strong>
            </span>

            <span className="infoKeys">
              The keys are not saved anywhere, if for some reason you want to
              keep your current bitcoin address save it locally!
              <br />
              Once you visit the site again, a new bitcoin address will be
              generated.
            </span>
          </details>
        )}
        {current.length === 0 && <Welcome />}
        {messages.map((msg, i) => (
          <div key={i}>
            {current.id && (
              <>
                {msg.fromId === current.id && (
                  <li data-tip={msg.time} key={i} className="from">
                    <span className="time">[{msg.time}]</span>
                    <span className="name">&lt;{msg.fromName}&gt;</span>
                    {/* <span className="seperator">|</span> */}
                    <span className="userMsg">
                      {decrypt(current.pubkey, bitcoin.privkey, msg.message)}
                      {/* {decrypt(current.pubkey, bitcoin.privkey, msg.text)} */}
                    </span>
                  </li>
                )}
                {msg.to === current.id && (
                  <li data-tip={msg.time} key={i} className="to">
                    <span className="time">[{msg.time}]</span>
                    <span className="name">&lt;{msg.fromName}&gt;</span>
                    {/* <span className="seperator">|</span> */}
                    <span className="userMsg">
                      {msg.message}
                      {/* {decrypt(current.pubkey, bitcoin.privkey, msg.text)} */}
                    </span>
                  </li>
                )}
              </>
            )}
          </div>
        ))}
        <div ref={divRef} />

        <div className="typing">
          {typingB.status && <span>{current.name} is typing</span>}
        </div>
      </div>
    );
  }
);
