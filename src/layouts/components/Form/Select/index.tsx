import { Label } from '@/components/ui/label'
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export function Select({ name, control, errors, label, onChange, options, required, width, defaultValue }: any) {
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
      <SelectComponent onValueChange={onChange}>
        <SelectTrigger className="w-full bg-white" id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }: { label: string; value: string }) => {
            return (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </SelectComponent>
      {errors && errors && errors[name] && <Error name={name} />}
    </Width>
  );
}
