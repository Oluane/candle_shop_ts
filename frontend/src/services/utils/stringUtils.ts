export const convertCamelToSnake = (string: string) => {
  const regex = /[\w][A-Z]/g;
  if (string) {
    return string
      .replace(regex, ($1) => {
        return $1[0] + "_" + $1[1];
      })
      .toLowerCase();
  }
};

export const convertSnakeToCamel = (string: string) => {
  const regex = /[_][a-z0-9]/g;
  if (string) {
    return string.replace(regex, (match) => {
      return match[1].toUpperCase();
    });
  }
};
