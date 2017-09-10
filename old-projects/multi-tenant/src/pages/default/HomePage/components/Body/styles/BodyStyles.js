import styled from 'styled-components';

export const BodyStyles = styled.div`
  display: flex;
  justify-content: center;
  background: ${props => props.theme.primaryColor};
  padding: 40px;
`

export default BodyStyles;
