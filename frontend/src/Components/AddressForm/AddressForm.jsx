import "./AddressForm.scss";

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import addressesActions from "../../redux/actions/addressesActions";
import apiInstance from "../../services/api/api";
import { checkingNullableField } from "../../services/utils/inputsUtils";
import IconSvg from "../IconSvg/IconSvg";
import Input from "../Input/Input";
import { ToastContext } from "../Toasts/ToastProvider";

const AddressForm = ({ addressObj = {} }) => {
  const currentUser = useSelector((state) => state.user.data);
  const userAddresses = useSelector((state) => state.addresses);
  const dispatch = useDispatch();
  const [, dispatchToast] = useContext(ToastContext);

  const [address, setAddress] = useState(addressObj.address || "");
  const [addressComplement, setAddressComplement] = useState(addressObj.addressComplement || null);
  const [city, setCity] = useState(addressObj.city || "");
  const [zipCode, setZipCode] = useState(addressObj.zipCode || "");
  const [name, setName] = useState(addressObj.name || null);
  const [isFavorite, setIsFavorite] = useState(addressObj.isFavorite || 0);

  const editAddress = (e) => {
    e.preventDefault();

    const newAddressData = {
      address,
      addressComplement: checkingNullableField(addressComplement),
      city,
      zipCode,
      name: checkingNullableField(addressComplement),
      isFavorite,
      id: addressObj.id,
    };

    apiInstance
      .put(`/user/${currentUser.id}/address/${addressObj.id}`, newAddressData)
      .then(() => {
        dispatch({ ...addressesActions.ADDRESSES_EDIT_ONE, payload: newAddressData });
        dispatchToast({
          type: "ADD_TOAST",
          payload: {
            id: "toast " + Date.now(),
            status: "success",
            text: "Address updated.",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatchToast({
          type: "ADD_TOAST",
          payload: {
            id: "toast " + Date.now(),
            status: "success",
            text: "A problem occurred while updating address. Try again :) ",
          },
        });
      });
  };

  const addAddress = (e) => {
    e.preventDefault();

    const newAddressData = {
      address,
      addressComplement: checkingNullableField(addressComplement),
      city,
      zipCode,
      name: checkingNullableField(name),
      isFavorite,
    };

    if (userAddresses[0].id === -1) {
      newAddressData.isFavorite = 1;
    }

    apiInstance
      .post(`/user/${currentUser.id}/address`, newAddressData)
      .then((res) => {
        newAddressData.id = res.data.insertId;
        dispatch({ ...addressesActions.ADDRESSES_ADD_ONE, payload: newAddressData });
        dispatchToast({
          type: "ADD_TOAST",
          payload: {
            id: "toast " + Date.now(),
            status: "success",
            text: "New address added.",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatchToast({
          type: "ADD_TOAST",
          payload: {
            id: "toast " + Date.now(),
            status: "success",
            text: "A problem occurred while adding address. Try again :) ",
          },
        });
      });
  };

  return (
    <>
      {addressObj !== undefined && (
        <form
          className="addressFormContainer"
          onSubmit={(e) => {
            Object.keys(addressObj).length !== 0 ? editAddress(e) : addAddress(e);
          }}
        >
          <Input
            type="text"
            name="address"
            value={address}
            onChange={setAddress}
            isMidWidth={false}
            placeHolder="Address"
            required={true}
          />
          <div className="midWidthInputWrapper">
            <Input
              type="text"
              name="addressComplement"
              value={addressComplement}
              onChange={setAddressComplement}
              isMidWidth={true}
              placeHolder="Additional address"
              required={false}
            />
            <Input
              type="text"
              name="zipCode"
              value={zipCode}
              onChange={setZipCode}
              isMidWidth={true}
              placeHolder="ZIP Code"
              required={true}
              pattern={"[0-9]{5}"}
            />
          </div>

          <Input
            type="text"
            name="city"
            value={city}
            onChange={setCity}
            isMidWidth={false}
            placeHolder="City"
            required={true}
          />

          <Input
            type="text"
            name="name"
            value={name}
            onChange={setName}
            isMidWidth={false}
            placeHolder="Addresse Name (optional)"
            required={false}
          />

          {!addressObj.isFavorite && (
            <div className="inputLabel checkboxInput" onClick={() => setIsFavorite(isFavorite ? 0 : 1)}>
              <input
                type="checkbox"
                name="isFavAddress"
                checked={isFavorite ? true : false}
                className="customCheckbox"
                // onChange={() => {}}
              />
              <span className="checkIcon">
                <IconSvg iconName="checkArrow" />
              </span>
              <span className="smallText checkboxText">This is my main address</span>
            </div>
          )}

          <button type="submit" className="mediumText mediumBold">
            SAVE MY ADDRESS
          </button>
        </form>
      )}
    </>
  );
};

export default AddressForm;
