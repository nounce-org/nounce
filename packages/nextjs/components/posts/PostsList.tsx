import type { FC } from "react";
import Link from "next/link";
import SVGIcon from "../ui/SVGIcon";
import { useLiveQuery } from "dexie-react-hooks";
import { postTable } from "~~/database/database.config";
import { formatDate } from "~~/utils/nounce/utils";

const CustomersList: FC = () => {
  const post = useLiveQuery(() => postTable.orderBy("updatedAt").reverse().toArray());

  const deletePost = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (!isConfirmed) return;
    try {
      await postTable.delete(id);
      console.info(`Post with id ${id} deleted successfully!`);
    } catch (error) {
      console.error(`Failed to delete post with id ${id}: ${error}`);
    }
  };

  return (
    <div>
      <table className="table font-semilbold text-lg">
        {/* head */}
        <thead>
          <tr className="text-lg">
            <th></th>
            <th>Title</th>
            <th>Type</th>
            <th>Edited</th>
            <th>State</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {post?.map(post => (
            <tr key={post.id} className="hover:font-semibold">
              <th>
                <Link href={`/posts/${post.id}`}>{post.id}</Link>
              </th>
              <td>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </td>
              <td>
                <div className="flex flex-row gap-x-2">
                  <SVGIcon name={post.type} className="h4 w-4" /> {post.type}
                </div>
              </td>
              <td>{post.updatedAt ? formatDate(post.updatedAt) : "-"}</td>
              <td>{post.state}</td>
              <td>
                {" "}
                <div className="btn rounded-none btn-ghost btn-sm" onClick={() => deletePost(post.id)}>
                  X
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* lower: <input type="number" value={lower} onChange={(e) => setLower(Number(e.target.value))} /> & upper: <input type="number" value={upper} onChange={(e) => setUpper(Number(e.target.value))} /> */}
    </div>
  );
};

export default CustomersList;
