const StoryBottom = () => {
  return (
    <div className="border-t pt-3 mt-3 border-lightGrey flex flex-row items-center justify-between ml-11 mb-8">
      <div className="flex flex-row items-center cursor-pointer">
        <span className="text-subBlack text-sm mr-3">Reply</span>
        <span className="text-subBlack text-sm mr-3">Share</span>
        <span className="text-subBlack text-sm">Report</span>
      </div>
      <div className="text-subBlack flex flex-row items-end text-sm cursor-pointer hover:text-blue">
        <i className="feather icon-message-square text-base mr-1"></i>
        <span>10+</span>
      </div>
    </div>
  );
};

export default StoryBottom;
