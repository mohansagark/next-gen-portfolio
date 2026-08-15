/** Server passthrough — CI Lighthouse builds do not need a client content store. */
export default function ContentProvider({ children }) {
  return children;
}
