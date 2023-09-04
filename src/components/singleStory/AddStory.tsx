import Sheet from "react-modal-sheet";
import { useState } from "react";
import { useAppStoryContext } from "@/providers/StoryContext";
import axios from "axios";
import { Story } from "@/_types/story";

const AddStory = () => {
  const [isOpen, setOpen] = useState(false);
  const [newStory, setNewStory] = useState("");
  const [error, setError] = useState("");

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

  const handleCloseModal = () => {
    setOpen(false);
    setNewStory("");
    setShowSideBar(false);
  };

  const fetchAndSetLeftSideStories = (id: number) => {
    let childParagraphs: Story[] = [];
    axios
      .get(`https://priter.vercel.app/api/story/child?id=${id}`)
      // .get(`http://localhost:3000/api/story/child?id=${id}`)
      .then((response) => {
        childParagraphs = response.data.map((child: { crtAt: string | number | Date; _count: { childParagraphs: number; }; }) => {
          const oneDay = 60 * 60 * 24 * 1000;
          const currentTime = Date.now();
          const dataTime = +new Date(child.crtAt);
          if (child._count.childParagraphs > 0) {
            return child;
          } else {
            if ((currentTime - dataTime) < oneDay) {
              return child;
            }
          }
        })      
      }).finally(async () =>  await setLeftSideStories(childParagraphs.filter(story => story !== undefined)));
  };

  const addNewStory = async () => {
    const lastChild = currentStory.at(-1);

    const isFirstCase = currentStory[0]?.id === 2 ? true : false;
    const newParagraph = {
      paragraph: newStory,
      parentId: isFirstCase ? 2 : lastChild?.id ?? 1,
      story_paragraphId: isFirstCase ? 2 : lastChild?.id ?? 1,
      lastAuthor: lastChild?.crtBy,
    };

    await axios
      .post(`https://priter.vercel.app/api/story/add`, newParagraph)
      // .post(`http://localhost:3000/api/story/add`, newParagraph)
      .then(async (response) => {
        await fetchAndSetLeftSideStories(response.data.parentId);
        setRightStories([]);
        setCurrentStories(response.data, false);
        handleCloseModal();
      }).catch(error => {
        setError(error?.response?.data?.message)
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
          <Sheet.Header>
            <div className="flex flex-row items-center justify-between p-3">
              <h2 className="text-2xl font-medium mb-4 underline">
                {/* Add New Story */}
              </h2>
              <i
                className={`feather icon-x-circle mr-3 text-2xl pl-3 cursor-pointer `}
                onClick={handleCloseModal}
              ></i>
            </div>
          </Sheet.Header>
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
                  className="border border-green rounded-md mb-4 p-3"
                  value={newStory}
                  onChange={handleNewStory}
                ></textarea>
                {error &&
                <div className="text-red">{error}</div>
                }
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
