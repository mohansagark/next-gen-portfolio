import Link from "next/link";

/** Metallic sliding gradient — deep teal sheen in light, bright teal sheen in dark */
export const btnMetallicClass =
  "bg-200 bg-gradient-btn-light hover:bg-[-100%] text-white dark:bg-gradient-btn-dark dark:text-[#0b0d10] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(0,0,0,0.18)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.35)] transition-all duration-300";

/** Same metallic gradient with white label text in both themes (blog CTAs / pills). */
export const btnMetallicWhiteClass =
  "bg-200 bg-gradient-btn-light hover:bg-[-100%] text-white dark:bg-gradient-btn-dark dark:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(0,0,0,0.18)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.35)] transition-all duration-300";

const ButtonPrimary = ({
  children,
  type,
  url,
  className,
  isIcon,
  external,
}) => {
  const isExternalLink =
    external ||
    (url && (url.startsWith("http://") || url.startsWith("https://")));

  const baseClass = `text-size-15 font-bold capitalize py-17px px-35px ${
    type === 2 ? "" : "ml-10px"
  } rounded-full leading-1 group ${
    isIcon ? "inline-flex gap-10px items-center " : ""
  } ${btnMetallicClass} ${className || ""}`;

  const icon = isIcon ? (
    <i className="fa-regular fa-arrow-right transition-all duration-400 -rotate-45 group-hover:rotate-0"></i>
  ) : null;

  if (isExternalLink) {
    return (
      <a
        href={url ? url : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {children ? children : ""} {icon}
      </a>
    );
  }

  return (
    <Link href={url ? url : "#"} className={baseClass}>
      {children ? children : ""} {icon}
    </Link>
  );
};

export default ButtonPrimary;
