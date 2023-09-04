import Image from "next/image";
import Link from "next/link";
import { Story } from "@/_types/story";
import { useAppStoryContext } from "@/providers/StoryContext";
import moment from "moment";
import axios from "axios";
import UserAvatar from "./userAvatar";

interface IStory {
  childStories: Story[];
  isLeftStories: boolean;
}

const ChildBlocks = ({ childStories, isLeftStories }: IStory) => {
  const {
    setCurrentStories,
    setLeftSideStories,
    setRightStories,
    setShowRightSideBar,
    setShowLeftSideBar,
  } = useAppStoryContext();

  const handleRightNewStory = async (newStory: Story) => {
    setCurrentStories(newStory, false);
    fetchAndSetRightSideStories(newStory.id);
    setLeftSideStories(childStories);
    setShowRightSideBar(false);
  };

  const handleLeftChangeStory = (newStory: Story) => {
    setCurrentStories(newStory, true);
    fetchAndSetRightSideStories(newStory.id);
    setShowLeftSideBar(false);
  };

  const fetchAndSetRightSideStories = (id: number) => {
    let childParagraphs: Story[] = [];
    axios
      .get(`https://priter.vercel.app/api/story/child?id=${id}`)
      // .get(`http://localhost:3000/api/story/child?id=${id}`)
      .then((response) => {
        childParagraphs = response.data.map((child: { crtAt: string | number | Date; _count: { childParagraphs: number; }; }) => {
          const oneDay = 60 * 60 * 24 * 1000;
          const currentTime = Date.now();
          const dataTime = +new Date(child.crtAt);
          if (child._count.childParagraphs > 0) {
            return child;
          } else {
            if ((currentTime - dataTime) < oneDay) {
              return child;
            }
          }
        })      
      }).finally(() => { setRightStories(childParagraphs.filter(story => story !== undefined))});
  };

  return (
    <section className="grid grid-cols gap-2 items-center p-3">
      {childStories.map((story) => (
        <div
          key={story?.id}
          className={`line-clamp-2 border border-lightBg shadow-sm p-2 cursor-pointer group rounded-md mb-3 ${isLeftStories ? "bg-[#ffa50030] text-white" : "bg-lightBg"
            } relative`}
        >
          <p
            className={`line-clamp-3 h-full  text-sm ${isLeftStories ? " text-black" : "text-black"
              }`}
          >
            {story?.paragraph}
          </p>
          <section className="flex flex-row items-center mt-4 justify-between">
            <div className="flex flex-row items-center">
              <UserAvatar userImage={story?.userImage} />
              <div className="text-subBlack text-xs pl-3">
                <Link href={"#"} className="text-blue cursor-pointer">
                  <span className="capitalize -ml-[3px]"> {story?.crtBy}</span>
                </Link>
              </div>
            </div>
            <div
              className="text-subBlack text-xs"
              title={moment.utc(story?.crtAt).format("MMMM Do YYYY, h:mm:ss a")}
            >
              {moment.utc(story?.crtAt).local().startOf("seconds").fromNow()}
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
