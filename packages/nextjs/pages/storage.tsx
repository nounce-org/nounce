import React, { useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { useWeb3Storage } from "~~/hooks/nounce/useWeb3Storage";

const Storage: NextPage = () => {
  const [content, setContent] = useState("# This is markdown");

  const { storeFiles } = useWeb3Storage();

  const handleSubmit = async () => {
    console.log(content);
    await storeFiles(content, "document.md", "text/markdown");
  };

  return (
    <>
      <MetaHeader />
      <div className="px-6">
        <div className="card w-full bg-base-100 rounded-3xl">
          <div className="card-body">
            <h2 className="card-title">Type your text</h2>
            <div className="form-control w-full">
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Type your markdown here..."
                rows={10}
                cols={50}
              ></textarea>
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Upload Markdown
              </button>
            </div>
          </div>
        </div>
        <div>
          {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://w3s.link/ipfs/${cid}`}
            className="btn btn-primary"
          >
            {cid}
          </a> */}
        </div>
      </div>
    </>
  );
};

export default Storage;
