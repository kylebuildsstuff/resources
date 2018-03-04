import styled from 'styled-components';

// ||SIDEBAR|<----PAGE---->|
export const SidebarPageLayout = styled.div`
  display: flex;
  flex-direction: row;
  ${'' /* Select the direct second child of SidebarPageLayout */}
  & > :nth-child(2) {
    border: 2px solid blue;
    margin-left: 50px;
  }
`

export default SidebarPageLayout;
