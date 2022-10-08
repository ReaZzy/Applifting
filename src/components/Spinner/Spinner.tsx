import React from 'react';
import {
  SpinnerItem,
  SpinnerRing,
} from '@src/components/Spinner/spinner.styles';

interface SpinnerProps {
  smaller?: boolean;
}

const Spinner: React.FC<SpinnerProps> = React.memo(({ smaller }) => {
  return (
    <SpinnerRing smaller={smaller} key="spinner-component">
      <SpinnerItem smaller={smaller} />
      <SpinnerItem smaller={smaller} />
      <SpinnerItem smaller={smaller} />
    </SpinnerRing>
  );
});

Spinner.displayName = 'Spinner';
export default Spinner;
