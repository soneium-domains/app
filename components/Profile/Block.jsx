"use client";
import { Styles } from "types";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";


export default function Block({ title, content, style }) {
  const editor = useCreateBlockNote({ initialContent: content ? JSON.parse(content) : [ {type : 'paragraph'}]});
  return (
    <>
      
        <BlockNoteView
          data-block-view
          editor={editor}
          editable={false}
          theme={'dark'}
        />
      
    </>
  );
}
