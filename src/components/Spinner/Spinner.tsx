import React from 'react';
import {
  SpinnerItem,
  SpinnerRing,
} from '@src/components/Spinner/spinner.styles';

const Spinner: React.FC = React.memo(() => {
  return (
    <SpinnerRing key="spinner-component">
      <SpinnerItem />
      <SpinnerItem />
      <SpinnerItem />
    </SpinnerRing>
  );
});

Spinner.displayName = 'Spinner';
export default Spinner;
