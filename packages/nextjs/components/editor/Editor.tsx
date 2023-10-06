import type { FC } from "react";
import { Editor, defaultValueCtx, rootCtx } from "@milkdown/core";
import { commonmark } from "@milkdown/preset-commonmark";
import { Milkdown, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";
import "@milkdown/theme-nord/style.css";

const markdown = `# Milkdown Next Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Next**.`;

export const MilkdownEditor: FC = () => {
  useEditor(root => {
    return Editor.make()
      .config(ctx => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, markdown);
      })
      .config(nord)
      .use(commonmark);
  }, []);

  return <Milkdown />;
};
