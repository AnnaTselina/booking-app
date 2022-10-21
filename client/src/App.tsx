import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./utils/routes";
import "./styles/main.scss";
import Header from "./components/header";
import HomePageContainer from "./page-containers/home";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={routes.HOME} element={<HomePageContainer />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
