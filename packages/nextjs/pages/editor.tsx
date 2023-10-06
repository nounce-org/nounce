import { useEffect, useState } from "react";
import { MilkdownProvider } from "@milkdown/react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { MilkdownEditor } from "~~/components/editor/Editor";

const Editor: NextPage = () => {
  const [isClient, setIsClient] = useState(false);
  // Wait until after client-side hydration to show
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      <MetaHeader
        title="Example UI | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <MilkdownProvider>{isClient && <MilkdownEditor />}</MilkdownProvider>
      </div>
    </>
  );
};

export default Editor;
