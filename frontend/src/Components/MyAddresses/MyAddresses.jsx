import "./MyAddresses.scss";

import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import addressesActions from "../../redux/actions/addressesActions";
import apiInstance from "../../services/api/api";
import AddressForm from "../AddressForm/AddressForm";
import NoContent from "../NoContent/NoContent";
import { ToastContext } from "../Toasts/ToastProvider";

const MyAddresses = () => {
  const userAddresses = useSelector((state) => state.addresses);
  const currentUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [, dispatchToast] = useContext(ToastContext);

  const [showEditingAddressId, setShowEditingAddressId] = useState(null);
  const [showAddingAddress, setShowAddingAddress] = useState(false);

  let favAddress = userAddresses.find((address) => address.isFavorite === 1);
  let otherAddresses = userAddresses.filter((address) => favAddress && address.id !== favAddress.id);

  useEffect(() => {
    setShowEditingAddressId(null);
    setShowAddingAddress(false);
  }, [userAddresses]);

  const deleteAddress = (addressId) => {
    apiInstance
      .delete(`/user/${currentUser.id}/address/${addressId}`)
      .then(({ data }) => {
        const actionPayload = { deletedAddressId: addressId, nextFavAddressId: data !== "" ? data.newFavId : null };

        dispatch({
          ...addressesActions.ADDRESSES_DELETE_ONE,
          payload: actionPayload,
        });

        dispatchToast({
          type: "ADD_TOAST",
          payload: {
            id: "toast " + Date.now(),
            status: "success",
            text: "Address deleted.",
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
            text: "A problem occured trying to delete address. Try again :) ",
          },
        });
      });
  };

  return (
    <div className="myAddresses">
      <h2 className="sectionTitle">MY ADDRESSES</h2>
      <div className="mainWrapper">
        {userAddresses.length <= 1 && userAddresses[0].id === -1 && (
          <NoContent iconName="addressBook" text="You haven't save your address yet !" />
        )}
        {userAddresses.length < 5 && (
          <div className="addingNewAddressWrapper">
            {!showAddingAddress ? (
              <button
                className="mediumBold mediumText"
                onClick={() => {
                  setShowAddingAddress(true);
                  setShowEditingAddressId(null);
                }}
              >
                Add a new address
              </button>
            ) : (
              <>
                <h4 className="alignCenter">ADD A NEW ADDRESS</h4>
                <AddressForm />
              </>
            )}
          </div>
        )}
        {favAddress !== undefined && (
          <div className="addressWrapper">
            <h4 className="mediumBold">My main address </h4>
            <div className="mainAddressDisplay usualText">
              <p className="mediumBold">{favAddress.name && favAddress.name}</p>
              <p>{favAddress.address}</p>
              <p>{favAddress.addressComplement && favAddress.addressComplement}</p>
              <p>
                {favAddress.zipCode} {favAddress.city}
              </p>
            </div>
            <div className="addressesActions">
              <button
                onClick={() => {
                  setShowEditingAddressId(favAddress.id);
                  setShowAddingAddress(false);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteAddress(favAddress.id)}>Delete</button>
            </div>
            {showEditingAddressId === favAddress.id && (
              <div className="editingForm">
                <h4 className="alignCenter">Edit my address</h4>
                <AddressForm addressObj={favAddress} />
              </div>
            )}
          </div>
        )}

        {otherAddresses.map((address, i) => {
          return (
            <div className="addressWrapper" key={"address" + address.id}>
              <h4 className="mediumBold">Address {i + 1}</h4>
              <div className="mainAddressDisplay usualText">
                <p className="mediumBold">{address.name && address.name}</p>
                <p>{address.address}</p>
                <p>{address.addressComplement && address.addressComplement}</p>
                <p>
                  {address.zipCode} {address.city}
                </p>
              </div>
              <div className="addressesActions">
                <button
                  onClick={() => {
                    setShowEditingAddressId(address.id);
                    setShowAddingAddress(false);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteAddress(address.id)}>Delete</button>
              </div>
              {showEditingAddressId === address.id && (
                <div className="editingForm">
                  <h4 className="alignCenter">Edit my address</h4>
                  <AddressForm addressObj={address} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAddresses;
