import Image from "next/image";
import Avatar from "../../../public/assets/images/avatar.avif";
import Logo from "../../../public/assets/images/logo.png";
import LoginButton from "../Auth/LoginButton";
import { signOut, useSession } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import { GlobalConstants } from "@/_const/globalConstants";
import { useEffect, useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const isTabletOrMobile = useMediaQuery(GlobalConstants.tabletAndMobileQuery);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, [isTabletOrMobile]);


  return (
    <header
      className={`bg-white w-full z-20 shadow-lg h-14 lg:h-16 fixed top-0`}
    >
      <section className={`flex w-100 items-center justify-between py-2 px-4 lg:px-24`}>
         <Image
          src={Logo}
          alt="logo"
          className="inline-block w-36 h-12 cursor-pointer"
        /> 
        <div></div>

        {session
          ?
          <div className="flex flex-row items-center">
            <div className="h-7 w-7 lg:h-10 lg:w-10 relative">
              <Image
                src={session.user?.image ?? Avatar}
                fill={true}
                alt="avatar"
                className={`inline-block rounded-full ring-2 ring-green justify-end mr-3 lg:mr-0 cursor-pointer}`}
              />
            </div>
            <div className="ml-2">
              {isClient && isTabletOrMobile
                ? <p className="ml-2  text-ellipsis overflow-hidden w-[100px] line-clamp-1">{`Hi, ${session.user?.name?.split(" ")[0] ?? ''}`}</p>
                : <p className="ml-2 text-ellipsis overflow-hidden w-[130px] line-clamp-1">{`Hi, ${session.user?.name ?? ''}`}</p>
              }
              <button className="ml-2 text-red" onClick={() => signOut()}>Sign out</button>
            </div>

          </div>
          : <LoginButton />
        }



      </section>
    </header>
  );
};

export default Header;
