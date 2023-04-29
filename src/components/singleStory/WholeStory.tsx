import { Story } from "@/_types/story";
import { useAppStoryContext } from "@/providers/StoryContext";
import axios from "axios";

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
      <h1 className="text-5xl font-bold mb-6 capitalize">{currentStory[0]?.title}</h1>
      <main className="bg-lightBg p-4">
        {currentStory.map((story, index) => (
          <div key={story.id} className="flex flex-row items-center">
            <p className="mb-3">{story.paragraph}</p>

            <i
              className={`icon-edit feather text-sm pl-3 cursor-pointer `}
              onClick={() => handleStoryFetch(story, index)}
            ></i>
          </div>
        ))}
      </main>
    </article>
  );
};

export default WholeStory;
