/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";

const theme = "snow";

const RichTextInput = ({ onChange }: { onChange: (html: string) => void }) => {
  const [text, setText] = React.useState("");
  const { quill, quillRef } = useQuill({
    theme,
    modules: {
      toolbar: [
        // ["bold", "italic", "underline", "strike"],
        // [{ header: [1, 2, 3, false] }],
        // [{ list: "ordered" }, { list: "bullet" }],
        // [{ color: [] }, { background: [] }],
        // [{ align: [] }],
        // ["link"],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"],
      ],
    },
    formats: [
      "bold",
      "italic",
      "underline",
      "strike",
      "header",
      "list",
      "bullet",
      "color",
      "background",
      "align",
      "link",
    ],
  });

  // Função para converter classes CSS para estilos inline
  const convertToInlineStyles = (html: string) => {
    // Criar um elemento temporário para manipular o HTML
    const replaceEmToItalic = (innerHTML: string) => {
      return innerHTML
        .replace(/<em>/g, '<i style="font-style: italic !important;">')
        .replace(/<\/em>/g, "</i>");
    };
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    console.log("Original HTML:", tempDiv.innerHTML);
    tempDiv.innerHTML = replaceEmToItalic(tempDiv.innerHTML);
    console.log("Change HTML:", tempDiv.innerHTML);

    // tempDiv.innerHTML = tempDiv.querySelectorAll("em").forEach((tag) => {
    //   tag.innerHTML = tag.innerHTML.replace(/<em>/g, "<i>").replace(/<\/em>/g, "</i>");
    // });

    // Mapear classes do Quill para estilos CSS
    const styleMap: Record<string, string> = {
      "ql-bold": "font-weight: bold !important;",
      "ql-italic": "font-style: italic !important;",
      "ql-underline": "text-decoration: underline !important;",
      "ql-strike": "text-decoration: line-through !important;",
      "ql-align-center": "text-align: center !important;",
      "ql-align-right": "text-align: right !important;",
      "ql-align-justify": "text-align: justify !important;",
    };

    // Processar elementos com classes do Quill
    const elementsWithClasses = tempDiv.querySelectorAll('[class*="ql-"]');

    elementsWithClasses.forEach((element) => {
      let inlineStyle = element.getAttribute("style") || "";

      // Converter classes para estilos
      element.classList.forEach((className) => {
        if (styleMap[className]) {
          inlineStyle += styleMap[className];
        }
      });

      // Aplicar o estilo inline e remover classes
      if (inlineStyle) {
        element.setAttribute("style", inlineStyle);
      }

      // Remover classes do Quill
      element.className = element.className.replace(/ql-\S+/g, "").trim();
      if (!element.className) {
        element.removeAttribute("class");
      }
    });

    // Processar headers (h1, h2, h3)
    tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((header) => {
      const currentStyle = header.getAttribute("style") || "";
      const headerStyles = {
        H1: "font-size: 2em; font-weight: bold; margin: 0.67em !important;",
        H2: "font-size: 1.5em; font-weight: bold; margin: 0.75em !important;",
        H3: "font-size: 1.17em; font-weight: bold; margin: 0.83em !important;",
        H4: "font-size: 1em; font-weight: bold; margin: 1.12em !important;",
        H5: "font-size: 0.83em; font-weight: bold; margin: 1.5em !important;",
        H6: "font-size: 0.75em; font-weight: bold; margin: 1.67em 0 !important;",
      };

      const headerStyle =
        headerStyles[header.tagName as keyof typeof headerStyles];
      if (headerStyle) {
        header.setAttribute("style", currentStyle + headerStyle);
      }
    });

    // Processar listas
    tempDiv.querySelectorAll("ul, ol").forEach((list) => {
      const currentStyle = list.getAttribute("style") || "";
      const listStyle =
        list.tagName === "UL"
          ? "list-style-type: disc; padding-left: 1.5em; margin: 1em 0 !important;"
          : "list-style-type: decimal; padding-left: 1.5em; margin: 1em 0 !important;";

      list.setAttribute("style", currentStyle + listStyle);
    });

    tempDiv.querySelectorAll("li").forEach((item) => {
      const currentStyle = item.getAttribute("style") || "";
      item.setAttribute(
        "style",
        `${currentStyle}display: list-item !important;`
      );
    });

    // Processar links
    tempDiv.querySelectorAll("a").forEach((link) => {
      const currentStyle = link.getAttribute("style") || "";
      link.setAttribute(
        "style",
        `${currentStyle}color: #0066cc; text-decoration: underline !important;`
      );
    });

    return tempDiv.innerHTML;
  };

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const rawHTML = quill.root.innerHTML;
        setText(rawHTML);
      });
    }
  }, [quill]);

  React.useEffect(() => {
    onChange(convertToInlineStyles(text));
  }, [text]);

  return (
    <>
      <div style={{ height: 500, overflowY: "auto" }} ref={quillRef} />
    </>
  );
};

export default React.memo(RichTextInput);
