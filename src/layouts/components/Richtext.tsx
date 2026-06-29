import React from "react";

import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import {
  type JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import RichTextEmbed from "./RichTextEmbed";
import RichTextUpload from "./RichTextUpload";

type Embed = {
  fields: {
    code: string
  }
}

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }: {defaultConverters: any}) => ({
  ...defaultConverters,
  blocks: {
    embed: ({ node }: { node: Embed}) => {
      return <RichTextEmbed node={node.fields.code} />;
    },
  },
  upload: ({ node }: { node: any}) => {
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