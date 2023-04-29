import { ReactNode } from "react";
import Image from "next/image";
import RightArrow from "./../../../public/assets/images/double-right.png";
import { useAppStoryContext } from "@/providers/StoryContext";

interface IBar {
  children: ReactNode;
}

const MobileBar = ({ children }: IBar) => {
  const { showRightSidebar, setShowRightSideBar } = useAppStoryContext();

  return (
    <div className="flex z-30">
      <input
        type="checkbox"
        id="drawer-toggle"
        className="relative sr-only peer hidden"
        readOnly
        checked={showRightSidebar}
      />
      <label
        htmlFor="drawer-toggle"
        className={`absolute top-1/2 right-0 peer-checked:right-64  flex-row-reverse flex items-center z-30 cursor-pointer`}
        onClick={() => setShowRightSideBar(!showRightSidebar)}
      >
        <div className="bg-white w-4 h-4 shadow-sm transition-none "></div>
        <Image
          src={RightArrow}
          alt="right arrow"
          width={25}
          height={25}
          className={`rounded-full w-8 h-8 p-1.5 -ml-2 bg-white shadow-md transition-all duration-500 ${
            showRightSidebar ? `rotate-0` : `rotate-180`
          }`}
        />
      </label>
      <div
        className={`fixed top-0 right-0 translate-x-full z-20 w-64 h-full transition-all duration-500 transform  bg-white shadow-lg peer-checked:translate-x-0`}
      >
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default MobileBar;
