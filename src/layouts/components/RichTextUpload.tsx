import React from "react";

import type { SerializedUploadNode } from "@payloadcms/richtext-lexical";
import type { FileData, TypeWithID } from "payload";

export type Props = {
  node: SerializedUploadNode;
};

export const RichTextUpload: React.FC<Props> = (props) => {
  const { node } = props;

  const uploadDocument = node as unknown as { value?: FileData & TypeWithID };
  const url = uploadDocument?.value?.url;

  /**
   * If the upload is not an image, return a link to the upload
   */
  if (!uploadDocument?.value?.mimeType?.startsWith("image")) {
    return (
      <a href={url} rel="noopener noreferrer">
        {uploadDocument.value?.filename}
      </a>
    );
  }

  return (
    <img
      alt={uploadDocument?.value?.filename}
      height={uploadDocument?.value?.height}
      src={
        process.env.NODE_ENV !== "production"
          ? url
          : `/${uploadDocument.value?.filename}`
      }
      width={uploadDocument?.value?.width}
    />
  );
};

export default RichTextUpload;
