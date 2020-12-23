import { useState } from "react";
import { Button, Header, Modal, Dropdown, Icon } from "semantic-ui-react";

import English from "./../../i18n/en.json";
import Polish from "./../../i18n/pl.json";
import Germany from "./../../i18n/de.json";

import { useDispatch, useSelector } from "react-redux";
import { setTranslation, setLanguage, setTheme } from "./../../_actions";

export const SettingsModal = ({ name }) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const t = useSelector((state) => state.translation.settings);
  const theme = useSelector((state) => state.theme);

  const [open, setOpen] = useState(false);

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

  const options = [
    {
      key: "user",
      text: (
        <span>
          {t.t5} <strong>{name}</strong>
        </span>
      ),
      disabled: true,
    },

    { key: "help", value: "help", text: t.t6 },
    { key: "settings", value: "settings", text: t.t1 },
    { key: "sign-out", value: "sign-out", text: t.t7 },
  ];

  return (
    <div>
      <Dropdown
        value={""}
        trigger={
          <span>
            {/* <Label color="violet" image>
              <Image
                src={`https://robohash.org/${name}.png?bgset=bg2&size=50x50`}
              />
              {name}
            </Label> */}
            <Icon name="user" /> {t.t3a}, {name}
          </span>
        }
        options={options}
        onChange={(e, data) => {
          switch (data.value) {
            case "settings":
              setOpen(true);
              break;
            case "help":
              //
              break;
            case "sign-out":
              //
              break;

            default:
              break;
          }
        }}
      />

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        // trigger={
        //   <Button icon labelPosition="left" size="mini" color="blue">
        //     <Icon name="settings" />
        //     {t.t1}
        //   </Button>
        // }
      >
        <Modal.Header>{t.t1}</Modal.Header>

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

        <Modal.Actions>
          <Button
            content={t.t4}
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
