import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RadioComp({ name, control, errors, label, options, required, width, defaultValue, sfName, conditionalName }: any) {

  return (
    <fieldset>
      <legend className="mb-1">{label}</legend>
      {options.map((option: any) => (
        <div key={option.id} className="mb-2 flex flex-row items-center gap-2">
          <Input
            className="checked:bg-accent focus:outline-accent h-5 w-1 rounded-2xl"
            type="radio"
            id={option.value}
            value={option.value}
            required={required}
            name={name}
          />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </fieldset>
  );
}