import { useState } from "react";
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
import { setTranslation, setLanguage, setTheme } from "./../../_actions";

import { editTags } from "./../../util/socket";

export const SettingsModal = ({ setOpenSettings, openSettings, tags }) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const t = useSelector((state) => state.translation.settings);
  const theme = useSelector((state) => state.theme);
  const [tagsarr, setTagsarr] = useState(tags && tags.split(" "));
  const [newTags, setNewTags] = useState("");

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
            <Header>Edytuj tagi</Header>
            <p>
              Tutaj mozesz usunąć lub dodać nowe tagi. (nie zapomnij zapisać!)
            </p>

            <Segment.Group>
              <Header attached>
                {tags &&
                  tagsarr.map((tag, key) => (
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
              </Header>

              <Segment attached>
                Kazdy nowy tag odzielony spacją
                <Input
                  icon="tags"
                  iconPosition="left"
                  label={{ tag: true, content: "Dodaj nowe tagi" }}
                  labelPosition="right"
                  placeholder="Kazdy tag odzielony spacją"
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </Segment>
              <Segment attached>
                <Button
                  color="blue"
                  fluid
                  type="submit"
                  onClick={() => {
                    let allTags = tagsarr.concat(newTags.split(" ")).join(" ");
                    editTags(allTags);
                  }}
                >
                  Zapisz nowe tagi
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
