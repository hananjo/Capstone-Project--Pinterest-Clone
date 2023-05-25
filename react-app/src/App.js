import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Boards from "./components/Boards/Boards";
import BoardDetails from "./components/BoardDetails/BoardDetails";
import LandingPage from "./components/LandingPage/LandingPage";
import PinDetails from "./components/PinDetails/PinDetails";
import CreatePinModal from "./components/CreatePinModal/CreatePinModal";
import UpdatePin from "./components/UpdatePin/UpdatePin";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/create-pin" component={CreatePinModal} />
          <Route exact path="/pins/:id" component={PinDetails} />
          <Route exact path="/pins/:id/update" component={UpdatePin} />
          <Route exact path="/:id/boards" component={Boards} />
          <Route exact path="/:userId/boards/:id" component={BoardDetails} />
        </Switch>
      )}
    </>
  );
}

export default App;
