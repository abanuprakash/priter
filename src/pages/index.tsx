import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  const getStories = async () => {
    const data = await axios.get("/api/story");
    console.log(data);
  }
  const getUsers = async () => {
    const data = await axios.get("/api/users");
    console.log(data);
  }
  const addStory = async () => {
    const data = await axios.post("/api/story/add");
    console.log(data);
  }
  
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
     <button onClick={getStories}>Get Stories</button>
     <button onClick={getUsers}>Get Users</button>
     <button onClick={addStory}>Add Story</button>
    </>
  );
}
