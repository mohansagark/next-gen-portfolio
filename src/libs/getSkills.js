import { getContent } from "./contentStore";
import skillsData from "../../public/fakedata/skills.json";

const getSkills = () => {
  return getContent("skills") || skillsData || [];
};

export default getSkills;
