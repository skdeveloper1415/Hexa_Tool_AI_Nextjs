"use client"
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Add Quill's CSS

function QuillEditor ({ value, onChange, height,onTextChange, onClearError }) {
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (!quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow', // 'snow' or 'bubble' theme
        placeholder: '',
        modules: {
          table: true,
        }
      });

      const editor = quillInstance.current;

      // editor.focus()
      editor.on('text-change', () => {
        onChange(editor.root.innerHTML);
      });
      editor.on('selection-change', () => {
        onChange(editor.root.innerHTML);
      });
    }

    const editor = quillInstance.current;
    if (value !== editor.root.innerHTML) {
      editor.root.innerHTML = value;
    }
 
    // const editor = quillInstance.current;
    // console.log('editor', editor)
    // const table = editor.getModule('table');
    // table.insertTable(2, 2);
    // console.log('table', table)


    return () => {
      if (editor) {
        editor.off('text-change');
        // editor.off('selection-change'); 
      }
    };
  }, [value, onChange, onClearError]);

  const handleTextChange = () => {
    const editor = quillInstance.current;
    onChange(editor.root.innerHTML);
    
    if(onClearError){
      onClearError();
    }
   
  };
  const handletable = (e)=>{
    e.preventDefault()
    const editor = quillInstance.current;
    console.log('editor', editor)
    const table = editor.getModule('table');
    table.insertTable(2, 2);
    console.log('table', table)
  }

  return <><div ref={quillRef} style={{ height }} onInput={handleTextChange}/>
  {/* <button className='ed-btn' onClick={(e)=>{handletable(e)}}>button</button> */}
  </>
};

export default QuillEditor;
