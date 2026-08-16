import writingHome from "../../public/writing-home.json";

/** Slim homepage writing list — avoids bundling public/blogs.json (~2.4MB). */
const getHomeWriting = () => writingHome || [];

export default getHomeWriting;
