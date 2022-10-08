import React, { ButtonHTMLAttributes } from 'react';
import {
  ButtonWrapper,
  HideOnLoading,
} from '@src/components/Button/button.styles';
import Spinner from '@src/components/Spinner/Spinner';

export type ButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  primary?: boolean;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ primary, fullWidth, children, isLoading, ...rest }, ref) => {
    return (
      <ButtonWrapper
        ref={ref}
        fullWidth={fullWidth}
        isLoading={isLoading}
        primary={primary}
        {...rest}
      >
        {isLoading && <Spinner smaller />}
        {/*/I need to hide it via css to keep the same width/*/}
        <HideOnLoading isLoading={isLoading}>{children}</HideOnLoading>
      </ButtonWrapper>
    );
  },
);

Button.displayName = 'Button';
export default Button;
