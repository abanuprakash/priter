import { Inter } from "next/font/google";
import axios from "axios";
import Header from "@/components/header";
import Body from "@/components/body";
import { GetServerSideProps } from "next";
import { useAppStoryContext } from "@/providers/StoryContext";
import { useEffect } from "react";
import { Story } from "@/_types/story";

const inter = Inter({ subsets: ["latin"] });

interface IProps {
  stories: Story[];
}

export default function Home({ stories }: IProps) {
  const getStories = async () => {
    const data = await axios.get("/api/story");
    console.log(data);
  };
  const getUsers = async () => {
    const data = await axios.get("/api/users");
    console.log(data);
  };
  const addStory = async () => {
    const data = await axios.post("/api/story/add");
    console.log(data);
  };

  const { setStories } = useAppStoryContext();

  useEffect(() => {
    setStories(stories);
  }, [stories]);

  return (
    <>
      <button onClick={getStories}>Get Stories</button>
      <Body />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {/* <button onClick={getStories}>Get Stories</button>
      <button onClick={getUsers}>Get Users</button>
      <button onClick={addStory}>Add Story</button> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get("http://localhost:3000/api/story");
  
  return {
    props: {
      stories: JSON.parse(JSON.stringify(res.data)),
    },
  };
};
