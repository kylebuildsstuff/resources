import styled from 'styled-components';

export const SidebarStyles = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: ${(props) => props.sidebarIsOpen ? '300px' : '50px'};
  height: 100vh;
  background: #ccff99;
`

export default SidebarStyles;
