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
    if (typeof resetField === 'function')
      resetField(name, { defaultValue: null, keepDirty: true });
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, formState: { errors } }) => {
        const isFile = value instanceof File;
        const isBlob = value instanceof Blob;
        const isExisting = isFile || isBlob;
        const hasError = !!errors?.[name];
        return (
          <div>
            {label && <InputLabel hasError={hasError}>{label}</InputLabel>}
            <Flex gap={`${theme.spacing.common}px`} flexDirection="column">
              {isExisting && (
                <Image
                  alt={isFile ? value.name : 'image'}
                  width="100px"
                  height="75px"
                  src={URL.createObjectURL(value)}
                />
              )}
              <Flex gap={`${theme.spacing.common}px`}>
                <FileInputLabel primary={isExisting}>
                  <HiddenInput
                    id={name}
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                    {...rest}
                    onChange={(e) => onChange(e.target?.files?.[0])}
                  />
                  {isExisting ? 'Upload new' : 'Upload file'}
                </FileInputLabel>
                {isExisting && typeof resetField === 'function' && (
                  <Button
                    type="button"
                    primary={false}
                    onClick={handleDeleteImage}
                  >
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
