import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import EditorInput from "~~/components/editor/EditorInput";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div>
        <h2 className="font-serif text-7xl font-bold pb-6">Create</h2>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="basis-2/3">
            <EditorInput />
          </div>
          <div className="basis-1/3 bg-base-100 flex flex-col gap-6">
            <div className="form-control w-full">
              <label className="label p-0">
                <span className="label-text font-sans text-lg font-bold">Title</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-ghost w-full outline-none focus:outline-none active:outline-none rounded-none focus:bg-transparent border-0 border-b-4 border-base-200"
              />
            </div>
            <div className="form-control w-full">
              <label className="label p-0">
                <span className="label-text font-sans text-lg font-bold">Description</span>
              </label>
              <textarea
                placeholder=""
                className="textarea input input-ghost w-full outline-none focus:outline-none active:outline-none rounded-none focus:bg-transparent border-0 border-b-4 border-base-200 h-16"
              ></textarea>
            </div>
            <div className="btn bg-base-200 rounded-none">Upload & Sign</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
