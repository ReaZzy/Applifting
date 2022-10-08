import styled from 'styled-components';

export const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.common * 3}px;
`;

export const LoginFormInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.common * 2}px;
`;

export const LoginFormButtonWrapper = styled.div`
  max-width: max-content;
  margin-left: auto;
`;
