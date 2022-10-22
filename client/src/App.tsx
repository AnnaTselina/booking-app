import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import routes from "./utils/routes";
import "./styles/main.scss";
import Header from "./components/header";
import HomePageContainer from "./page-containers/home";
import SearchPageContainer from "./page-containers/search";
import client from "./apollo-client";
import Apartment from "./components/apartment";

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <div className="app-content">
        <Routes>
          <Route path={routes.HOME} element={<HomePageContainer />} />
          <Route path={routes.SEARCH} element={<SearchPageContainer />} />
          <Route path={routes.APARTMENT}>
            <Route path=":id" element={<Apartment />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
