const makeText = (path) => {
  const text = path.split("_").join(" ");
  return text;
};

export default makeText;
