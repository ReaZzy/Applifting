import React, { InputHTMLAttributes } from 'react';
import { Input, InputLabel } from '@src/components/TextField/textField.styles';

export type InputProps = {
  name: string;
  type?: string;
  placeholder?: string;
  hasError?: boolean;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, placeholder, hasError, type = 'text', ...rest }, ref) => {
    return (
      <>
        {label && <InputLabel hasError={hasError}>{label}</InputLabel>}
        <Input
          key={`input-${name}`}
          ref={ref}
          name={name}
          type={type}
          aria-label={placeholder}
          placeholder={placeholder}
          hasError={hasError}
          {...rest}
        />
      </>
    );
  },
);

TextField.displayName = 'TextField';
export default TextField;
