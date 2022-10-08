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
import equal from 'fast-deep-equal/react';

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
    <div>
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
    </div>
  );
};

RHFTextField.displayName = 'RHFTextField';

// Can't pass generic to react.memo
// And have some strange behaviour with re-renders,
// so I need to compare it by myself
export default React.memo(RHFTextField, (prevProps, nextProps) => {
  return equal(prevProps, nextProps);
}) as typeof RHFTextField;
