import getSocials from "@/libs/getSocials";

const Socials5 = () => {
  const socials = getSocials();
  return (
    <ul className=" hidden xl:flex  gap-x-10px">
      {socials?.length
        ? socials.map(({ id, iconName, path }) => (
            <li key={id}>
              <a
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={id}
                className="text-primary-color hover:text-body-color text-size-13 border border-primary-color dark:border-border-color-3 dark:hover:border-primary-color w-30px h-30px rounded-full flex items-center justify-center overflow-hidden relative z-0 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:scale-0 after:bg-primary-color hover:after:scale-105 after:transition-all after:duration-300 after:z-[-1] after:rounded-full"
              >
                <i className={iconName}></i>
              </a>
            </li>
          ))
        : null}
    </ul>
  );
};

export default Socials5;
