export const isInputFilled = (string: string) => (string ? true : false);

export const checkingNullableField = (fieldValue: string) => (fieldValue === "" ? null : fieldValue);
