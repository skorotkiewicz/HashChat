import English from "./en.json";
import Polish from "./pl.json";
import Germany from "./de.json";

import { useDispatch } from "react-redux";
import { setTranslation, setLanguage } from "./../_actions";

const Languages = () => {
  const dispatch = useDispatch();
  let lang = navigator.language.toLowerCase();

  if (/^en\b/.test(lang)) {
    // english
    dispatch(setTranslation(English));
    dispatch(setLanguage("en"));
    return;
  } else if (/^pl\b/.test(lang)) {
    // polish
    dispatch(setTranslation(Polish));
    dispatch(setLanguage("pl"));
    return;
  } else if (/^de\b/.test(lang)) {
    // germany
    dispatch(setTranslation(Germany));
    dispatch(setLanguage("de"));
    return;
  } else {
    // english
    dispatch(setTranslation(English));
    dispatch(setLanguage("en"));
    return;
  }
};

export default Languages;
