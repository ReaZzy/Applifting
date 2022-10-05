import React, { Suspense } from 'react';
import Spinner from '@src/components/Spinner/Spinner';

const withSuspense =
  <TProps extends Record<string, unknown>>(
    Component: React.ComponentType<TProps>,
  ) =>
  (props: TProps): React.ReactElement => {
    return (
      <Suspense fallback={<Spinner />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default withSuspense;
