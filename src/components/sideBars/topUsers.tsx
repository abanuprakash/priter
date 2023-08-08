import UserAvatar from "../singleStory/userAvatar";

const TopUsers = () => {
  const users = Array.from({ length: 5 });

  return (
    <section className="bg-white p-4 mt-4">
      <h2 className="mb-2 text-black">Top Users</h2>
      {users.map((user, index) => (
        <div
          className="flex flex-row items-center justify-between p-2"
          key={index}
        >
          <div className="flex flex-row items-center">
            <UserAvatar userImage={''} />
            <span className="text-subBlack text-sm ml-2">Banu Prakash</span>
          </div>
          <div>
            <span className="text-subBlack text-sm">52k</span>
          </div>
        </div>
      ))}
      <div className="border-t border-lightGrey pt-2 mt-2">
        <div className="flex flex-row items-center p-2">
          <UserAvatar userImage={''} />
          <span className="text-subBlack text-sm ml-2">You (300)</span>
        </div>
      </div>
    </section>
  );
};

export default TopUsers;
