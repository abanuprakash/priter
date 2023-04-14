import Image from "next/image";
import Link from "next/link";
import Avatar from "../../../public/assets/images/avatar.avif";
import { Story } from "@/_types/story";
import { useAppStoryContext } from "@/providers/StoryContext";
import moment from "moment";
import axios from "axios";

interface IStory {
  childStories: Story[];
  isLeftStories: boolean;
}

const ChildBlocks = ({ childStories, isLeftStories }: IStory) => {
  const { setCurrentStories, setLeftSideStories, setRightStories } =
    useAppStoryContext();

  const handleRightNewStory = async (newStory: Story) => {
    setCurrentStories(newStory);
    setLeftSideStories(childStories);
    fetchAndSetRightSideStories(newStory.id);
  };

  const handleLeftChangeStory = (newStory: Story) => {
    setCurrentStories(newStory);
    fetchAndSetRightSideStories(newStory.id);
  };

  const fetchAndSetRightSideStories = (id: number) => {
    axios
      .get(`http://localhost:3000/api/story/child?id=${id}`)
      .then((response) => setRightStories(response.data));
  };

  return (
    <section className="grid grid-cols gap-2 items-center p-3">
      {childStories.map((story) => (
        <div
          key={story.id}
          className="line-clamp-2 border border-lightBg shadow-sm p-2 cursor-pointer group rounded-md mb-3 bg-lightBg relative"
        >
          <p className="line-clamp-3 h-full text-black text-sm">
            {story.paragraph}
          </p>
          <section className="flex flex-row items-center mt-4 justify-between">
            <div className="flex flex-row items-center">
              <Image
                src={Avatar}
                alt="avatar"
                className="inline-block h-4 w-4 rounded-full ring-2 ring-green justify-end cursor-pointer"
              />
              <div className="text-subBlack text-xs pl-3">
                <Link href={"#"} className="text-blue cursor-pointer">
                  <span className="capitalize -ml-[3px]"> {story.crtBy}</span>
                </Link>
              </div>
            </div>
            <div
              className="text-subBlack text-xs"
              title={moment.utc(story.crtAt).format("MMMM Do YYYY, h:mm:ss a")}
            >
              {moment.utc(story.crtAt).local().startOf("seconds").fromNow()}
            </div>
          </section>

          <div
            className="opacity-0 group-hover:opacity-100 bg-green duration-300 absolute inset-0 z-10 flex flex-col justify-center items-center text-xl text-white font-semibold"
            onClick={
              isLeftStories
                ? () => handleLeftChangeStory(story)
                : () => handleRightNewStory(story)
            }
          >
            <i className="feather icon-plus mr-3 text-lg font-semibold cursor-pointer"></i>
            <span>Add to Story</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ChildBlocks;
