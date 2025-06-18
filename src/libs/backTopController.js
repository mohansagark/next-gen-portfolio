const backTopController = () => {
  // Toggle light mode
  //   const switchElement = document.querySelector(".switch");
  //   switchElement.addEventListener("click", () => {
  //     const body = document.body;
  //     if (body.classList.contains("light")) {
  //       body.classList.remove("light");
  //       switchElement.classList.remove("switched");
  //     } else {
  //       body.classList.add("light");
  //       switchElement.classList.add("switched");
  //     }
  //   });

  // Progress bar setup
  const progressPath = document.querySelector(".progress-wrap path");
  const pathLength = progressPath.getTotalLength();

  // Set initial stroke properties
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect(); // Trigger reflow
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  // Update progress bar on scroll
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPercent = scrollTop / (documentHeight - windowHeight);
    const drawLength = pathLength * (1 - scrollPercent);
    progressPath.style.strokeDashoffset = drawLength;
  };

  updateProgress(); // Initialize on load
  window.addEventListener("scroll", updateProgress);

  // Show/hide progress button
  window.addEventListener("scroll", () => {
    const progressWrap = document.querySelector(".progress-wrap");
    if (window.scrollY > 50) {
      progressWrap.classList.add("active-progress");
    } else {
      progressWrap.classList.remove("active-progress");
    }
  });

  // Scroll to top on progress button click
  const progressWrap = document.querySelector(".progress-wrap");
  progressWrap.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

export default backTopController;
