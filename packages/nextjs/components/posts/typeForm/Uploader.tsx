import React from "react";
import { IPost } from "~~/database/types";

interface Props {
  post: IPost;
  onContentChange: (updatedContent: string) => void;
}

// const Uploader: React.FC<Props> = ({ post, onContentChange }) => {
const Uploader: React.FC<Props> = ({ post }) => {
  if (post.url)
    return (
      <div>
        Your file is at{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://w3s.link/ipfs/${post.url}`}
          className="btn btn-ghost btn-sm"
        >
          {post.url}
        </a>
      </div>
    );
  else
    return (
      <div>
        Uploading your file <span className="loading loading-ball loading-lg"></span>
      </div>
    );
};
export default Uploader;
