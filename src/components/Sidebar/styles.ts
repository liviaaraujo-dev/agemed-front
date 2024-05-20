import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #00000020;
`;

export const StyledText = styled.p`
  padding-left: 0px;
`;

export const BodyBlurContainer = styled.div`
  position: absolute;
  background-color: #00000020;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  height: 100%;
  width: 100%;
  z-index: 1;
`;

export const BodyNoBlurContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

export const LinksContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 2px;
`;

export const TextContainer = styled.div`
  padding-left: 20px;
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding-left: 20px;

  :hover{
    background: #FFFFFF33;
    border-left: 2px solid white;
  }
`;

