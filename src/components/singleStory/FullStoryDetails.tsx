import { createContext, useContext, useEffect, useState } from "react";
import ChildBlocks from "./ChildBlocks";
import WholeStory from "./WholeStory";
import { useAppStoryContext } from "@/providers/StoryContext";
import { Story } from "@/_types/story";

const FullStoryDetails = () => {
  const { currentStory, leftSideList, rightSideList } =
    useAppStoryContext();
  const [leftStoriesList, setLeftStoriesList] = useState<Story[]>([]);

  console.log(currentStory, "current")

  useEffect(() => {
    const filteredStories = [...leftSideList].filter(
      (leftStory) =>
        !currentStory.some((currStory) => currStory.id === leftStory.id)
    );

    console.log(filteredStories, "filter");
    setLeftStoriesList(filteredStories);
  }, [currentStory]);

  return (
    <main className="grid grid-cols-12 gap-3 lg:h-screen lg:overflow-hidden container mx-auto">
      <div className="col-span-2 bg-white">
        <h2 className="p-2 pb-0 text-xl font-semibold">Other Stories</h2>
        <ChildBlocks childStories={leftStoriesList} isLeftStories={true} />
      </div>
      <div className="col-span-8 bg-white">
        <WholeStory />
      </div>
      <div className="col-span-2 bg-white">
        <h2 className="p-2 pb-0 text-xl font-semibold">Follow Ups</h2>
        <ChildBlocks childStories={rightSideList} isLeftStories={false} />
      </div>
    </main>
  );
};

export default FullStoryDetails;
