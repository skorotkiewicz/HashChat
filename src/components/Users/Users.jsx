import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setUnread, setCurrent } from "./../../_actions";

export const Users = React.memo(({ refCurrent }) => {
  // ({ unread, setUnread, users, setCurrent, current, offline }) => {

  //redux state
  const dispatch = useDispatch();

  const unread = useSelector((state) => state.unread);
  const current = useSelector((state) => state.current);
  const users = useSelector((state) => state.users);
  const offline = useSelector((state) => state.offline);

  return (
    <div className="users box">
      {users.length >= 1 ? (
        <>
          <h1 className="userstitle">Match users</h1>
          {users.map(({ id, name, tags, bitcoin }) => (
            <div
              key={id}
              className={
                "user " +
                (current.id === id && " active ") +
                (offline.includes(id) && " offline")
              }
            >
              <h3>
                {name}{" "}
                {offline.includes(id) && (
                  <span className="offlineInfo">offline</span>
                )}
                {console.log(unread)}
                {unread.length >= 1 && unread.includes(id) && (
                  <span className="unread">
                    {unread.filter((c) => c === id).length}
                  </span>
                )}
              </h3>
              {tags.map((tag, key) => (
                <span className="usertags" key={key}>
                  {tag}{" "}
                </span>
              ))}

              <button
                onClick={() => {
                  let address = bitcoin.address;
                  let pubkey = bitcoin.pubkey;

                  dispatch(setCurrent({ id, name, pubkey, address }));
                  refCurrent.current = { id, name, pubkey, address };
                  // setCurrent({ id, name, pubkey, address });

                  if (unread.length >= 1) {
                    if (unread.includes(id)) {
                      return dispatch(
                        setUnread(unread.filter((e) => e !== id))
                      );
                      // return setUnread(unread.filter((e) => e !== id));
                    }
                  }
                }}
              >
                Chat with {name}
              </button>
            </div>
          ))}
        </>
      ) : (
        <div className="noMatched">
          <p className="no">No matched users</p>
          <p>You can wait for the user or try with another tag.</p>
        </div>
      )}
    </div>
  );
});
