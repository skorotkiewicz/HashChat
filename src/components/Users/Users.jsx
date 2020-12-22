import React from "react";
import { Button, Card, Image, Label, Icon } from "semantic-ui-react";

import { useSelector, useDispatch } from "react-redux";
import { setUnread, setCurrent, setUsersModalOpen } from "./../../_actions";

export const Users = React.memo(({ refCurrent }) => {
  // ({ unread, setUnread, users, setCurrent, current, offline }) => {

  //redux state
  const dispatch = useDispatch();

  const unread = useSelector((state) => state.unread);
  const current = useSelector((state) => state.current);
  const users = useSelector((state) => state.users);
  const offline = useSelector((state) => state.offline);
  const open = useSelector((state) => state.usersModalOpen);

  const UserList = () => {
    return (
      <>
        {users.map(({ id, name, tags, bitcoin }) => (
          <div
            key={id}
            className={
              "user " +
              (current.id === id && " active ") +
              (offline.includes(id) && " offline")
            }
          >
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                src={`https://robohash.org/${name}.png?bgset=bg2&size=100x100`}
              />
              <Card.Header>
                <strong>{name}</strong>

                {offline.includes(id) && (
                  <span className="offlineInfo">offline</span>
                )}
                {unread.length >= 1 && unread.includes(id) && (
                  <Label color="orange" size="tiny" style={{ marginLeft: 10 }}>
                    <Icon name="mail" />
                    {unread.filter((c) => c === id).length}
                  </Label>
                )}
              </Card.Header>
              <Card.Meta>
                {tags.map((tag) => (
                  <span>{tag}</span>
                ))}
              </Card.Meta>
            </Card.Content>

            <Button
              fluid
              basic
              color="brown"
              onClick={() => {
                let address = bitcoin.address;
                let pubkey = bitcoin.pubkey;

                if (current.id !== id) {
                  dispatch(setCurrent({ id, name, pubkey, address }));
                  refCurrent.current = {
                    id,
                    name,
                    pubkey,
                    address,
                  };
                }
                if (unread.length >= 1) {
                  if (unread.includes(id)) {
                    return dispatch(setUnread(unread.filter((e) => e !== id)));
                  }
                }
                if (open) {
                  dispatch(setUsersModalOpen(false));
                }
              }}
            >
              Chat with {name}
            </Button>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="users box">
      {users.length >= 1 ? (
        <>
          <h1 className="userstitle">Match users ({users.length})</h1>
          <UserList />
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
