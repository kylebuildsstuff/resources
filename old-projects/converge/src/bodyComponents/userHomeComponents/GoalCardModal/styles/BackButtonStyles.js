import styled from 'styled-components';

export const BackButtonStyles = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  color: #a6a6a6;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;

  user-select: none;

  &:hover {
    color: #8c8c8c;
    cursor: pointer;
  }

  &:active {
    color: #737373;
  }
`

export default BackButtonStyles;
