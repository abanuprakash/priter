import { Story } from "@/_types/story";
import FullStoryDetails from "@/components/singleStory/FullStoryDetails";
import { useAppStoryContext } from "@/providers/StoryContext";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect, useRef } from "react";

interface IProps {
  story: Story;
}

const StoryDetailsPage = ({ story }: IProps) => {
  const { setInitialCurrentStory, setCurrentStoriesAsArray, setRightStories, setLeftSideStories } = useAppStoryContext();
  const restrict = useRef(false);

  useEffect(() => {
    if (!restrict.current) {
      handleStories();
      restrict.current = true;
    }
  }, [story]);

  const getChildStories = async (stories: Story[]) => {
    const childParagraphs: Story[] = [];
    await stories.forEach(child => {
      axios
        .get(`https://priter.vercel.app/api/story/child?id=${child.id}`)
        // .get(`http://localhost:3000/api/story/child?id=${child.id}`)
        .then(async (response) => {
          const oneDay = 60 * 60 * 24 * 1000;
          const currentTime = Date.now();
          const dataTime = +new Date(child.crtAt);
          if (response?.data?.length > 0) {
            childParagraphs.push(child)
          } else {
            if ((currentTime - dataTime) < oneDay) {
              childParagraphs.push(child)
            }
          }
        }).finally(() => {
          setRightStories(childParagraphs.filter(story => story !== undefined));
          setLeftSideStories([]);
        });
    })
  }

  const handleStories = async () => {
    const newStory: Story[] = [];

    if (story.id === 2) {
      newStory.push(story);
      await story.childParagraphs.forEach(story => newStory.push(story));
      setCurrentStoriesAsArray(newStory);
    } else {
      await setInitialCurrentStory(story);
      await getChildStories(story.childParagraphs);
    }
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
  // const response = await axios.get(`http://localhost:3000/api/story/${id}`);
  const response = await axios.get(`https://priter.vercel.app/api/story/${id}`);

  return {
    props: {
      story: response.data,
    },
  };
};
