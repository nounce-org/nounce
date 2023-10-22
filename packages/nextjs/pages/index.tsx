import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { AnnouncementEvents } from "~~/components/announce/AnnouncementEvents";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div>
      <h1 className="font-serif text-3xl font-bold pb-6">Announcement standard for WEB3</h1>
      <p>
Addressing the concerns of trust and communication security is essential for the wider acceptance of web3 technologies. 
In light of these challenges, the project is introducing an innovative solution.
A standardized "Announcement" protocol designed for EVM chains. </p>
<p>
This standard aligns seamlessly with the schema.org framework and supports a diverse range of information including news and events. 
For effective implementation, integration with ERC standards, specifically ERC-164 and 1820, is pivotal. To track and manage these announcements, a "registryRelayer" is employed on every EVM chain, linking back to a primary, low-fee chain registry to ensure user-friendly access. 
Users are empowered to either listen to these announcements directly or display them across a multitude of platforms, ranging from marketplaces and chain explorers to apps like Zerion. </p>
      </div>
    </>
  );
};

export default Home;
