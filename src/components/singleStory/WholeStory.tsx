import { Story } from "@/_types/story";
import { useAppStoryContext } from "@/providers/StoryContext";
import axios from "axios";
import PreviewStory from "./PreviewStory";
import AddStory from "./AddStory";

const WholeStory = () => {
  const {
    currentStory,
    setRightStories,
    setLeftSideStories,
    setCurrentStoriesAsArray,
  } = useAppStoryContext();

  const handleStoryFetch = async (story: Story, index: number) => {
    const filteredStory = currentStory.slice(0, ++index);
    await fetchAndSetRightSideStories(story.id);
    if (story.parentId === 0) {
      setLeftSideStories([]);
    } else {
      await fetchAndSetLeftSideStories(story.parentId);
    }

    setCurrentStoriesAsArray(filteredStory);
  };

  const fetchAndSetRightSideStories = async (id: number) => {
    await axios
      .get(`https://priter.vercel.app/api/story/child?id=${id}`)
      .then((response) => setRightStories(response.data));
  };

  const fetchAndSetLeftSideStories = async (id: number) => {
    await axios
      .get(`https://priter.vercel.app/api/story/child?id=${id}`)
      .then((response) => setLeftSideStories(response.data));
  };

  return (
    <article className="p-4">
      <div className="flex flex-row items-center  mb-6 justify-between">
        <h1 className="text-2xl lg:text-5xl font-bold capitalize">{currentStory[0]?.title}</h1>
        <PreviewStory />

        {(currentStory[0]?.id === 2 && currentStory.length <= 24) && <AddStory />}
      </div>

      <main className="bg-lightBg p-4">
        {currentStory.map((story, index) => (
          <div key={story.id} className={`flex flex-row items-center ${currentStory[0]?.id !== 2 ? 'last:text-[#ffa500]' : ''} `} title={story.crtBy}>
            <p className="mb-3">{story.paragraph}</p>

            {currentStory[0]?.id !== 2 && <i
              className={`icon-edit feather text-sm pl-3 cursor-pointer `}
              onClick={() => handleStoryFetch(story, index)}
            ></i>
            }
          </div>
        ))}
      </main>
    </article>
  );
};

export default WholeStory;
