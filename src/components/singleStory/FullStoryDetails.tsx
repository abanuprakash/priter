import { useEffect, useState } from "react";
import ChildBlocks from "./ChildBlocks";
import WholeStory from "./WholeStory";
import { useAppStoryContext } from "@/providers/StoryContext";
import { Story } from "@/_types/story";
import MobileBar from "../sideBars/MobileBar";
import { GlobalConstants } from "@/_const/globalConstants";
import { useMediaQuery } from "react-responsive";
import AddStory from "./AddStory";
import MobileLeftBar from "../sideBars/MobileLeftBar";

const FullStoryDetails = () => {
  const { currentStory, leftSideList, rightSideList } = useAppStoryContext();
  const [leftStoriesList, setLeftStoriesList] = useState<Story[]>([]);
  const [isClient, setIsClient] = useState(false);
  const isTabletOrMobile = useMediaQuery(GlobalConstants.tabletAndMobileQuery);

  useEffect(() => {
    const filteredStories = [...leftSideList].filter(
      (leftStory) =>
        !currentStory.some((currStory) => currStory.id === leftStory.id)
    );

    setLeftStoriesList(filteredStories);
  }, [currentStory, leftSideList]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, [isTabletOrMobile]);

  return (
    <main className="grid grid-cols-12 gap-3 px-3 lg:px-0 min-h-screen h-screen overflow-hidden container mx-auto">
      {currentStory[0]?.id !== 2 &&
        <>
          {isClient && isTabletOrMobile ? (
            <MobileLeftBar>
              <ChildBlocks childStories={leftStoriesList} isLeftStories={true} />
            </MobileLeftBar>
          ) : (
            <div className="col-span-2 bg-white rounded-md">
              <h2 className="p-2 pb-0 text-xl font-semibold">Other Stories</h2>
              <ChildBlocks childStories={leftStoriesList} isLeftStories={true} />
            </div>
          )}
        </>
      }
      <div className="col-span-12 lg:col-span-8 min-h-[calc(100vh-90px)] h-[calc(100vh-90px)] bg-white">
        <WholeStory />
      </div>
      {currentStory[0]?.id !== 2 &&
        <>
          {
            isClient && isTabletOrMobile ? (
              <MobileBar>
                <div className="flex flex-row items-center justify-between p-2">
                  <h2 className="p-2 pb-0 text-xl font-semibold">Follow Ups</h2>
                  {(currentStory?.[0]?.id !== 3 && rightSideList.length < 3) && <AddStory />}
                  {(currentStory?.[0]?.id === 3) && <AddStory />}
                </div>
                <ChildBlocks childStories={rightSideList} isLeftStories={false} />
              </MobileBar>
            ) : (
              <div className="col-span-2 bg-white relative">
                <div className="flex flex-row items-center justify-between p-2 rounded-md">
                  <h2 className="p-2 pb-0 text-xl font-semibold">Follow Ups</h2>
                  {(currentStory?.[0]?.id !== 3 && rightSideList.length < 3) && <AddStory />}
                  {(currentStory?.[0]?.id === 3) && <AddStory />}
                </div>
                <ChildBlocks childStories={rightSideList} isLeftStories={false} />
              </div>
            )
          }
        </>
      }
    </main >
  );
};

export default FullStoryDetails;
