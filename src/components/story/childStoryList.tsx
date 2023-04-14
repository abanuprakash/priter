import ChildStoryTile from "./childStoryTile";

const ChildStoryList = () => {
  return (
    <main className="rounded-md p-3 bg-lightBg shadow-sm mb-4">
      <ChildStoryTile />
      <div className="ml-6">
        <ChildStoryTile />
      </div>
    </main>
  );
};

export default ChildStoryList;
