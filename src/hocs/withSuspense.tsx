import React, { Suspense } from 'react';

const withSuspense =
  <TProps extends Record<string, unknown>>(
    Component: React.ComponentType<TProps>,
  ) =>
  (props: TProps): React.ReactElement => {
    return (
      <Suspense fallback="Loading ...">
        <Component {...props} />
      </Suspense>
    );
  };

export default withSuspense;
