import Image from "next/image";
import Link from "next/link";
import Avatar from "../../../public/assets/images/avatar.avif";

const StoryInfo = () => {
  return (
    <>
      <section className="flex flex-row items-center pl-3 mb-1 justify-between">
        <div className="flex flex-row items-center mb-2">
          <Image
            src={Avatar}
            alt="avatar"
            className="inline-block h-4 w-4 rounded-full ring-2 ring-green justify-end cursor-pointer"
          />
          <div className="text-subBlack text-xs pl-3">
            <Link href={"#"} className="text-blue cursor-pointer">
              Vimalan K
            </Link>
          </div>
        </div>
        <div className="text-subBlack text-xs">12hr ago</div>
      </section>
      <section className="flex flex-row items-start">
        <div className="w-10 flex flex-col justify-center items-center mr-1 pt-1">
          <i className="feather icon-arrow-up mr-3 text-lg font-semibold pl-3 text-lightBlack hover:text-green cursor-pointer"></i>
          <span className="my-1">56</span>
          <i className="feather icon-arrow-down mr-3 text-lg font-semibold pl-3 text-lightBlack hover:text-red cursor-pointer"></i>
        </div>
        <p className="text-sm text-subBlack pb-1">
          Using modifiers for this sort of thing can reduce the amount of
          conditional logic in your templates, letting you use the same set of
          classes regardless of what state an input is in and letting the
          browser apply the right styles for you.
        </p>
      </section>
    </>
  );
};

export default StoryInfo;
