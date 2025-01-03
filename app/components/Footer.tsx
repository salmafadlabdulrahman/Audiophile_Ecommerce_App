import Image from "next/image";
import NavItems from "./NavItems";
import Location from "./Location";

const Footer = () => {
  return (
    <div className="bg-black">
      <footer className="pb-[2em] px-5">
        <div className="lg:flex items-center justify-between">
          <div className="w-[135px] border-t-4 border-t-orange">
            <Image
              src="/assets/shared/desktop/logo.svg"
              alt="logo"
              width={100}
              height={100}
              unoptimized
              className="w-[130px] pt-[2em]"
            />
          </div>

          <div className="mt-8">
            <NavItems textSize=".8em" gap="1.5rem" flexwrap={true} />
          </div>
        </div>
        <div className="text-lightGray mt-[2em] w-[90%] lg:w-[50%]">
          <p>
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <p className="text-lightGray">Copyright 2021. All Rights Reserved</p>
          <ul className="flex flex-wrap items-center gap-3">
            <li>
              <Image
                src={"/assets/shared/desktop/icon-facebook.svg"}
                alt="facebook icon"
                width={25}
                height={25}
              />
            </li>
            <li>
              <Image
                src={"/assets/shared/desktop/icon-twitter.svg"}
                alt="twitter icon"
                width={25}
                height={25}
              />
            </li>
            <li>
              <Image
                src={"/assets/shared/desktop/icon-instagram.svg"}
                alt="instagram icon"
                width={25}
                height={25}
              />
            </li>
          </ul>
        </div>
      </footer>{" "}
    </div>
  );
};

export default Footer;