/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "quill/dist/quill.snow.css";
import { Quill, quillConfig } from "./quill-config";

const RichTextInput = ({ onChange }: { onChange: (html: string) => void }) => {
  const [text, setText] = React.useState("");
  const quillRef = React.useRef<HTMLDivElement>(null);
  const quillInstance = React.useRef<Quill | null>(null);

  React.useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      // Inicializar o Quill
      quillInstance.current = new Quill(quillRef.current, quillConfig);
      
      // Adicionar listener para mudanças de texto
      quillInstance.current.on("text-change", () => {
        if (quillInstance.current) {
          const rawHTML = quillInstance.current.root.innerHTML;
          setText(rawHTML);
        }
      });
    }
  }, []);

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
    onChange(convertToInlineStyles(text));
  }, [text, onChange]);

  return (
    <>
      <div style={{ height: 500, overflowY: "auto" }} ref={quillRef} />
    </>
  );
};

export default React.memo(RichTextInput);
