import React, { useState, useEffect } from "react";
import {
  Button,
  Header,
  Modal,
  Dropdown,
  Segment,
  Grid,
  Divider,
  Icon,
  Label,
  Input,
} from "semantic-ui-react";

import English from "./../../i18n/en.json";
import Polish from "./../../i18n/pl.json";
import Germany from "./../../i18n/de.json";

import { useDispatch, useSelector } from "react-redux";
import {
  setTranslation,
  setLanguage,
  setTheme,
  setTags,
} from "./../../_actions";

import { editTags } from "./../../util/socket";

export const SettingsModal = ({ setOpenSettings, openSettings }) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const t = useSelector((state) => state.translation.settings);
  const theme = useSelector((state) => state.theme);
  const tags = useSelector((state) => state.tags);

  const [tagsarr, setTagsarr] = useState([]);
  const [newTags, setNewTags] = useState("");

  useEffect(() => {
    if (tags) {
      let tagsArr = tags.split(" ");
      if (tagsArr.length > 0) {
        setTagsarr(tagsArr);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeOptions = [
    {
      key: "sepin",
      text: "Sepin",
      value: "sepin",
      label: { color: "orange", empty: true, circular: true },
    },
    {
      key: "nifor",
      text: "Nifor",
      value: "nifor",
      label: { color: "blue", empty: true, circular: true },
    },
  ];

  const languageOptions = [
    { key: "en", value: "en", flag: "us", text: "English" },
    { key: "pl", value: "pl", flag: "pl", text: "Polski" },
    { key: "de", value: "de", flag: "de", text: "Deutsch" },
  ];

  return (
    <div>
      <Modal
        onClose={() => setOpenSettings(false)}
        onOpen={() => setOpenSettings(true)}
        open={openSettings}
      >
        <Modal.Header>{t.t1}</Modal.Header>

        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              {/* language model */}
              <Modal.Content>
                <Modal.Description>
                  <Header>{t.t2}</Header>
                  <p>{t.t3}</p>

                  <Dropdown
                    button
                    className="icon"
                    floating
                    labeled
                    icon="world"
                    defaultValue={language}
                    options={languageOptions}
                    onChange={(e, data) => {
                      switch (data.value) {
                        case "en":
                          dispatch(setTranslation(English));
                          break;
                        case "pl":
                          dispatch(setTranslation(Polish));
                          break;
                        case "de":
                          dispatch(setTranslation(Germany));
                          break;
                        default:
                          dispatch(setTranslation(English));
                          dispatch(setLanguage("en"));
                          break;
                      }
                      dispatch(setLanguage(data.value));
                    }}
                  />
                </Modal.Description>
              </Modal.Content>
              {/* /language model */}
            </Grid.Column>
            <Grid.Column>
              {/* theme settings */}
              <Modal.Content>
                <Modal.Description>
                  <Header>{t.t8}</Header>
                  <p>{t.t9}</p>

                  <Dropdown
                    button
                    className="icon"
                    floating
                    labeled
                    icon="theme"
                    defaultValue={theme}
                    options={themeOptions}
                    onChange={(e, data) => {
                      switch (data.value) {
                        case "sepin":
                          dispatch(setTheme("sepin"));
                          break;
                        case "nifor":
                          dispatch(setTheme("nifor"));
                          break;
                        default:
                          dispatch(setTheme("nifor"));
                          break;
                      }
                    }}
                  />
                </Modal.Description>
              </Modal.Content>
              {/* /theme settings */}
            </Grid.Column>
          </Grid>

          <Divider vertical>
            <Icon name="settings" />
          </Divider>
        </Segment>

        {/* edit tags */}
        <Modal.Content>
          <Modal.Description>
            <Header>{t.t14}</Header>
            <p>{t.t10}</p>

            <Segment.Group>
              <Header attached>
                {tagsarr && (
                  <>
                    {tagsarr.map((tag, key) => (
                      <Label
                        key={key}
                        as="a"
                        onClick={() => {
                          let newtags = tagsarr.filter((e) => e !== tag);
                          setTagsarr(newtags);
                        }}
                      >
                        {tag}
                        <Icon name="delete" />
                      </Label>
                    ))}
                  </>
                )}
              </Header>

              <Segment attached>
                {t.t11}
                <Input
                  icon="tags"
                  iconPosition="left"
                  label={{ tag: true, content: t.t12 }}
                  labelPosition="right"
                  value={newTags}
                  placeholder={t.t11}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </Segment>
              <Segment attached>
                <Button
                  color="blue"
                  fluid
                  type="submit"
                  onClick={() => {
                    if (tagsarr) {
                      let _newTags = newTags.trim().toLowerCase().split(" ");
                      let __newTags = _newTags.filter((n) => n);

                      if (__newTags.length > 0) {
                        let allTags;

                        if (tagsarr.length === 0) {
                          allTags = __newTags.join(" ");
                          setTagsarr(__newTags);
                        } else {
                          allTags = tagsarr.concat(__newTags).join(" ");
                          setTagsarr(allTags.split(" "));
                        }
                        if (allTags) {
                          editTags(allTags);
                          dispatch(setTags(allTags));
                          setNewTags("");
                        }
                      }
                      if (tagsarr.length > 0) {
                        if (tags !== tagsarr.join(" ")) {
                          let allTags = tagsarr.join(" ");
                          editTags(allTags);
                          dispatch(setTags(allTags));
                        }
                      }
                    }
                  }}
                >
                  {t.t13}
                </Button>
              </Segment>
            </Segment.Group>
          </Modal.Description>
        </Modal.Content>
        {/* /edit tags */}

        <Modal.Actions>
          <Button
            content={t.t4}
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpenSettings(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
