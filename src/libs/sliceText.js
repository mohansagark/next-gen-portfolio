const sliceText = (text, length, ext) => {
  if (!text || typeof text !== "string") return "";
  return text.length > length
    ? `${text.slice(0, length)}${ext ? "..." : ""}`
    : text;
};

export default sliceText;
