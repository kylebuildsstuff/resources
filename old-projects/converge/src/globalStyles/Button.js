import styled from 'styled-components';

export const Button = styled.div`
  display: inline-block;
  background: ${props => props.background ? props.background : '#00cc00'};
  color: ${props => props.primary ? 'white' : 'white'};
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #00cc00;
  border-radius: 3px;
  user-select: none;

  &:hover {
    border: 2px solid #009900;
    background: #009900;
    cursor: pointer;
  }

  &:active {
    border: 2px solid #006600;
    background: #006600;
  }
`

export default Button;
