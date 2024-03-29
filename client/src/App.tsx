import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import routes from "./utils/routes";
import "./styles/main.scss";
import Header from "./components/header";
import HomePageContainer from "./page-containers/home";
import SearchPageContainer from "./page-containers/search";
import client from "./apollo-client";
import Apartment from "./components/apartment";
import PageNotFound from "./page-containers/page-not-found";
import ConfirmUser from "./components/confirm-user";
import PrivateRoutes from "./components/private-route";
import AddRentalUnit from "./components/add-rental-unit";
import ScrollToTop from "./components/scroll-to-top";
import ReserveConfirmationContainer from "./page-containers/reserve-confirmation";
import HostBookingsContainer from "./page-containers/host-bookings";

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <div className="app-content">
        <Routes>
          <Route path={routes.HOME} element={<HomePageContainer />} />
          <Route path={routes.SEARCH} element={<SearchPageContainer />} />
          <Route path={routes.APARTMENT}>
            <Route path=":id" element={<Apartment />} />
          </Route>
          <Route path={routes.USER}>
            <Route
              path="confirm/:id"
              element={
                <>
                  <ConfirmUser />
                  <HomePageContainer />
                </>
              }
            />
          </Route>

          {/* Protected routes */}
          <Route path="/" element={<PrivateRoutes />}>
            <Route path={routes.ADD_RENTAL_UNIT} element={<AddRentalUnit />} />
            <Route path="/" element={<PrivateRoutes host />}>
              <Route path={routes.HOST_BOOKINGS} element={<HostBookingsContainer />} />
            </Route>
            <Route path={routes.RESERVE} element={<ReserveConfirmationContainer />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
