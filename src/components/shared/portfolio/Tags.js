import Link from "next/link";

const Tags = ({ tags }) => {
  return (
    <ul className=" flex gap-10px items-center flex-wrap">
      {tags?.length
        ? tags?.map((tag, idx) => (
            <li key={idx}>
              <Link
                href="#"
                className="text-white-color px-10px py-2 bg-seondary-color leading-1 hover:bg-primary-color rounded-full"
              >
                {tag}
              </Link>
            </li>
          ))
        : ""}
    </ul>
  );
};

export default Tags;
