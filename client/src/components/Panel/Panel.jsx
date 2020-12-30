import { useState, useEffect, useRef } from "react";
import { socket, ftyping } from "./../../util/socket";
import { Label, Image } from "semantic-ui-react";
import { Users } from "./../Users/Users";
import { UsersModal } from "./../Users/UsersModal";
import { Messages } from "./../Messages/Messages";
import { Input } from "./../Input/Input";
import { Settings } from "./Settings";
import { Bitcoin, encrypt, decrypt } from "./../../util/bitcoin";
import { BlinkingTitle } from "./../Messages/BlinkingTitle";
import { useSelector, useDispatch } from "react-redux";
import { setUnread, addUnread, setUsers, addOffline } from "./../../_actions";

export const Panel = ({ name }) => {
  const [message, setMessage] = useState("");
  const [myId, setMyId] = useState("");
  const [messages, setMessages] = useState([]);
  const [bitcoin, setBitcoin] = useState([]);
  const [typingA, setTypingA] = useState(false);
  const [typingB, setTypingB] = useState([]);
  const [notifi, setNotifi] = useState(true);

  // redux
  const dispatch = useDispatch();
  const unread = useSelector((state) => state.unread);
  const current = useSelector((state) => state.current);
  const users = useSelector((state) => state.users);
  const t = useSelector((state) => state.translation);
  const offline = useSelector((state) => state.offline);
  const theme = useSelector((state) => state.theme);
  const tags = useSelector((state) => state.tags);

  const refCurrent = useRef([]);

  const chatlog = (message) => {
    var t = new Date();
    let time = t.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });

    message = { ...message, time };
    setMessages((msgs) => [...msgs, message]);
  };

  useEffect(() => {
    const d = setTimeout(() => {
      ftyping(current, setTypingA, false);
    }, 1000);

    return () => {
      clearTimeout(d);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    Bitcoin.createWalletAddress((bitcoin) => {
      let address = bitcoin.address;
      let pubkey = bitcoin.pubkey;
      setBitcoin(bitcoin);
      socket.emit(
        "join",
        { name, tags, bitcoin: { address, pubkey } },
        (error) => {
          if (error) alert(error);
        }
      );
    });

    socket.on("WELCOME", (m) => {
      setMyId(m.id);
    });

    socket.on("message", (message) => {
      chatlog(message);
      if (message.fromId !== refCurrent.current.id) {
        dispatch(addUnread(message.fromId));
      }
    });

    socket.on("users", (users) => {
      dispatch(setUsers(users));
    });

    socket.on("_mtyp", (t) => {
      setTypingB({ id: t.id, status: t.typing });
    });

    socket.on("userleft", (uid) => {
      dispatch(addOffline(uid));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (unread && unread.includes(current.id)) {
      dispatch(setUnread(unread.filter((e) => e !== current.id)));
    }

    const encrypted = encrypt(current.pubkey, bitcoin.privkey, message);

    if (message && current.id && users.length >= 1) {
      socket.emit("sendMessage", {
        message: encrypted,
        to: current.id,
        fromId: myId,
        fromName: name,
      });

      chatlog({ message, to: current.id, fromId: myId, fromName: name });
      setMessage("");

      ftyping(current, setTypingA, false);
      setTypingA(false);
    }
  };

  return (
    <div>
      <div className={`flex-container theme-${theme}`}>
        <div className="flex-left">
          <div className="left-stats">
            {!myId ? (
              "No connection"
            ) : (
              <div className="me">
                <Settings name={name} />
              </div>
            )}
          </div>
          <div className="left-users">
            <Users refCurrent={refCurrent} />
          </div>
        </div>
        <div className="flex-right">
          <div className="right-infos">
            <div className="usersListModal">
              <div className="users">
                {<UsersModal UsersList={<Users refCurrent={refCurrent} />} />}
              </div>
              <div className="settings">
                <Settings name={name} />
              </div>
            </div>
            {current.id ? (
              <>
                {t.panel.t1}: <strong>{current.name}</strong>
                <br></br>
                <small className="ca">{current.address}</small>
              </>
            ) : (
              <>
                <Label color="blue" image>
                  <Image
                    src={`https://robohash.org/${name}.png?bgset=bg2&size=50x50`}
                  />
                  {name}
                </Label>
                {tags.map((tag, key) => (
                  <Label key={key} color="teal">
                    {tag}
                  </Label>
                ))}
              </>
            )}
          </div>
          <div className="right-content">
            {messages.slice(-1)[0] &&
              Array.isArray(messages.slice(-1)[0].message) && (
                <BlinkingTitle
                  messages={messages}
                  interval={300}
                  t={t.panel}
                  notifi={notifi}
                />
              )}

            <Messages
              messages={messages}
              setMessages={setMessages}
              myId={myId}
              current={current}
              bitcoin={bitcoin}
              decrypt={decrypt}
              typingB={typingB}
              notifi={notifi}
              setNotifi={setNotifi}
            />
          </div>

          {current.id && (
            <div className="right-input">
              {typingB.status && (
                <>
                  {current.id === typingB.id && (
                    <div className="typing">
                      <span>
                        {current.name} {t.panel.t5}...
                      </span>
                    </div>
                  )}
                </>
              )}
              {!offline.includes(current.id) && (
                <Input
                  current={current}
                  message={message}
                  setMessage={setMessage}
                  sendMessage={sendMessage}
                  ftyping={ftyping}
                  setTypingA={setTypingA}
                  typingA={typingA}
                  t={t.input}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
