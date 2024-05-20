import React, { ReactNode } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { BodyContainer, Container, SidebarContainer } from './styles';

interface LayoutProps {
  asideData: any; // Tipo para os dados da barra lateral
  navbarText: string; // Tipo para o texto da barra de navegação
  children: ReactNode; // Tipo para os elementos filhos
}

const DefaultLayout: React.FC<LayoutProps> = ({ asideData, navbarText, children }) => (
  <Container>
    <SidebarContainer>
      <Sidebar asideData={asideData} />
    </SidebarContainer>
    <BodyContainer>
      <Navbar text={navbarText} />
      {children}
    </BodyContainer>
  </Container>
)

export default DefaultLayout;
