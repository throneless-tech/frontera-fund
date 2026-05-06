import React from 'react'

import { Width } from '../Width'
import { RichTextComp } from "@/components/Richtext";

export const Message: React.FC<{ message: any }> = ({ message }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichTextComp data={message} />}
    </Width>
  )
}
