import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export function Text({ name, defaultValue, errors, label, register, required, width }: any) {

  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            {" "}
            *<span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        required={required}
        className="bg-white"
        {...register(name, { required })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  );
}
