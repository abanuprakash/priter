import { Story } from "@/_types/story";
import FullStoryDetails from "@/components/singleStory/FullStoryDetails";
import { useAppStoryContext } from "@/providers/StoryContext";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

interface IProps {
  story: Story;
}

const StoryDetailsPage = ({ story }: IProps) => {
  const { setInitialCurrentStory, setRightStories } = useAppStoryContext();

  useEffect(() => {
    handleStories();
  }, [story]);

  const handleStories = async () => {
    await setInitialCurrentStory(story);
    setRightStories(story.childParagraphs);
  };

  return (
    <div className="mt-20 max-w-7xl mx-auto ">
      <FullStoryDetails />
    </div>
  );
};

export default StoryDetailsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;
  const response = await axios.get(`http://localhost:3000/api/story/${id}`);

  return {
    props: {
      story: response.data,
    },
  };
};
