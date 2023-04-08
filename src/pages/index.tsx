import { Inter } from "next/font/google";
import axios from "axios";
import Header from "@/components/header";
import Body from "@/components/body";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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

  return (
    <>
      <Body />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={getStories}>Get Stories</button>
      <button onClick={getUsers}>Get Users</button>
      <button onClick={addStory}>Add Story</button>
    </>
  );
}
