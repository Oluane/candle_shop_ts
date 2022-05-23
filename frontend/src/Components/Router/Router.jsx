import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import addressesActions from "../../redux/actions/addressesActions";
import userActions from "../../redux/actions/userActions";
import wishlistActions from "../../redux/actions/wishlistActions";
import apiInstance from "../../services/api/api";
import { routes } from "../../services/routes";
import Footer from "../Footer/Footer";
import NavbarDisplayer from "../Navbar/NavbarDisplayer";

const PrivateRoute = ({ component: Component, auth, authenticationRequestState, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      switch (auth) {
        case true:
          return <Component {...props} />;
        case false:
          switch (authenticationRequestState) {
            case "notYetAsked":
            case "loading":
              return null;
            case "ok":
              return <Component {...props} />;
            case "invalidToken":
            case "noToken":
              return (
                <Redirect
                  to={{
                    pathname: "/account/login",
                    state: { from: props.location.pathname },
                  }}
                />
              );
            default:
              return null;
          }
        default:
          return null;
      }
    }}
  />
);

const Router = () => {
  const dispatch = useDispatch();
  const isLoggedUser = useSelector((state) => state.user.isLoggedIn);
  const [authenticationRequestState, setAuthenticationRequestState] = useState("notYetAsked");

  //checking if current user has already been logged recently (with presence of a valid xrsf token) & trying to retrieve his infos
  useEffect(() => {
    if (!isLoggedUser) {
      let xsrfToken = localStorage.getItem("xsrfToken");

      if (xsrfToken !== null) {
        setAuthenticationRequestState("loading");
        apiInstance
          .get("/user")
          .then(({ data }) => {
            dispatch({ ...userActions.USER_LOGIN, payload: data[0] });

            const wishlistRequest = apiInstance.get(`/user/${data[0].id}/wishlist`);
            const addressesRequest = apiInstance.get(`/user/${data[0].id}/address`);

            Promise.all([wishlistRequest, addressesRequest])
              .then((responses) => {
                const wishlistData = responses[0].data;
                const addressesData = responses[1].data;

                const { wishlistId, creationDatetime } = wishlistData[0];
                const wishlistProducts = wishlistData.map(
                  ({ wishlistId, creationDatetime, ...keepProperties }) => keepProperties,
                );

                dispatch({
                  ...wishlistActions.WISHLIST_SET,
                  payload: {
                    id: wishlistId,
                    creationDatetime,
                    products: wishlistProducts[0].candleId !== null ? wishlistProducts : [],
                  },
                });
                dispatch({
                  ...addressesActions.ADDRESSES_SET,
                  payload: addressesData,
                });
              })
              .catch((err) => {
                console.log(err);
              });

            setAuthenticationRequestState("ok");
          })
          .catch((err) => {
            if (err.response.status === 401) {
              setAuthenticationRequestState("invalidToken");
            } else {
              setAuthenticationRequestState("internalError");
            }
          });
      } else {
        setAuthenticationRequestState("noToken");
      }
    }
  }, [isLoggedUser, dispatch]);

  return (
    <>
      <NavbarDisplayer />
      <main style={{ marginTop: "65px" }}>
        <Switch>
          {Object.keys(routes).map((route, key) => {
            const { path, component, isPrivate } = routes[route];

            if (!isPrivate) {
              return <Route exact path={path} component={component} key={key} />;
            } else {
              return (
                <PrivateRoute
                  exact
                  path={path}
                  component={component}
                  auth={isLoggedUser}
                  key={key}
                  authenticationRequestState={authenticationRequestState}
                />
              );
            }
          })}
          <Redirect from="*" to="/" />
        </Switch>
      </main>
      <Footer />
    </>
  );
};

export default Router;
