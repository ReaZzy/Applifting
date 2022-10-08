import React from 'react';
import {
  DeepMap,
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TextField, { InputProps } from '@src/components/TextField/TextField';
import { ErrorMessageText } from '@src/components/TextField/textField.styles';

type RHFTextFieldProps<TFormValues extends Record<string, unknown>> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & InputProps;

export const RHFTextField = <T extends Record<string, unknown>>({
  errors,
  name,
  register,
  rules,
  type = 'text',
  ...rest
}: RHFTextFieldProps<T>): React.ReactElement => {
  const error = errors?.[name];
  const hasError = Boolean(error && errors);
  return (
    <>
      <TextField
        name={name}
        hasError={hasError}
        type={type}
        {...rest}
        {...(typeof register === 'function' && register(name, rules))}
      />
      <ErrorMessage
        errors={errors}
        // @ts-expect-error React-hook-form wrong types
        name={name}
        render={({ message }) => <ErrorMessageText>{message}</ErrorMessageText>}
      />
    </>
  );
};

RHFTextField.displayName = 'RHFTextField';
// Can't pass generic to react.memo
export default React.memo(RHFTextField) as typeof RHFTextField;
