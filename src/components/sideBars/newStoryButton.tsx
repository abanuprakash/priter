import { Story } from "@/_types/story";
import { useAppStoryContext } from "@/providers/StoryContext";
import axios from "axios";
import { useState } from "react";
import Sheet from "react-modal-sheet";

interface IProps {
  isDefaultOpen?: boolean;
  handleClose: () => void;
}

const NewStoryButton = ({ isDefaultOpen, handleClose }: IProps) => {
  const [isOpen, setOpen] = useState(isDefaultOpen ? isDefaultOpen : false);
  const [newStory, setNewStory] = useState("");
  const [title, setTitle] = useState("");
  const { setStories } = useAppStoryContext();

  const handleCloseModal = () => {
    setOpen(false);
    setNewStory('');
    setTitle('');
    handleClose();
    
  };

  const addNewStory = async () => {
    const newParagraph = {
      paragraph: newStory,
      title: title,
      parentId: 0,
    };

    await axios
      .post(`https://priter.vercel.app/api/story/add`, newParagraph)
      .then(async (response) => {
        const stories = await axios.get<Story[]>(
          "https://priter.vercel.app/api/story"
        );

        setStories(stories.data);
        handleCloseModal();
      });
  };

  return (
    <>
      <button
        className="lg:flex flex-row hidden items-center justify-center text-sm p-2 rounded-sm bg-midGreen text-white w-full"
        onClick={() => setOpen(true)}
      >
        <i className="feather icon-plus text-base mr-1"></i>
        <span>Start a New Story</span>
      </button>

      <Sheet isOpen={isOpen} onClose={handleCloseModal}>
        <Sheet.Container>
          <Sheet.Header>
            <div className="flex flex-row items-center justify-between p-3">
              <h2 className="text-2xl font-medium mb-4 underline">
                Add New Story
              </h2>
              <i
                className={`feather icon-x-circle mr-3 text-2xl pl-3 cursor-pointer`}
                onClick={handleCloseModal}
              ></i>
            </div>
          </Sheet.Header>
          <Sheet.Content>
            <div className="flex flex-col lg:flex-row items-start w-full p-8">
              <div className="w-full lg:w-1/2 flex flex-col">
                <div className=" mb-4">
                  <div>Title</div>
                  <input
                    type="text"
                    className="border border-green rounded-md h-10 px-3 w-full"
                    onChange={(event) => setTitle(() => event.target.value)}
                  />
                </div>

                <div className=" mb-4 w-full">
                  <div>Story</div>
                  <textarea
                    rows={5}
                    className="border border-green rounded-md mb-4 p-3 w-full"
                    value={newStory}
                    onChange={(event) => setNewStory(() => event.target.value)}
                  ></textarea>
                </div>
                <button
                  className="bg-green p-2 text-center text-white rounded-md cursor-pointer"
                  onClick={addNewStory}
                >
                  Add New Story
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

export default NewStoryButton;
