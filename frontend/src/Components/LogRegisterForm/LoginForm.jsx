import "./LogRegisterForm.scss";

import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import addressesActions from "../../redux/actions/addressesActions";
import userActions from "../../redux/actions/userActions";
import wishlistActions from "../../redux/actions/wishlistActions";
import apiInstance from "../../services/api/api";
import Input from "../Input/Input";
import { ToastContext } from "../Toasts/ToastProvider";

const LoginForm = () => {
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [, dispatchToast] = useContext(ToastContext);

  const dispatch = useDispatch();

  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    const userData = { mail_address: mailAddress, password: password };
    apiInstance
      .post("/auth/login", userData)
      .then((response) => {
        const xsrfToken = response.data.xsrfToken;
        localStorage.setItem("xsrfToken", xsrfToken);
        return apiInstance
          .get(`/user`)
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
            const redirectUrl = history.location.state !== undefined ? history.location.state.from : "/";
            history.push(redirectUrl);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatchToast({
            type: "ADD_TOAST",
            payload: {
              id: "toast " + Date.now(),
              status: "failed",
              text: "Failed auth! Retry please :)",
            },
          });
        }
      });
  };

  return (
    <div className="formWrapper">
      <div className="formContent lightDarkColor">
        <h2 className="formHeader alignCenter">LOGIN</h2>
        <form className="formContainer" onSubmit={(e) => login(e)} autoComplete="on">
          <Input
            type="email"
            name="email"
            value={mailAddress}
            onChange={setMailAddress}
            isMidWidth={false}
            placeHolder="Email"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={setPassword}
            isMidWidth={false}
            placeHolder="Password"
          />
          <button type="submit" value="Login" className="submitButton">
            <span className="mediumText bold">Login</span>
          </button>
        </form>

        <p className="smallText lightGreyColor alignCenter">
          First time on Candle Shop ?{" "}
          <Link to="/account/register" className="mediumBold decoratedLinks">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
