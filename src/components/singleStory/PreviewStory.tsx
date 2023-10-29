import Sheet from "react-modal-sheet";
import { useState } from "react";
import { useAppStoryContext } from "@/providers/StoryContext";

const PreviewStory = () => {
    const [isOpen, setOpen] = useState(false);

    const { currentStory } = useAppStoryContext();

    const handleCloseModal = () => {
        setOpen(false);
    };

    function capitalizeWord([first, ...rest]: any, lc: any) {
        return first.toUpperCase() + (lc ? rest.join("").toLowerCase() : rest.join(""));
      }
      const capitalize = (str: string, lc: any, all: any) => {
        return all ? str.split(/(\s|-|')/)
          .map(s => capitalizeWord(s, lc))
          .join("")
          : capitalizeWord(str, lc);
      }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-green text-white w-10 h-10 rounded-full flex flex-col justify-center items-center"
                
            >
                <i
                    className={`icon-file-text feather text-2xl font-bold cursor-pointer `}
                    title="Read Full Story"
                ></i>
                {/* <span className="text-xs">Read</span> */}
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
                            <div className="w-full mb-4 lg:mb-0 lg:mr-4">
                                <h2 className="text-4xl font-bold mb-4 capitalize">
                                    {currentStory[0]?.title}
                                </h2>
                                <div className="bg-bodyBg p-2 ">
                                    {currentStory.map((story) => (
                                        <span
                                            key={story.id}
                                            className=""
                                            title={story.crtBy}
                                        >
                                            <span className="mb-2 ml-2">{story.paragraph}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>

                <Sheet.Backdrop />
            </Sheet>
        </>
    );
};

export default PreviewStory;
