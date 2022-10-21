import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./utils/routes";
import "./styles/main.scss";

const App = () => (
  <div className="App">
    <header className="App-header">header</header>
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME} element={<div>home container</div>} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
