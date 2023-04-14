import { Story } from "@/_types/story";
import { ReactNode, createContext, useContext, useState } from "react";

interface initialState {
  storiesList: Story[];
  leftSideList: Story[];
  rightSideList: Story[];
  currentStory: Story[];
  setStories: (story: Story[]) => void;
  setLeftSideStories: (story: Story[]) => void;
  setRightStories: (story: Story[]) => void;
  setCurrentStories: (story: Story) => void;
}

const initialValue: initialState = {
  storiesList: [{} as Story],
  leftSideList: [{} as Story],
  rightSideList: [{} as Story],
  currentStory: [{} as Story],
  setStories: (): void => undefined,
  setLeftSideStories: (): void => undefined,
  setRightStories: (): void => undefined,
  setCurrentStories: (): void => undefined,
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

  const setStories = (story: Story[]) => {
    setStoriesList(story);
  };

  const setLeftSideStories = (story: Story[]) => {
    setLeftSideList(story);
  };

  const setRightStories = (newStories: Story[]) => {
    setRightSideList(newStories);
  };

  const setCurrentStories = (newStory: Story) => {
    if (currentStory.some((currStory) => currStory.id === newStory.id)) {
      return false;
    }

    const removeFromCurrentStory = [...currentStory].filter(
      (currStory) =>
        !leftSideList.some((leftStory) => leftStory.id === currStory.id)
    );

    setCurrentStory(() => [...removeFromCurrentStory, newStory]);
  };

  const value = {
    storiesList,
    leftSideList,
    rightSideList,
    currentStory,
    setLeftSideStories,
    setRightStories,
    setStories,
    setCurrentStories,
  };
  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
};

export const useAppStoryContext = () => useContext(StoryContext);
