import "./MyProfile.scss";

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import userActions from "../../redux/actions/userActions";
import apiInstance from "../../services/api/api";
import { checkingNullableField } from "../../services/utils/inputsUtils";
import Input from "../Input/Input";
import { ToastContext } from "../Toasts/ToastProvider";

//import { format } from "date-fns";

const MyProfile = () => {
  const currentUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [, dispatchToast] = useContext(ToastContext);

  const [mailAddress, setMailAddress] = useState(currentUser.mailAddress);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [birthdate, setBirthdate] = useState(currentUser.birthdate);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);

  const editCustomer = (e) => {
    e.preventDefault();

    const customerData = {
      mailAddress,
      firstName,
      lastName,
      birthdate,
      phoneNumber: checkingNullableField(phoneNumber),
    };

    apiInstance
      .put("/user", customerData)
      .then(() => {
        dispatch({ ...userActions.USER_EDIT, payload: customerData });
        dispatchToast({
          type: "ADD_TOAST",
          payload: {
            id: "toast " + Date.now(),
            status: "success",
            text: "Your infos have been edited",
          },
        });
      })
      .catch((err) =>
        dispatchToast({
          type: "ADD_TOAST",
          payload: {
            id: "toast " + Date.now(),
            status: "failed",
            text: "Profile infos editing failed, try again later",
          },
        }),
      );
  };

  // const dateFormat = (str) => {
  // 	const dateArr = str.split("-");
  // 	return format(new Date(dateArr[0], dateArr[1], dateArr[2]), "MMMM do yyyy");
  // };

  return (
    <div className="myProfile alignCenter">
      <h2 className="sectionTitle">MY PROFILE</h2>

      {/* <div className="profileSummary usualText">
				<div className="leftProfile">
					<span>Name</span>
					<p>
						{currentUser.firstName} {currentUser.lastName}
					</p>

					<p>Member since {dateFormat(currentUser.signUpDate)}</p>
				</div>
				<div className="rightProfile">
					<span>Last order : </span>
					<p>no order yet !</p>
				</div>
			</div> */}

      <form className="formContainer" onSubmit={(e) => editCustomer(e)}>
        <h4>EDIT MY INFOS</h4>
        <Input
          type="email"
          name="email"
          value={mailAddress}
          onChange={setMailAddress}
          isMidWidth={false}
          placeHolder="Email"
          required={true}
        />
        <div className="midWidthInputWrapper">
          <Input
            type="text"
            name="firstname"
            value={firstName}
            onChange={setFirstName}
            isMidWidth={true}
            placeHolder="First name"
            required={true}
          />
          <Input
            type="text"
            name="lastname"
            value={lastName}
            onChange={setLastName}
            isMidWidth={true}
            placeHolder="Last name"
            required={true}
          />
        </div>

        <div className="midWidthInputWrapper">
          <Input
            type="date"
            name="birthdate"
            value={birthdate}
            onChange={setBirthdate}
            isMidWidth={true}
            placeHolder="Birthdate"
            required={true}
          />

          <Input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={setPhoneNumber}
            isMidWidth={true}
            placeHolder="Phone number"
            required={false}
          />
        </div>
        <button type="submit" className="submitButton">
          <span className="mediumText bold">Edit</span>
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
