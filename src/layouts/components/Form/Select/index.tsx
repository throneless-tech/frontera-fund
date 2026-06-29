import { Label } from '@/components/ui/label'
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'
import { Controller } from "react-hook-form";

import { Error } from '../Error'
import { Width } from '../Width'

export function Select(props: any) {
  const {
    name,
    control,
    errors,
    label,
    options,
    required,
    width,
    defaultValue = "",
    placeholder,
  } = props;

  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}
        {required && (
          <span className="required">
            {" "}
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Controller
        control={control}
        defaultValue={defaultValue || ""}
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = options.find((t: any) => t.value === value);

          return (
            <SelectComponent
              onValueChange={(val) => onChange(val)}
              value={controlledValue?.value}
            >
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={placeholder || label} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ label, value }: {label: string, value: string}) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </SelectComponent>
          );
        }}
        rules={{ required }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  );
}
