import { Join } from "./components/Join/Join";
import "semantic-ui-css/semantic.min.css";
import i18n from "./i18n";
import WindowIsActive from "./util/WindowIsActive";

const App = () => {
  i18n();
  WindowIsActive();

  return <Join />;
};

export default App;
