import { useAppStoryContext } from "@/providers/StoryContext";
import StoryTile from "./storyTile";

const FeedsList = () => {
  const { storiesList } = useAppStoryContext();

  return (
    <main className="lg:h-[calc(100vh_-_6rem)] mt-4 mb-16 lg:overflow-auto lg:scrollbar-hide">
      <h3 className="w-full sticky top-0 bg-white p-2 mb-3 hidden">
        Top Stories
      </h3>
      {storiesList.map((story) => (
        <div key={story.id}>
          <StoryTile story={story} />
        </div>
      ))}
    </main>
  );
};

export default FeedsList;
