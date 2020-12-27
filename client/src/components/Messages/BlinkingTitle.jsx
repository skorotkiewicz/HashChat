import { useEffect, useState } from "react";
// import Favico from "favico.js";
import { useSelector } from "react-redux";
import favico from "./../../util/NotifiFavicon";

const title = document.title;
export const BlinkingTitle = ({ messages, interval, t, notifi }) => {
  const [id, setId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const windowIsActive = useSelector((state) => state.windowIsActive);
  let notifiTitle = `${unreadCount} ${unreadCount > 1 ? t.t6 : t.t7}`;

  useEffect(() => {
    if (!windowIsActive) {
      setUnreadCount(unreadCount + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (windowIsActive) {
      if (unreadCount > 0) {
        if (id) clearInterval(id);
        document.title = title;
        setUnreadCount(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowIsActive]);

  useEffect(() => {
    if (!windowIsActive) {
      if (id) clearInterval(id);
      var idx = setInterval(() => {
        if (document.title !== notifiTitle) {
          document.title = notifiTitle;
        } else {
          document.title = title;
        }
      }, interval);
      setId(idx);
      notifi && play();
      favico(unreadCount);
    }

    return () => {
      if (idx) clearInterval(idx);
      document.title = title;
      favico();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifiTitle]);

  const play = () => {
    let audio = new Audio("/notifi.mp3");
    audio.volume = 0.2;
    audio.play();
  };

  return null;
};
