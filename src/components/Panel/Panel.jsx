import { useState, useEffect, useRef } from "react";
import { socket, ftyping } from "./../../util/socket";
import { Label, Image } from "semantic-ui-react";
import { Users } from "./../Users/Users";
import { UsersModal } from "./../Users/UsersModal";
import { Messages } from "./../Messages/Messages";
import { Input } from "./../Input/Input";
import { Bitcoin, encrypt, decrypt } from "./../../util/bitcoin";

import { useSelector, useDispatch } from "react-redux";
import { setUnread, addUnread, setUsers, addOffline } from "./../../_actions";

export const Panel = ({ name, tags }) => {
  const [message, setMessage] = useState("");
  const [myId, setMyId] = useState("");
  const [messages, setMessages] = useState([]);
  const [bitcoin, setBitcoin] = useState([]);
  const [typingA, setTypingA] = useState(false);
  const [typingB, setTypingB] = useState([]);

  // redux
  const dispatch = useDispatch();
  const unread = useSelector((state) => state.unread);
  const current = useSelector((state) => state.current);
  const users = useSelector((state) => state.users);

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
      <div className="flex-container">
        <div className="flex-left">
          <div className="left-stats">
            {!myId ? (
              "No connection"
            ) : (
              <div className="me">
                <Label color="blue" image>
                  <Image
                    src={`https://robohash.org/${name}.png?bgset=bg2&size=100x100`}
                  />
                  {name}
                </Label>
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
              {<UsersModal UsersList={<Users refCurrent={refCurrent} />} />}
            </div>
            {current.id ? (
              <>
                Now you are chatting with: <strong>{current.name}</strong>
                <br></br>
                <small>
                  [ <strong>{current.name}'s bitcoin</strong> {current.address}{" "}
                  ]
                </small>
              </>
            ) : (
              <>
                Hello {name},<br></br>
                <small>your tags: {tags}</small>
              </>
            )}
          </div>
          <div className="right-content">
            <Messages
              messages={messages}
              setMessages={setMessages}
              myId={myId}
              current={current}
              bitcoin={bitcoin}
              decrypt={decrypt}
              typingB={typingB}
            />
          </div>

          {current.id && (
            <div className="right-input">
              {typingB.status && (
                <div className="typing">
                  <span>{current.name} is typing</span>
                </div>
              )}
              <Input
                current={current}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                ftyping={ftyping}
                setTypingA={setTypingA}
                typingA={typingA}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
