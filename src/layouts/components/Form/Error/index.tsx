'use client'

import React, { useState } from 'react'
import { useFormContext } from "react-hook-form";

export function Error({ name }: { name: string }) {
  const {
    formState: { errors },
  } = useFormContext()

  console.log('errors: ', errors);
  
  return (
    <div className="mt-2 text-red-500 text-sm">
      {errors[name]?.message as string || 'This field is required'}
    </div>
  )
}
