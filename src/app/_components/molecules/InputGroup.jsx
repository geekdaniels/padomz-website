// 'use client';
// //
import { Input } from "@/_components/atoms/Input";
import { Label } from "@/_components/atoms/Label";

export const InputGroup = ({
  name,
  placeholder,
  icon,
  value,
  type,
  id,
  required,
  label,
  disabled,
  ...props
}) => {
  return (
    <div className="input-group">
      <Label htmlFor="" className="">
        {label}
      </Label>
      <div>
        <Input
          name={name}
          placeholder={placeholder}
          icon={icon}
          value={value}
          type={type}
          id={id}
          required={required}
          disabled={disabled}
          {...props}
        />
      </div>
    </div>
  );
};
