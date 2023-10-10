import type { FC } from "react";
import { useRouter } from "next/router";
import { postTable } from "~~/database/database.config";
import { IPost, PostState, PostType } from "~~/database/types";

const PostForm: FC = () => {
  const router = useRouter();
  const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const post: IPost = {
      title: (event.currentTarget.elements.namedItem("title") as HTMLInputElement).value,
      description: (event.currentTarget.elements.namedItem("description") as HTMLInputElement).value,
      state: PostState.DRAFT,
      type: (event.currentTarget.elements.namedItem("type") as HTMLSelectElement).value as PostType,
      createdAt: new Date(), // Current date and time
      updatedAt: new Date(),
    };
    try {
      const id = await postTable.add(post);
      console.info(`A new post was created with id ${id}`);
      router.push(`/posts/${id}`);
    } catch (error) {
      console.error(`Failed to add ${post}: ${error}`);
    }
  };
  return (
    <div>
      <form onSubmit={createPost}>
        <div className=" flex flex-col gap-6 ">
          <div className="form-control w-full">
            <select
              id="type"
              name="type"
              className="select w-full bg-base-200 focus:outline-none outline-none rounded-none"
            >
              {Object.values(PostType).map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm font-semibold pl-4 pb-4 font-sans">
            An article can containt plain text or markdown.{" "}
          </div>

          <div className="form-control w-full">
            <label className="label p-0" htmlFor="title">
              <span className="label-text font-sans text-lg font-bold pl-4">Title *</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Your title"
              className="input input-ghost w-full outline-none focus:outline-none active:outline-none rounded-none focus:bg-transparent border-0 border-b-4 border-base-200"
            />
          </div>

          <div className="form-control w-full">
            <label className="label p-0" htmlFor="description">
              <span className="label-text font-sans text-lg font-bold pl-4">Description</span>
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              className="input input-ghost w-full outline-none focus:outline-none active:outline-none rounded-none focus:bg-transparent border-0 border-b-4 border-base-200"
            />
          </div>
          <button className="btn bg-base-100 border-0 rounded-none w-full" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
