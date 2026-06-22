import React from 'react'

import { Width } from '../Width'
import { RichTextComp } from "@/components/Richtext";

export function Message({ message }: { message: any }) {
  return (
    <Width width="100">
      {message && <RichTextComp data={message} />}
    </Width>
  )
}
