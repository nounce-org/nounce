import React from "react";
import type { CodeBlockEditorDescriptor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

interface Props {
  content: string;
  onChange: (updatedContent: string) => void;
}

const {
  MDXEditor,
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  useCodeBlockEditorContext,
  toolbarPlugin,
  BlockTypeSelect,
  CreateLink,
  linkDialogPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
} = await import("@mdxeditor/editor");

const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
  match: () => true,
  priority: 0,
  Editor: props => {
    const cb = useCodeBlockEditorContext();
    return (
      <div onKeyDown={e => e.nativeEvent.stopImmediatePropagation()}>
        <textarea rows={3} cols={20} defaultValue={props.code} onChange={e => cb.setCode(e.target.value)} />
      </div>
    );
  },
};

const ArticleForm: React.FC<Props> = ({ content, onChange }) => {
  return (
    <MDXEditor
      className="bg-base-100 border-r-4 border-b-4 border-base-200 rounded-none disabled"
      onChange={(updatedContent: string) => onChange(updatedContent)}
      markdown={content}
      contentEditableClassName="prose min-h-40"
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <BlockTypeSelect />
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <CreateLink />
            </>
          ),
        }),
        codeBlockPlugin({ codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor] }),
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        linkDialogPlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
};

export default ArticleForm;
