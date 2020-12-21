import { useState, useEffect } from "react";
import { socket } from "./../../util/socket";
import { Tags } from "../Tags/Tags";

export const Join = () => {
  const [name, setName] = useState("");
  const [check, setCheck] = useState(false);

  const [comp, setComp] = useState(true);
  const [next, setNext] = useState(false);

  useEffect(() => {
    if (name.length >= 3) {
      socket.emit("checkname", { name }, (cb) => {
        if (cb) setCheck(true);
        else setCheck(false);
      });
    }
  }, [name]);

  return (
    <>
      {comp && (
        <div>
          <div className="content">
            <div className="titleWelcome">Welcome on HashChat!</div>
            <div className="desc">
              Simple chat with person with same tags as you!
            </div>
            <div className="infos">
              <ul>
                <li>no logs</li>
                <li>no cookies</li>
                <li>no storage</li>
                <li>no registration</li>
                <li>encryption</li>
                <li>opensource</li>
              </ul>
            </div>
            <div className="bitcoin">
              <p>
                Encryption of the messages is handled by Bitcoin public and
                private keys.
              </p>
              <p>
                Your Bitcoin address with the keys is generated on your device.
              </p>
              <p>
                Only the public key and the address is sent to your chat
                partner.
              </p>
            </div>
          </div>

          <div className="formStart">
            <input
              type="text"
              placeholder="Name (least 3 characters)"
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if ((name.length >= 3) & check) {
                    setNext(true);
                    setComp(false);
                  }
                }
              }}
            />

            <button
              onClick={() => {
                if ((name.length >= 3) & check) {
                  setNext(true);
                  setComp(false);
                }
              }}
            >
              Join
            </button>
          </div>

          <div className="nameFeedback">
            {name.length >= 3 ? (
              check ? (
                <div className="nick ok">Username is available</div>
              ) : (
                <div className="nick taken">Username is taken</div>
              )
            ) : null}
          </div>
        </div>
      )}
      {next && <Tags name={name} />}
    </>
  );
};
