const NewStoryButton = () => {
  return (
    <button className="flex flex-row items-center justify-center text-sm p-2 rounded-sm bg-midGreen text-white w-full">
      <i className="feather icon-plus text-base mr-1"></i>
      <span>Start a New Story</span>
    </button>
  );
};

export default NewStoryButton;
