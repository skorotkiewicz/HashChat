import English from "./en.json";
import Polish from "./pl.json";
import Germany from "./de.json";

import { useDispatch } from "react-redux";
import { setTranslation } from "./../_actions";

const Languages = () => {
  const dispatch = useDispatch();
  let lang = navigator.language.toLowerCase();

  if (/^en\b/.test(lang)) {
    // english
    return dispatch(setTranslation(English));
  } else if (/^pl\b/.test(lang)) {
    // polish
    return dispatch(setTranslation(Polish));
  } else if (/^de\b/.test(lang)) {
    // germany
    return dispatch(setTranslation(Germany));
  } else {
    // english
    return dispatch(setTranslation(English));
  }
};

export default Languages;
