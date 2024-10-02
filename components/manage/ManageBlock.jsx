"use client";
import { Text, Textarea, useColorMode } from "@chakra-ui/react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function ManageBlock({
  type,
  title,
  content,
  styles,
  setStyles,
  setContent,
}) {
  const { colorMode } = useColorMode();
  const editor = useCreateBlockNote({
    initialContent: content ? JSON.parse(content) : [{ type: "paragraph" }]
  });

  return (
    <>
      <BlockNoteView
        editor={editor}
        onChange={() => {
          // Saves the document JSON to state.
          setContent(
            JSON.stringify(
              editor.document.map((item) => {
                return {
                  type: item.type,
                  content: item.content,
                  props: item.props,
                };
              })
            )
          );
        }}
      />
    </>
  );
}
