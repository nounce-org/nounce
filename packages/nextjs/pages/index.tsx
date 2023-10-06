import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { AnnouncementEvents } from "~~/components/announce/AnnouncementEvents";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div>
        <AnnouncementEvents />
      </div>
    </>
  );
};

export default Home;
