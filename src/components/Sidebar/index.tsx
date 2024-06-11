import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyBlurContainer, BodyContainer, BodyNoBlurContainer, Container, LinkContainer, LinksContainer, StyledText, TextContainer } from './styles';
import logo from '../../assets/logo.png'

interface SidebarProps {
  asideData: { redirectTo: string; icon: React.ReactNode; label: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ asideData }) => {
  const navigate = useNavigate();

  function goToPath(path: string) {
    if (path) navigate(path);
  }

  return (
    <Container>
      <BodyBlurContainer />
      <BodyNoBlurContainer>
        <BodyContainer>
          <TextContainer>
            {/* <StyledText className="text-center font-caveat text-5xl font-bold">AgeMed</StyledText> */}
          </TextContainer>
          
          <a href='/home'>
            <img src={logo} width={150} className='ml-6 mt-6' />
          </a>

          <LinksContainer>
            {asideData.map((v, i) => (
              <LinkContainer key={i} onClick={() => goToPath(v.redirectTo)}>
                {v.icon}
                <p>{v.label}</p>
              </LinkContainer>
            ))}
          </LinksContainer>
        </BodyContainer>
      </BodyNoBlurContainer>
    </Container>
  );
}

export default Sidebar;
