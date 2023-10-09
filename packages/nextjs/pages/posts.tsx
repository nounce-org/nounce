import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import SVGIcon from "~~/components/ui/SVGIcon";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div>
        <h2 className="font-serif text-7xl font-bold pb-6">Posts</h2>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="basis-2/3">
            <div className="overflow-x-auto">
              <table className="table font-semilbold text-lg">
                {/* head */}
                <thead>
                  <tr className="text-lg">
                    <th></th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>A first announcement</td>
                    <td className="flex flex-row gap-2">
                      <SVGIcon name="article" className="h-6 w-6"></SVGIcon>Article
                    </td>
                    <td>12/12/12</td>
                    <td>X</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="basis-1/3 bg-base-100 flex flex-col gap-6  border-r-4 border-b-4 border-base-200">
            <div className="form-control w-full">
              <select className="select w-full bg-base-200 focus:outline-none outline-none rounded-none">
                <option selected>Article</option>
                <option>Event</option>
                <option>External URL</option>
                <option>Contract</option>
                <option>Media</option>
                <option>Snapshot</option>
              </select>
            </div>

            <div className="text-sm font-semibold pl-4 pb-4 font-sans">
              An article can containt plain text or markdown.{" "}
            </div>

            <div className="form-control w-full">
              <label className="label p-0">
                <span className="label-text font-sans text-lg font-bold pl-4">Title</span>
              </label>
              <input
                type="text"
                placeholder="Your title"
                className="input input-ghost w-full outline-none focus:outline-none active:outline-none rounded-none focus:bg-transparent border-0 border-b-4 border-base-200"
              />
            </div>
            <div className="btn bg-base-100 border-0 rounded-none">Create</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
