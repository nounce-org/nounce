import React from "react";

const ArticleForm: React.FC<{ onChange: (data: any) => void }> = ({ onChange }) => {
  return (
    <div>
      <label>
        Content:
        <textarea onChange={e => onChange({ content: e.target.value })}></textarea>
      </label>
    </div>
  );
};

export default ArticleForm;
