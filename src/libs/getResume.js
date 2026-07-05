import { getContent } from "./contentStore";
import resumeData from "../../public/fakedata/resume.json";

const getResume = () => {
  return getContent("resume") || resumeData || [];
};

export default getResume;
