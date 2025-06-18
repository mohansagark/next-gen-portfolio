const sliceText = (text, length, ext) => {
  return text.length > length
    ? `${text.slice(0, length)}${ext ? "..." : ""}`
    : text;
};

export default sliceText;
