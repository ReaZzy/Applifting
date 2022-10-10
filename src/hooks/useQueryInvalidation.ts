import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { shallowEqual } from 'react-redux';

export const useQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateQueriesByIdentifier = useCallback(
    async (identifier: Array<string>) => {
      await queryClient.invalidateQueries({
        predicate: (query) => shallowEqual(query.queryKey, identifier),
        inactive: true,
      });
    },
    [queryClient],
  );

  return {
    invalidateQueriesByIdentifier,
  };
};
