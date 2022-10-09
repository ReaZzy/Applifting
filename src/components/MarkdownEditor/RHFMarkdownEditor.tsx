import React from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useTheme } from 'styled-components';

import { ErrorMessageText, Flex, InputLabel } from '../styled';

type RHFMarkdownEditorProps<TFormValues extends Record<string, unknown>> = {
  name: Path<TFormValues>;
  control?: Control<TFormValues>;
  label?: string;
};

const RHFMarkdownEditor = <T extends Record<string, unknown>>({
  control,
  name,
  label,
}: RHFMarkdownEditorProps<T>): React.ReactElement => {
  const theme = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, formState: { errors } }) => {
        const hasError = !!errors?.[name];
        return (
          <div>
            {label && <InputLabel hasError={hasError}>{label}</InputLabel>}
            <Flex
              gap={`${theme.spacing.common}px`}
              flexDirection="column"
              alignItems="inherit"
            >
              <ErrorMessage
                errors={errors}
                // @ts-expect-error React-hook-form wrong types
                name={name}
                render={({ message }) => (
                  <ErrorMessageText>{message}</ErrorMessageText>
                )}
              />
              <MarkdownEditor value={value as string} onChange={onChange} />
            </Flex>
          </div>
        );
      }}
    />
  );
};

RHFMarkdownEditor.displayName = 'RHFMarkdownEditor';
export default RHFMarkdownEditor;
