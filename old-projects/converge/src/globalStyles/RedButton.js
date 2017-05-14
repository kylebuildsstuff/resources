import styled from 'styled-components';
import Button from './Button';

export const RedButton = styled(Button)`
  background: #ff0000;
  border: 2px solid #ff0000;

  &:hover {
    border: 2px solid #cc0000;
    background: #cc0000;
    cursor: pointer;
  }

  &:active {
    border: 2px solid #990000;
    background: #990000;
  }
`

export default RedButton;
