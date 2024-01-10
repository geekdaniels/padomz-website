// 'use client';
// //
import { Label } from "@/_components/atoms/Label";
import { Select } from "@/_components/atoms/Select";

export const SelectGroup = ({ name, value, id, label, children, ...props }) => {
  return (
    <div class="input-group">
      <Label htmlFor="" class="">
        {label}
      </Label>
      <div>
        <Select name={name} value={value} id={id} {...props}>
          {children}
        </Select>
      </div>
    </div>
  );
};
