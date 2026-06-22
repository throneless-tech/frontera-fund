'use client'

import React, { useState } from 'react'

export function Error({ name }: { name: string }) {
  // const {
  //   formState: { errors },
  // } = useFormContext()
  const [errors] = useState<Record<string, any>>({})
  return (
    <div className="mt-2 text-red-500 text-sm">
      {(errors && (errors[name]?.message as string)) || 'This field is required'}
    </div>
  )
}
