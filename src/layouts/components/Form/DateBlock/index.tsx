import React, { useState } from 'react'
import { DateSelect } from '@/components/ui/datetime'
import { Label } from '@/components/ui/label'

import { Error } from '../Error'
import { Width } from '../Width'

export function DateBlock({ name, defaultValue, errors, label, register, required, width }: any) {
  const [ apptDate, setApptDate ] = useState(new Date());

  return (
    <Width width={width}>
      <div className="">
        <Label htmlFor={name}>
          {label}
          {required && (
            <span className="required">
             {' '} * <span className="sr-only">(required)</span>
            </span>
          )}
        </Label>
        <DateSelect
          defaultValue={apptDate}
          id={name}
          onChange={(date: any) => {
            setApptDate(date);
          }}
        />
      </div>
      {errors && errors[name] && <Error name={name} />}
    </Width>
  );
}
