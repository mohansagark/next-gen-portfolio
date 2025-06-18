const stickyHeader = () => {
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const header = document.querySelector(".header-area.header-sticky");
    if (header) {
      if (scroll > 300) {
        header.classList.add("sticky");
        header.classList.remove("sticky-out");
      } else if (scroll < lastScrollTop) {
        if (scroll < 500) {
          header.classList.add("sticky-out");
          header.classList.remove("sticky");
        }
      } else {
        header.classList.remove("sticky");
      }

      lastScrollTop = scroll;
    }
  });
};

export default stickyHeader;
