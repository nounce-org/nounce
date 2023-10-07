import React from "react";

const ArticleForm: React.FC<{ onChange: (data: any) => void }> = ({ onChange }) => {
  return (
    <div className="full">
      <div className="form-control w-full">
        <label className="label flex justify-start	gap-6">
          <button className="btn btn-sm shrink font-bold">B</button>
          <button className="btn btn-sm italic">i</button>
          <button className="btn btn-sm underline">u</button>
        </label>
        <textarea
          placeholder="Type here"
          className="textarea textarea-bordered w-full h-40"
          onChange={e => onChange({ content: e.target.value })}
        ></textarea>
      </div>
    </div>
  );
};

export default ArticleForm;
