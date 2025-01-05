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