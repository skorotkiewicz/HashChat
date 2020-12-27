import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setWindowIsActive } from "./../_actions";

const WindowIsActive = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });

  const onFocus = () => {
    dispatch(setWindowIsActive(true));
  };
  const onBlur = () => {
    dispatch(setWindowIsActive(false));
  };

  return null;
};

export default WindowIsActive;
