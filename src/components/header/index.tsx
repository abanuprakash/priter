import Image from "next/image";
import Avatar from "../../../public/assets/images/avatar.avif";
import Logo from "../../../public/assets/images/logo.png";
import LoginButton from "../Auth/LoginButton";

const Header = () => {
  return (
    <header
      className={`bg-white w-full z-20 shadow-lg h-14 lg:h-16 fixed top-0`}
    >
      <section className={`flex w-100 items-center justify-between py-2 px-4 lg:px-24`}>
        <Image
          src={Logo}
          alt="logo"
          className="inline-block w-36 h-9 cursor-pointer"
        />
        <LoginButton />

        <Image
          src={Avatar}
          alt="avatar"
          className={`inline-block rounded-full ring-2 ring-green justify-end mr-3 lg:mr-0 cursor-pointer h-7 w-7 lg:h-10 lg:w-10
          }`}
        />
      </section>
    </header>
  );
};

export default Header;
