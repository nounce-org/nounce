// import { useEffect, useState } from "react";
// import { MilkdownProvider } from "@milkdown/react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

// import { MilkdownEditor } from "~~/components/editor/Editor";

const Editor: NextPage = () => {
  // const [isClient, setIsClient] = useState(false);
  // Wait until after client-side hydration to show
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  return (
    <>
      <MetaHeader title="Create announcement" description="Editor for web3 announcement">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className=" mx-6">
        <div className="flex flex-row gap-6">
          <div className="card basis-2/3 bg-primary">
            <div className="card-body">
              <div className="flex flex-row gap-6">
                <button className="btn btn-sm btn-secondary font-bold">B</button>
                <button className="btn btn-sm btn-secondary italic">i</button>
                <button className="btn btn-sm btn-secondary underline">u</button>
                <button className="btn btn-sm btn-secondary line-through">t</button>
              </div>
              <textarea className="textarea rounded-xl h-full" placeholder="Type your announcement"></textarea>

              {/* <MilkdownProvider>{isClient && <MilkdownEditor />}</MilkdownProvider> */}
            </div>
          </div>
          <div className="card bg-secondary w-full basis-1/3">
            <div className="card-body">
              <h2 className="card-title">Announcement information</h2>
              <div className="flex flex-col gap-6">
                <input type="text" placeholder="Title" className="input input-bordered w-full input-sm " />
                <input type="text" placeholder="Description" className="input input-bordered w-full input-sm " />
                <input type="text" placeholder="Type here" className="input input-bordered w-full input-sm " />
                <input type="text" placeholder="Type here" className="input input-bordered w-full input-sm " />
                <input type="text" placeholder="Type here" className="input input-bordered w-full input-sm " />
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary w-full">Post announcement</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
