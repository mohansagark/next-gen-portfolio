import resumeData from "../../public/fakedata/resume.json";

const getResume = () => {
  return resumeData || [];
};

export default getResume;
