import { Story } from "@/_types/story";
import { ReactNode, createContext, useContext, useState } from "react";

interface initialState {
  storiesList: Story[];
  leftSideList: Story[];
  rightSideList: Story[];
  currentStory: Story[];
  showRightSidebar: boolean;
  showLeftSidebar: boolean;
  setStories: (story: Story[]) => void;
  setLeftSideStories: (story: Story[]) => void;
  setRightStories: (story: Story[]) => void;
  setCurrentStories: (story: Story, isFilterStory: boolean) => void;
  setCurrentStoriesAsArray: (story: Story[]) => void;
  setInitialCurrentStory: (story: Story) => void;
  setShowRightSideBar: (isOpen: boolean) => void;
  setShowLeftSideBar: (isOpen: boolean) => void;
}

const initialValue: initialState = {
  storiesList: [{} as Story],
  leftSideList: [{} as Story],
  rightSideList: [{} as Story],
  currentStory: [{} as Story],
  showRightSidebar: false,
  showLeftSidebar: false,
  setStories: (): void => undefined,
  setLeftSideStories: (): void => undefined,
  setRightStories: (): void => undefined,
  setCurrentStories: (): void => undefined,
  setCurrentStoriesAsArray: (): void => undefined,
  setInitialCurrentStory: (): void => undefined,
  setShowRightSideBar: (): void => undefined,
  setShowLeftSideBar: (): void => undefined,
};

type Props = {
  children: ReactNode;
};

export const StoryContext = createContext(initialValue);

export const StoryProvider = ({ children }: Props) => {
  const [storiesList, setStoriesList] = useState<Story[]>([]);
  const [leftSideList, setLeftSideList] = useState<Story[]>([]);
  const [rightSideList, setRightSideList] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story[]>([]);
  const [showRightSidebar, setShowRightSideBar] = useState(false);
  const [showLeftSidebar, setShowLeftSideBar] = useState(false);

  const setStories = (story: Story[]) => {
    setStoriesList(story);
  };

  const setLeftSideStories = (story: Story[]) => {
    setLeftSideList(() => story);
  };

  const setRightStories = (newStories: Story[]) => {
    setRightSideList(() => newStories);
  };

  const setInitialCurrentStory = (newStories: Story) => {
    setCurrentStory(() => [newStories]);
  };

  const setCurrentStoriesAsArray = (stories: Story[]) => {
    setCurrentStory(stories);
  };

  const setCurrentStories = (newStory: Story, isFilterStory: boolean) => {
    if (currentStory.some((currStory) => currStory.id === newStory.id)) {
      return false;
    }

    let removeFromCurrentStory = [...currentStory];

    if (isFilterStory) {
      removeFromCurrentStory = removeFromCurrentStory.filter(
        (currStory) =>
          !leftSideList.some((leftStory) => leftStory.id === currStory.id)
      );
    }

    setCurrentStory(() => [...removeFromCurrentStory, newStory]);
  };

  const value = {
    storiesList,
    leftSideList,
    rightSideList,
    currentStory,
    showRightSidebar,
    showLeftSidebar,
    setLeftSideStories,
    setRightStories,
    setStories,
    setCurrentStories,
    setCurrentStoriesAsArray,
    setInitialCurrentStory,
    setShowRightSideBar,
    setShowLeftSideBar,
  };
  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
};

export const useAppStoryContext = () => useContext(StoryContext);
