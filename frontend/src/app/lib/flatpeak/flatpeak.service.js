const throwOnApiError = (input) => {
  if (input?.object === "error") {
    throw new Error(input.message);
  }
  return input;
};

export { throwOnApiError };
