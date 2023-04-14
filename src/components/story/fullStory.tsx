import ChildStoryTile from "./childStoryTile";
import ViewStory from "./viewStory";

const FullStory = () => {
  return (
    <article className="lg:h-[calc(100vh_-_6rem)] mt-4 mb-16 rounded-md p-6 bg-white shadow-sm space-y-3 lg:overflow-auto lg:scrollbar-hide">
      <ViewStory />
    </article>
  );
};

export default FullStory;
