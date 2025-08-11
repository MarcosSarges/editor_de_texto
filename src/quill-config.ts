// Configuração específica para o Quill para resolver problemas de build
import Quill from 'quill';

// Garantir que o Quill seja exportado corretamente
export { Quill };

// Configuração padrão do Quill
export const quillConfig = {
  theme: 'snow',
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
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
};
