import Image from "next/image";

const GallerySingle = ({ url }) => {
  return (
    <div className="gallery_item">
      <Image src={url} alt="" width={2000} height={2000} />
    </div>
  );
};

export default GallerySingle;
