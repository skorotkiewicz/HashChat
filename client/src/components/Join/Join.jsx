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

import { useSelector, useDispatch } from "react-redux";
import { setTags } from "./../../_actions";

export const Join = () => {
  const [name, setName] = useState("");
  const [check, setCheck] = useState(null);
  const [validate, setValidate] = useState(null);

  const [comp, setComp] = useState(true);
  const [next, setNext] = useState(false);

  // redux
  const dispatch = useDispatch();
  const t = useSelector((state) => state.translation.join);
  const tags = useSelector((state) => state.tags);

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
              <div className="card_section center">
                <span className="card_title">HashChat</span>

                <span className="card_subTitle">{t.t1}</span>

                <List celled horizontal>
                  <List.Item>{t.t2}</List.Item>
                  <List.Item>{t.t3}</List.Item>
                  <List.Item>{t.t4}</List.Item>
                  <List.Item>{t.t5}</List.Item>
                  <List.Item>{t.t6}</List.Item>
                  <List.Item>{t.t7}</List.Item>
                </List>

                <div className="card_section">
                  <p>{t.t8}</p>
                  <p>{t.t9}</p>
                  <p>{t.t10}</p>
                </div>
              </div>

              <div className="card_section">
                <Segment.Group>
                  <Header as="h5" attached="top">
                    {t.t11} <br /> <small>({t.t12})</small>
                  </Header>
                  <Segment attached>
                    <Input
                      style={{ width: "100%" }}
                      label={{ icon: "asterisk" }}
                      labelPosition="left corner"
                      placeholder={`${t.t11}... (${t.t12})`}
                      onChange={(e) =>
                        setName(e.target.value.trim().toLowerCase())
                      }
                    />
                  </Segment>
                  <Header as="h5" attached>
                    {t.t13} <br />
                    <small>({t.t14})</small>
                  </Header>
                  <Segment attached>
                    <Input
                      icon="tags"
                      iconPosition="left"
                      label={{ tag: true, content: t.t15 }}
                      labelPosition="right"
                      placeholder={t.t16}
                      onChange={(e) => {
                        let tags = e.target.value
                          .trim()
                          .toLowerCase()
                          .split(" ");
                        let _tags = tags.filter((n) => n);
                        dispatch(setTags(_tags));
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          if ((name.length >= 3) & (tags.length > 0) & check) {
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
                        if ((name.length >= 3) & (tags.length > 0) & check) {
                          setNext(true);
                          setComp(false);
                        } else {
                          setValidate(false);
                        }
                      }}
                    >
                      {t.t20}
                    </Button>
                  </Segment>

                  {validate === false && (
                    <Message warning attached="bottom">
                      <Icon name="warning" />
                      {t.t17}
                    </Message>
                  )}

                  {name.length >= 3 && (
                    <Message attached="bottom">
                      <div className="nameFeedback">
                        {check ? (
                          <div className="nick ok">{t.t18}</div>
                        ) : (
                          <div className="nick taken">{t.t19}</div>
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
      {next && <Panel name={name} />}
    </>
  );
};
