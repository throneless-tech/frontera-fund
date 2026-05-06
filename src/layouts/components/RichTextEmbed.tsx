import React from "react";
import parse from "html-react-parser";

export type Props = {
  node: string;
};

export const RichTextEmbed: React.FC<Props> = (props) => {
  const { node } = props;

  return (
    <div>
      {parse(node)}
    </div>
  );
};

export default RichTextEmbed;
