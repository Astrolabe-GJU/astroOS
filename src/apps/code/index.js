import * as monaco from 'monaco-editor';

console.log("@MONACO");
monaco.editor.create(document.getElementById('editor-container'), {
  value: `function hello() {\n\talert('Hello, world!');\n}`,
  language: 'javascript',
  theme: 'vs-dark'
});
