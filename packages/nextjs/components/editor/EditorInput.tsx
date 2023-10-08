import React from "react";
import dynamic from "next/dynamic";

const EditorInput: React.FC = () => {
  const MDEditor = dynamic(() => import("~~/components/editor/MDEditor"), { ssr: false });

  return (
    <div className="full">
      <MDEditor />
    </div>
  );
};

export default EditorInput;
