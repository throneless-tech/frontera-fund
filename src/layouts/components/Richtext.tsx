import React from "react";

import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import {
  type JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import RichTextUpload from "./RichTextUpload";

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    return <RichTextUpload node={node} />;
  },
});

export const RichTextComp = ({
  data,
}: {
  data: SerializedEditorState<SerializedLexicalNode>;
}) => {
  return <RichText converters={jsxConverters} data={data} />;
};