import { useState } from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { SettingsModal } from "./SettingsModal";
import { HelpModal } from "./HelpModal";

export const Settings = ({ name, tags }) => {
  const t = useSelector((state) => state.translation.settings);

  const [openSettings, setOpenSettings] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

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
            <Icon name="user" /> {t.t3a}, {name}
          </span>
        }
        options={options}
        onChange={(e, data) => {
          switch (data.value) {
            case "settings":
              setOpenSettings(true);
              break;
            case "help":
              setOpenHelp(true);
              break;
            case "sign-out":
              window.location.href = "/";
              break;

            default:
              break;
          }
        }}
      />

      <SettingsModal
        setOpenSettings={setOpenSettings}
        openSettings={openSettings}
        tags={tags}
      />
      <HelpModal setOpenHelp={setOpenHelp} openHelp={openHelp} />
    </div>
  );
};
