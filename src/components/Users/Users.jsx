import React from "react";
import { Button, Image, Label, Icon, List } from "semantic-ui-react";

import { useSelector, useDispatch } from "react-redux";
import { setUnread, setCurrent, setUsersModalOpen } from "./../../_actions";

export const Users = ({ refCurrent }) => {
  //redux state
  const dispatch = useDispatch();

  const unread = useSelector((state) => state.unread);
  const current = useSelector((state) => state.current);
  const users = useSelector((state) => state.users);
  const offline = useSelector((state) => state.offline);
  const open = useSelector((state) => state.usersModalOpen);
  const t = useSelector((state) => state.translation.users);

  const UserList = () => {
    return (
      <>
        <List divided verticalAlign="middle">
          {users.map(({ id, name, tags, bitcoin }, key) => (
            <List.Item
              key={key}
              className={
                "user " +
                (current.id === id && " active ") +
                (offline.includes(id) && " offline")
              }
            >
              <List.Content floated="right">
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
                        return dispatch(
                          setUnread(unread.filter((e) => e !== id))
                        );
                      }
                    }
                    if (open) {
                      dispatch(setUsersModalOpen(false));
                    }
                  }}
                >
                  {/* {t.t1} {name} */}
                  Chat
                </Button>
              </List.Content>

              <Image
                avatar
                src={`https://robohash.org/${name}.png?bgset=bg2&size=50x50`}
              />
              <List.Content>
                <strong>{name}</strong>
                <br />

                {tags.map((tag) => (
                  <span className="utag">{tag}</span>
                ))}

                {offline.includes(id) && (
                  <span className="offlineInfo">offline</span>
                )}
                {unread.length >= 1 && unread.includes(id) && (
                  <Label color="orange" size="tiny" style={{ marginLeft: 10 }}>
                    <Icon name="mail" />
                    {unread.filter((c) => c === id).length}
                  </Label>
                )}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </>
    );
  };

  return (
    <div className="users box">
      {users.length >= 1 ? (
        <>
          <h1 className="userstitle">
            {t.t2} ({users.length})
          </h1>
          <UserList />
        </>
      ) : (
        <div className="noMatched">
          <p className="no">{t.t3}</p>
          <p>{t.t4}</p>
        </div>
      )}
    </div>
  );
};
