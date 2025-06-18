import sliceText from "@/libs/sliceText";
import Link from "next/link";

const HeroBreadcarumb = ({ title, text, actualItem, path }) => {
  return (
    <section>
      <div className="hero-breadcurmb pt-150px md:pt-40 lg:pt-200px pb-50px md:pb-60px lg:b-100px bg-[url('/img/breadcrumb/breadcrumb-bg.jpg')] bg-cover bg-center bg-no-repeat relative z-1 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-primary-color-light after:-z-1 after:opacity-70">
        <div className="container">
          <div className="flex flex-col items-center">
            <h1 className="text-size-35 md:text-size-40 lg:text-size-50 font-bold text-white-color mb-15px capitalize text-center">
              {title}
            </h1>
            {/* <!-- breadcrumbs --> */}
            <ul className="nav flex flex-wrap justify-center items-center gap-x-3">
              <li className="nav_item group relative">
                <Link
                  href="/"
                  className="font-medium text-white-color capitalize relative z-0 after:w-0 after:h-1px after:bg-white-color after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 group-hover:after:w-full"
                >
                  Home
                </Link>
              </li>
              {actualItem ? (
                <>
                  {" "}
                  <li className="nav_item group relative">
                    <p className="font-medium text-white-color capitalize relative flex items-center gap-10px">
                      <i className=" fa-regular fa-greater-than text-xs"></i>
                    </p>
                  </li>
                  <li className="nav_item group relative">
                    <Link
                      href={path}
                      className="font-medium text-white-color capitalize relative z-0 after:w-0 after:h-1px after:bg-white-color after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 group-hover:after:w-full"
                    >
                      {actualItem}
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
              <li className="nav_item group relative">
                <p className="font-medium text-white-color capitalize relative flex items-center gap-10px">
                  <i className="fa-regular fa-greater-than text-xs"></i>
                </p>
              </li>
              <li className="nav_item group relative">
                <p className="font-medium text-white-color capitalize relative flex items-center gap-10px ">
                  {sliceText(text, 23, true)}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBreadcarumb;
