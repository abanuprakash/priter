import NewStoryButton from "./newStoryButton";
import TopUsers from "./topUsers";

const RightBar = () => {
  const handleClose = () => {
    console.log("close")
  };

  return (
    <div className="p-4">
      <NewStoryButton handleClose={handleClose} />
      {/* <TopUsers /> */}
    </div>
  );
};

export default RightBar;
