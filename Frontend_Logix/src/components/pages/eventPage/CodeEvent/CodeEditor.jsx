// CodeEditorPage.jsx
import React, { useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { keymap, EditorView} from "@codemirror/view";
import { EditorState} from "@codemirror/state";
import { autocompletion } from "@codemirror/autocomplete";

// Block keyboard shortcuts
const blockClipboardExtension = keymap.of([
  { key: "Mod-c", preventDefault: true, run: () => true },
  { key: "Mod-v", preventDefault: true, run: () => true },
  { key: "Mod-x", preventDefault: true, run: () => true },
  { key: "Mod-a", preventDefault: true, run: () => true },
]);

const CodeEditorPage = ({ code, onCodeChange, isLocked }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editorEl = editorRef.current?.querySelector(".cm-editor");
    if (!editorEl) return;

    const disableEvent = (e) => e.preventDefault();

    // Disable right click + copy/cut/paste
    editorEl.addEventListener("contextmenu", disableEvent);
    editorEl.addEventListener("copy", disableEvent);
    editorEl.addEventListener("cut", disableEvent);
    editorEl.addEventListener("paste", disableEvent);
    editorEl.addEventListener("contextmenu", disableEvent);

    // Prevent hidden paste insertions
    const handleBeforeInput = (e) => {
      if (e.inputType === "insertFromPaste") e.preventDefault();
    };
    editorEl.addEventListener("beforeinput", handleBeforeInput);

    return () => {
      editorEl.removeEventListener("contextmenu", disableEvent);
      editorEl.removeEventListener("copy", disableEvent);
      editorEl.removeEventListener("cut", disableEvent);
      editorEl.removeEventListener("paste", disableEvent);
      editorEl.removeEventListener("beforeinput", handleBeforeInput);
    };
  }, []);

  return (
    <div
      ref={editorRef}
      className="h-full rounded-xl overflow-x-hidden overflow-y-auto  whitespace-pre-wrap break-words scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent border border-gray-700 shadow-lg"
      onContextMenu={(e) => e.preventDefault()}
      onContextMenuCapture={(e) => e.preventDefault()}
    >
      <CodeMirror
        value={code}
        height="100%"
        extensions={[
          html(),
          css(),
          EditorView.lineWrapping,
          blockClipboardExtension,
          EditorState.readOnly.of(isLocked),
          autocompletion({ override: [] }),
        ]}
        theme="dark"
        onChange={(value) => onCodeChange(value)}
      />
    </div>
  );
};

export default CodeEditorPage;
