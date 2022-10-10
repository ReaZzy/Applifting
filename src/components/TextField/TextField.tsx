import React, { InputHTMLAttributes } from 'react';
import { Input } from '@src/components/TextField/textField.styles';

import { InputLabel } from '../styled';

export type InputProps = {
  name: string;
  hasError?: boolean;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, placeholder, hasError, type = 'text', ...rest }, ref) => {
    return (
      <div>
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
      </div>
    );
  },
);

TextField.displayName = 'TextField';
export default TextField;
