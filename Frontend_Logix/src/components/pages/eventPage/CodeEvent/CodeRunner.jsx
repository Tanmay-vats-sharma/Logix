import React from "react";
import DOMPurify from "dompurify";

const CodeRunner = ({ code }) => {
  const safeHtml = DOMPurify.sanitize(code || "", { USE_PROFILES: { html: true } });

  return (
    <div className="h-full w-full overflow-auto rounded-lg bg-white text-black shadow-inner">
      <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
    </div>
  );
};

export default CodeRunner;
