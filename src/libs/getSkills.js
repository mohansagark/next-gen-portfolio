import { skillsData } from "../data/adminData";

const getSkills = () => {
  return skillsData || [];
};

export default getSkills;
