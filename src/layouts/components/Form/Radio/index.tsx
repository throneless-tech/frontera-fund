import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RadioComp({ name, control, errors, label, options, register, required, width, defaultValue, sfName, conditionalName }: any) {

  return (
    <fieldset>
      <legend className="mb-1">{label}</legend>
      {options.map((option: any) => (
        <div key={option.id} className="mb-2 flex flex-row items-center gap-2">
          <Input
            className="bg-white checked:bg-accent focus:outline-accent h-5! w-1! rounded-full! flex-0"
            type="radio"
            id={option.value}
            value={option.value}
            required={required}
            name={name}
            {...register(name, { required })}
          />
          <Label className="flex-1" htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </fieldset>
  );
}