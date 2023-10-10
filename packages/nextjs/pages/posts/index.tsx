import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import PostForm from "~~/components/posts/PostForm";
import PostsList from "~~/components/posts/PostsList";

const Posts: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div>
        <h2 className="font-serif text-7xl font-bold pb-6">Posts</h2>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="basis-2/3">
            <div className="overflow-x-auto">
              <PostsList />
            </div>
          </div>
          <div className="basis-1/3 bg-base-100 border-r-4 border-b-4 border-base-200 h-fit">
            <PostForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
