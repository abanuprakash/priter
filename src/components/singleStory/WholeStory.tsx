import { useAppStoryContext } from "@/providers/StoryContext";

const WholeStory = () => {
  const { currentStory } = useAppStoryContext();

  return (
    <article className="p-4">
      <h1 className="text-5xl font-bold mb-6">This is an Sample Story</h1>
      <main className="bg-lightBg p-4">
        {currentStory.map((story) => (
          <p className="mb-3" key={story.id}>
            {story.paragraph}
          </p>
        ))}
      </main>
    </article>
  );
};

export default WholeStory;
