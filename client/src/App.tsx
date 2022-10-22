import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import routes from "./utils/routes";
import "./styles/main.scss";
import Header from "./components/header";
import HomePageContainer from "./page-containers/home";
import SearchPageContainer from "./page-containers/search";
import client from "./apollo-client";

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <div className="app-content">
        <Routes>
          <Route path={routes.HOME} element={<HomePageContainer />} />
          <Route path={routes.SEARCH} element={<SearchPageContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
