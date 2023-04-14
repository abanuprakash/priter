import { GlobalConstants } from "@/_const/globalConstants";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import BottomFixedMenu from "../footer/bottomFixedMenu";
import LeftBar from "../sideBars/leftBar";
import RightBar from "../sideBars/rightBar";
import FeedsList from "../story/feedsList";
import FullStory from "../story/fullStory";

const Body = () => {
  const isTabletOrMobile = useMediaQuery(GlobalConstants.tabletAndMobileQuery);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main
        className={`grid grid-flow-col gap-3 lg:h-screen lg:overflow-hidden container mx-auto  ${
          isTabletOrMobile
            ? "grid-cols-1 w-11/12 mx-auto mt-12"
            : "grid-cols-12 mt-16"
        }`}
      >
        {!isTabletOrMobile && (
          <section className={`col-span-3`}>
            <LeftBar />
          </section>
        )}

        <section
          className={` ${isTabletOrMobile ? "col-span-1" : "col-span-6"}`}
        >
          <FeedsList />
          {/* <FullStory /> */}
        </section>

        {!isTabletOrMobile && (
          <section className={`col-span-3`}>
            <RightBar />
          </section>
        )}
      </main>

      {isTabletOrMobile && <BottomFixedMenu />}
    </>
  );
};

export default Body;
