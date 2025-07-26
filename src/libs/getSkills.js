import skillsData from "../../public/fakedata/skills.json";

const getSkills = () => {
  return skillsData || [];
};

export default getSkills;
