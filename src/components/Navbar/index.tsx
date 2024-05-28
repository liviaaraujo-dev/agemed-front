import React from 'react';
import { Container } from './styles';

interface NavBarProps {
  text: string;
}

const Navbar: React.FC<NavBarProps> = ({ text }) => {
  return (
    <Container>
      <p>{text}</p>
    </Container>
  );
}

export default Navbar;
