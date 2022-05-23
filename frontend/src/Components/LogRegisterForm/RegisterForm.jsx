import "./LogRegisterForm.scss";

import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";

import IconSvg from "../IconSvg/IconSvg";
import Input from "../Input/Input";
import apiInstance from "../../services/api/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import userActions from "../../redux/actions/userActions";

const RegisterForm = () => {
	const [mailAddress, setMailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	//const [arePasswordSame, setArePasswordSame] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [newsletterIn, setNewsletterIn] = useState(false);

	const dispatch = useDispatch();
	const history = useHistory();

	const createNewCustomer = (e) => {
		e.preventDefault();

		const userData = {
			mail_address: mailAddress,
			password: password,
			first_name: firstName,
			last_name: lastName,
			birthdate: birthdate,
			newsletter_checked: newsletterIn,
		};

		axios
			.post("/api/auth/signup", userData)
			.then(({ data }) => {
				const xsrfToken = data.xsrfToken;
				localStorage.setItem("xsrfToken", xsrfToken);
				return apiInstance
					.get(`/user`)
					.then(({ data }) => {
						dispatch({ ...userActions.USER_LOGIN, payload: data[0] });
						const redirectUrl =
							history.location.state !== undefined
								? history.location.state.from
								: "/";
						history.push(redirectUrl);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	//TODO -> implement password checking
	// const isPasswordsIso = (e) => {
	// 	if (e.target.name === "password" && passwordConfirm !== "") {
	// 		if (e.target.value === passwordConfirm) {
	// 			setArePasswordSame(true);
	// 		} else {
	// 			setArePasswordSame(false);
	// 		}
	// 	} else if (e.target.name === "passwordConfirm" && password !== "") {
	// 		if (e.target.value === password) {
	// 			setArePasswordSame(true);
	// 		} else {
	// 			setArePasswordSame(false);
	// 		}
	// 	}
	// };

	return (
		<div className="formWrapper">
			<div className="formContent lightDarkColor">
				<h2 className="formHeader alignCenter">REGISTER</h2>
				<form
					className="formContainer"
					onSubmit={(e) => createNewCustomer(e)}
					autoComplete="on"
				>
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

					<Input
						type="date"
						name="birthdate"
						value={birthdate}
						onChange={setBirthdate}
						isMidWidth={false}
						placeHolder="Birthdate"
						specialClasses={true}
						required={true}
					/>

					<Input
						type="password"
						name="password"
						value={password}
						onChange={setPassword}
						isMidWidth={false}
						placeHolder="Password"
						required={true}
					/>
					<Input
						type="password"
						name="passwordConfirm"
						value={passwordConfirm}
						onChange={setPasswordConfirm}
						isMidWidth={false}
						placeHolder="Confirm your password"
						required={true}
					/>

					<div className="inputLabel checkboxInput">
						<input
							type="checkbox"
							name="newsletterIn"
							onChange={() => setNewsletterIn(!newsletterIn)}
							className="customCheckbox "
						/>
						<span className="checkIcon">
							<IconSvg iconName="checkArrow" />
						</span>
						<span className="smallText checkboxText">
							I subscribe to the super Candle Shop newsletter !
						</span>
					</div>

					<button type="submit" value="Register" className="submitButton">
						<span className="mediumText bold">Register</span>
					</button>
				</form>

				<p className="smallText lightGreyColor alignCenter">
					Already registered on Candle Shop ?{" "}
					<Link to="/account/login" className="mediumBold decoratedLinks">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterForm;
