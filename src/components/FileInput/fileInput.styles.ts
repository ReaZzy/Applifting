import { ButtonWrapper } from '@src/components/Button/button.styles';
import styled from 'styled-components';

export const HiddenInput = styled.input.attrs({
  type: 'file',
})`
  display: none;
`;

export const FileInputLabel = styled(ButtonWrapper).attrs({ as: 'label' })``;
