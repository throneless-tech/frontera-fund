import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export function Textarea({ name, defaultValue, errors, label, required, rows = 3, width, onChange }: any) {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>

      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        required={required}
        onChange={onChange}
        className="bg-white"
      />

      {errors && errors[name] && <Error name={name} />}
    </Width>
  );
}
