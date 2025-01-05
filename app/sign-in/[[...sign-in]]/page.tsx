import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

const page = () => {
  return (
    <div className="auth-form">
      <div>
        <SignIn />
      </div>
      
    </div>
  );
};

export default page;


/*<div className="border w-[50%]">
        <Image
          src={"/assets/home/mobile/old-image-hero.jpg"}
          alt="headphones"
          width={20}
          height={20}
          unoptimized
          className="object-contain h-full "
        />
      </div> */