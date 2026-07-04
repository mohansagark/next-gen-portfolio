import { getContent } from "./contentStore";
import socials from "../../public/fakedata/socials";

const getSocials = () => {
  return getContent("socials") || socials;
};

export default getSocials;
