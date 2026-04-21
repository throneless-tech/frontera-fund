import React from "react";

import type { SerializedUploadNode } from "@payloadcms/richtext-lexical";

export type Props = {
  node: SerializedUploadNode;
};

export const RichTextImage: React.FC<Props> = (props) => {
  const { node } = props;

  const image = node?.fields?.image;

  /**
   * If the upload is not an image, return a link to the upload
   */
  if (!image?.mimeType?.startsWith("image")) {
    return (
      <a href={image.url} rel="noopener noreferrer">
        {image.filename}
      </a>
    );
  }

  return (
    <img
      alt={image?.filename}
      height={image?.height}
      src={image?.url}
      width={image?.width}
    />
  );
};

export default RichTextImage;
