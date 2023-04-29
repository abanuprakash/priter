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
  const { setStories } = useAppStoryContext();

  useEffect(() => {
    setStories(stories);
  }, [stories]);

  return (
    <>
      <Body />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get("https://priter.vercel.app/api/story");

  return {
    props: {
      stories: JSON.parse(JSON.stringify(res.data)),
    },
  };
};
