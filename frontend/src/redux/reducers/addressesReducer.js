import addressesActions from "../actions/addressesActions";

const initial = [{ id: -1, address: "", addressComplement: "", city: "", zipCode: "", name: "", isFavorite: 0 }];

export default (state = initial, action) => {
  switch (action.type) {
    case addressesActions.ADDRESSES_SET.type:
      return action.payload[0] !== undefined ? [...action.payload] : [...state];

    case addressesActions.ADDRESSES_EDIT_ONE.type:
      const prevAddressIdx = state.findIndex((address) => address.id === action.payload.id);
      const newStateToEdit = [...state];
      newStateToEdit[prevAddressIdx] = action.payload;
      if (action.payload.isFavorite === 1) {
        const prevFavAddressIdx = state.findIndex(
          (address) => address.isFavorite === 1 && address.id !== action.payload.id,
        );
        newStateToEdit[prevFavAddressIdx].isFavorite = 0;
      }
      return newStateToEdit;

    case addressesActions.ADDRESSES_DELETE_ONE.type:
      let newStateAfterDelete = state.filter((address) => address.id !== action.payload.deletedAddressId);

      if (action.payload.nextFavAddressId) {
        const nextFavAddressIdx = newStateAfterDelete.findIndex(
          (address) => address.id === action.payload.nextFavAddressId,
        );
        newStateAfterDelete[nextFavAddressIdx].isFavorite = 1;
      }

      if (newStateAfterDelete.length === 0) {
        newStateAfterDelete = initial;
      }

      return newStateAfterDelete;

    case addressesActions.ADDRESSES_ADD_ONE.type:
      let newState;

      if (state[0].id === -1 && state.length === 1) {
        if (action.payload.isFavorite === 0) action.payload.isFavorite = 1;
        newState = [action.payload];
      } else {
        newState = [...state];
        newState.push(action.payload);

        if (action.payload.isFavorite === 1) {
          const prevFavAddressIdx = state.findIndex(
            (address) => address.isFavorite === 1 && address.id !== action.payload.id,
          );
          newState[prevFavAddressIdx].isFavorite = 0;
        }
      }

      return newState;

    case addressesActions.ADDRESSES_LOGOUT_INITIAL.type:
      return initial;

    default:
      return state;
  }
};
