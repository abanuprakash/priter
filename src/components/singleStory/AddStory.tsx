import Sheet from "react-modal-sheet";
import { useState } from "react";
import { useAppStoryContext } from "@/providers/StoryContext";
import axios from "axios";

const AddStory = () => {
  const [isOpen, setOpen] = useState(false);
  const [newStory, setNewStory] = useState("");

  const {
    currentStory,
    setCurrentStories,
    setLeftSideStories,
    setRightStories,
    setShowRightSideBar: setShowSideBar,
  } = useAppStoryContext();

  const handleNewStory = (event: any) => {
    setNewStory(() => event.target.value);
  };

  const fetchAndSetLeftSideStories = (id: number) => {
    axios
      .get(`http://localhost:3000/api/story/child?id=${id}`)
      .then(async (response) => {
        await setLeftSideStories(response.data);
      });
  };

  const addNewStory = async () => {
    const lastChild = currentStory.at(-1);

    const newParagraph = {
      paragraph: newStory,
      crtBy: "admin",
      updBy: "admin",
      parentId: lastChild?.id ?? 1,
      userId: 1,
    };

    await axios
      .post(`http://localhost:3000/api/story/add`, newParagraph)
      .then(async (response) => {
        await fetchAndSetLeftSideStories(response.data.parentId);
        setRightStories([]);
        setCurrentStories(response.data, false);
        setOpen(false);
        setNewStory("");
        setShowSideBar(false);
      });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green text-white w-10 h-10 rounded-full "
      >
        <i
          className={`icon-plus feather text-2xl font-bold cursor-pointer `}
        ></i>
      </button>

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="flex flex-col lg:flex-row items-start p-8">
              <div className="w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-4">
                <h2 className="text-2xl font-medium mb-4 underline">
                  Story Till Now
                </h2>
                <div className="bg-bodyBg p-2 ">
                  {currentStory.map((story, index) => (
                    <div
                      key={story.id}
                      className="flex flex-row items-center last:text-red"
                    >
                      <p className="mb-3">{story.paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col">
                <h2 className="text-2xl font-medium mb-4 underline">
                  Add New Story
                </h2>
                <textarea
                  rows={5}
                  className="border border-green rounded-md mb-4"
                  value={newStory}
                  onChange={handleNewStory}
                ></textarea>
                <button
                  className="bg-green p-2 text-center text-white rounded-md cursor-pointer"
                  onClick={addNewStory}
                >
                  Add New Child Story
                </button>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};

export default AddStory;
