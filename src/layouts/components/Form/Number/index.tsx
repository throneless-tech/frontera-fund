import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Error } from '../Error'
import { Width } from '../Width'
export function Number({ name, defaultValue, errors, label, required, width }: any) {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
           {' '} * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="number"
        required={required}
        className="bg-white"
      />
      {errors && errors[name] && <Error name={name} />}
    </Width>
  );
}
