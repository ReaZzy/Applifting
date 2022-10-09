import styled from 'styled-components';

export const CreateNewArticleFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.common * 5}px;
`;
