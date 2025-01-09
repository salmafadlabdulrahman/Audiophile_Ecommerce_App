import Image from "next/image";

const SideImg = () => {
  return (
    <div className="lg:w-[50%] w-full h-full">
      <Image
        src={"/assets/home/intro.jpg"}
        alt="intro pic"
        width={60}
        height={60}
        className="object-cover w-full h-full"
        unoptimized
      />
    </div>
  );
};

export default SideImg;
