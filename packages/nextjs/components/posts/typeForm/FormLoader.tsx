import React from "react";
import ArticleForm from "~~/components/posts/typeForm/ArticleForm";
import { IPost, PostType } from "~~/database/types";

// import dynamic from "next/dynamic";

interface Props {
  post: IPost;
  onContentChange: (updatedContent: string) => void;
}

// const MDForm = dynamic(() => import("~~/components/posts/typeForm/MDForm"), { ssr: false });

const FormLoader: React.FC<Props> = ({ post, onContentChange }) => {
  switch (post.type) {
    case PostType.ARTICLE:
      return <ArticleForm content={post.content || ""} onChange={onContentChange} />;
    default:
      return <div>Invalid post type</div>;
  }
};
export default FormLoader;
