import React, { useRef, useEffect } from "react";
import { Comment } from "semantic-ui-react";
import { WelcomeDetails, BitcoinDetails } from "./Details";
import { useSelector } from "react-redux";

export const Messages = React.memo(({ myId, messages, bitcoin, decrypt }) => {
  // redux state
  const current = useSelector((state) => state.current);
  const t = useSelector((state) => state.translation);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <BitcoinDetails t={t.details} bitcoin={bitcoin} />
      <Comment.Group>
        {current.length === 0 && <WelcomeDetails t={t.details} myId={myId} />}
        {messages.map((msg, i) => (
          <div key={i}>
            {current.id && (
              <>
                {msg.fromId === current.id && (
                  <Comment key={i}>
                    <Comment.Avatar
                      src={`https://robohash.org/${msg.fromName}.png?bgset=bg2&size=100x100`}
                    />
                    <Comment.Content>
                      <Comment.Author as="span">{msg.fromName}</Comment.Author>
                      <Comment.Metadata>
                        <div>{msg.time}</div>
                      </Comment.Metadata>
                      <Comment.Text>
                        {decrypt(current.pubkey, bitcoin.privkey, msg.message)}
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                )}
                {msg.to === current.id && (
                  <Comment key={i}>
                    <Comment.Avatar
                      src={`https://robohash.org/${msg.fromName}.png?bgset=bg2&size=100x100`}
                    />
                    <Comment.Content>
                      <Comment.Author as="span">{msg.fromName}</Comment.Author>
                      <Comment.Metadata>
                        <div>{msg.time}</div>
                      </Comment.Metadata>
                      <Comment.Text>{msg.message}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                )}
              </>
            )}
          </div>
        ))}
        <div ref={divRef} />
      </Comment.Group>
    </>
  );
});
