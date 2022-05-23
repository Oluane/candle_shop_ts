export const convertCamelToSnake = (str) => {
  const regex = /[\w][A-Z]/g;
  if (str) {
    return str
      .replace(regex, ($1) => {
        return $1[0] + "_" + $1[1];
      })
      .toLowerCase();
  }
};

export const convertSnakeToCamel = (str) => {
  const regex = /[_][a-z0-9]/g;
  if (str) {
    return str.replace(regex, (match) => {
      return match[1].toUpperCase();
    });
  }
};
