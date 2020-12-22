import { useState, useEffect } from "react";
import {
  Input,
  List,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { socket } from "./../../util/socket";
import { Panel } from "../Panel/Panel";

export const Join = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [check, setCheck] = useState(null);
  const [validate, setValidate] = useState(null);

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
        <div className="joinScreen">
          <div className="index_container">
            <div className="card_wrapper">
              <div className="card_section">
                <span className="card_title">HashChat</span>

                <span className="card_subTitle">
                  Simple chat with person with same tags as you!
                </span>

                <List celled horizontal>
                  <List.Item>no logs</List.Item>
                  <List.Item>no cookies</List.Item>
                  <List.Item>no storage</List.Item>
                  <List.Item>no registration</List.Item>
                  <List.Item>encryption</List.Item>
                  <List.Item>opensource</List.Item>
                </List>

                <div className="card_section">
                  <p>
                    Encryption of the messages is handled by Bitcoin public and
                    private keys.
                  </p>
                  <p>
                    Your Bitcoin address with the keys is generated on your
                    device.
                  </p>
                  <p>
                    Only the public key and the address is sent to your chat
                    partner.
                  </p>
                </div>
              </div>

              <div className="card_section">
                <Segment.Group>
                  <Header as="h5" attached="top">
                    Name <br /> <small>(least 3 characters)</small>
                  </Header>
                  <Segment attached>
                    <Input
                      style={{ width: "100%" }}
                      label={{ icon: "asterisk" }}
                      labelPosition="left corner"
                      placeholder="Name... (least 3 characters)"
                      onChange={(e) =>
                        setName(e.target.value.trim().toLowerCase())
                      }
                    />
                  </Segment>
                  <Header as="h5" attached>
                    Tags <br />
                    <small>
                      (also at least 3 characters and space between tags)
                    </small>
                  </Header>
                  <Segment attached>
                    <Input
                      icon="tags"
                      iconPosition="left"
                      label={{ tag: true, content: "Add Tag" }}
                      labelPosition="right"
                      placeholder="also at least 3 characters"
                      onChange={(e) => setTags(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          if ((name.length >= 3) & (tags.length >= 3) & check) {
                            setNext(true);
                            setComp(false);
                          } else {
                            setValidate(false);
                          }
                        }
                      }}
                    />
                  </Segment>
                  <Segment attached>
                    <Button
                      fluid
                      type="submit"
                      onClick={() => {
                        if ((name.length >= 3) & (tags.length >= 3) & check) {
                          setNext(true);
                          setComp(false);
                        } else {
                          setValidate(false);
                        }
                      }}
                    >
                      Join
                    </Button>
                  </Segment>

                  {validate === false && (
                    <Message warning attached="bottom">
                      <Icon name="warning" />
                      Enter name and least 1 tag
                    </Message>
                  )}

                  {name.length >= 3 && (
                    <Message success attached="bottom">
                      <div className="nameFeedback">
                        {check ? (
                          <div className="nick ok">Username is available</div>
                        ) : (
                          <div className="nick taken">Username is taken</div>
                        )}
                      </div>
                    </Message>
                  )}
                </Segment.Group>
              </div>
            </div>
          </div>
        </div>
      )}
      {next && <Panel name={name} tags={tags} />}
    </>
  );
};
