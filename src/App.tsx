import { useState } from "react";
import RichTextInput from "./RichTextInput";

function App() {
  const [html, setHtml] = useState<string>("");
  return (
    <div
      style={{ display: "flex", flexDirection: "row", gap: 10, padding: 10 }}
    >
      <div style={{ flex: 1 }}>
        <RichTextInput onChange={setHtml} />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: 10,
        }}
      />
    </div>
  );
}

export default App;
