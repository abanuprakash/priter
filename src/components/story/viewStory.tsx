import Image from "next/image";
import Link from "next/link";
import Avatar from "../../../public/assets/images/avatar.avif";
import ChildStoryList from "./childStoryList";
import ChildStoryTile from "./childStoryTile";

const ViewStory = () => {
  return (
    <main className="">
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
          <p className="text-sm text-subBlack pb-1">
            Using modifiers for this sort of thing can reduce the amount of
            conditional logic in your templates, letting you use the same set of
            classes regardless of what state an input is in and letting the
            browser apply the right styles for you.
          </p>

          <section className="border-t pt-3 mt-3 border-lightGrey">
            <ChildStoryList />
            <ChildStoryList />
          </section>
        </section>
      </section>
    </main>
  );
};

export default ViewStory;
