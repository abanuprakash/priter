import Image from "next/image";
import Link from "next/link";
import Avatar from "../../../public/assets/images/avatar.avif";

const StoryTile = () => {
  return (
    <main className="rounded-md p-6 bg-white shadow-sm space-y-3 mb-4">
      <section className="flex flex-row items-start">
        <section className="w-22 flex flex-col justify-center items-center mr-4 pt-1">
          <i className="feather icon-arrow-up mr-3 text-lg font-semibold pl-3 text-lightBlack hover:text-green cursor-pointer"></i>
          <span className="my-1">56</span>
          <i className="feather icon-arrow-down mr-3 text-lg font-semibold pl-3 text-lightBlack hover:text-red cursor-pointer"></i>
        </section>
        <section>
          <h2 className="text-black text-xl font-bold mb-2 cursor-pointer">
            The New Way of Story Telling
          </h2>
          <p className="text-sm text-subBlack pb-1 line-clamp-3 lg:line-clamp-5">
            Using modifiers for this sort of thing can reduce the amount of
            conditional logic in your templates, letting you use the same set of
            classes regardless of what state an input is in and letting the
            browser apply the right styles for you.
          </p>

          <div className="border-t pt-3 mt-3 border-lightGrey flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <Image
                src={Avatar}
                alt="avatar"
                className="inline-block h-4 w-4 rounded-full ring-2 ring-green justify-end cursor-pointer"
              />
              <div className="text-subBlack text-xs flex flex-col lg:flex-row justify-start items-start lg:items-center">
                <div>
                  <span className="ml-2 mr-1">Posted by</span>
                  <Link href={"#"} className="text-blue cursor-pointer">
                    Vimalan K
                  </Link>
                </div>

                <div className="lg:border-l pl-2 lg:ml-2 border-lightGrey">
                  12hr ago
                </div>
              </div>
            </div>

            <div className="text-subBlack flex flex-row items-end text-sm cursor-pointer hover:text-blue    ">
              <i className="feather icon-message-square text-base mr-1"></i>
              <span>10+</span>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default StoryTile;
