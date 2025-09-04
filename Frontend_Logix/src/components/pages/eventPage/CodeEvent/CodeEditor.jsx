import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { keymap } from "@codemirror/view";

const blockClipboardExtension = keymap.of([
  {
    key: "Mod-c",
    preventDefault: true,
    run: () => true,
  },
  {
    key: "Mod-v",
    preventDefault: true,
    run: () => true,
  },
  {
    key: "Mod-x",
    preventDefault: true,
    run: () => true,
  },
  {
    key: "Mod-a",
    preventDefault: true,
    run: () => true,
  },
]);

const CodeEditorPage = ({ code, onCodeChange }) => {
  return (
    <div className="h-full rounded-xl overflow-hidden border border-gray-700 shadow-lg">
      <CodeMirror
        value={code}
        height="100%"
        extensions={[html(), css(), blockClipboardExtension]}
        theme="dark"
        onChange={(value) => onCodeChange(value)}
      />
    </div>
  );
};

export default CodeEditorPage;
