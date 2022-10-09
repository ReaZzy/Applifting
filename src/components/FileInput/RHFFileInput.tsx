import React from 'react';
import { Control, Controller, Path, UseFormResetField } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@src/components/Button/Button';
import {
  FileInputLabel,
  HiddenInput,
} from '@src/components/FileInput/fileInput.styles';
import { InputProps } from '@src/components/TextField/TextField';
import { ACCEPTED_IMAGE_TYPES } from '@src/types/articles.api.types';
import { useTheme } from 'styled-components';

import { ErrorMessageText, Flex, Image, InputLabel } from '../styled';

type FileInputProps<TFormValues extends Record<string, unknown>> = {
  name: Path<TFormValues>;
  control?: Control<TFormValues>;
  resetField?: UseFormResetField<TFormValues>;
} & Omit<InputProps, 'type'>;

const RHFFileInput = <T extends Record<string, unknown>>({
  control,
  name,
  label,
  resetField,
  ...rest
}: FileInputProps<T>): React.ReactElement => {
  const theme = useTheme();
  const handleDeleteImage = () => {
    if (typeof resetField === 'function') resetField(name);
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, formState: { errors } }) => {
        const isFile = value && value instanceof File;
        const hasError = !!errors?.[name];
        return (
          <div>
            {label && <InputLabel hasError={hasError}>{label}</InputLabel>}
            <Flex gap={`${theme.spacing.common}px`} flexDirection="column">
              {isFile && (
                <Image
                  alt={value.name}
                  width="100px"
                  height="75px"
                  src={URL.createObjectURL(value)}
                />
              )}
              <Flex gap={`${theme.spacing.common}px`}>
                <FileInputLabel primary={isFile}>
                  <HiddenInput
                    id={name}
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                    {...rest}
                    onChange={(e) => onChange(e.target?.files?.[0])}
                  />
                  {isFile ? 'Upload new' : 'Upload file'}
                </FileInputLabel>
                {isFile && typeof resetField === 'function' && (
                  <Button primary={false} onClick={handleDeleteImage}>
                    Delete
                  </Button>
                )}
              </Flex>
              <ErrorMessage
                errors={errors}
                // @ts-expect-error React-hook-form wrong types
                name={name}
                render={({ message }) => (
                  <ErrorMessageText>{message}</ErrorMessageText>
                )}
              />
            </Flex>
          </div>
        );
      }}
    />
  );
};

RHFFileInput.displayName = 'RHFFileInput';
export default RHFFileInput;
