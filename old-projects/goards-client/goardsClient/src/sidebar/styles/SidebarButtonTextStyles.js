import styled from 'styled-components';

export const SidebarButtonTextStyles = styled.div`
  display: ${(props) => props.sidebarIsOpen ? 'inline-block' : 'none'};
`

export default SidebarButtonTextStyles;
