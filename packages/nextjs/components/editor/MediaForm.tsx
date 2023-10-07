import React from "react";

const MediaForm: React.FC<{ onChange: (data: any) => void }> = ({ onChange }) => {
  return (
    <div className="full">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Upload media</span>
        </label>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          onChange={e => onChange({ content: e.target.value })}
        />
      </div>
    </div>
  );
};

export default MediaForm;
