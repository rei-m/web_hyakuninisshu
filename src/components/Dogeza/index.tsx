import * as React from 'react';
import styled from 'styled-components';
import * as dogeza from './dogeza_businessman.png';

const DogezaImg = styled.img`
  width: 200px;
`;

const Dogeza: React.SFC<React.ImgHTMLAttributes<{}>> = ({ alt, style }) => (
  <DogezaImg src={dogeza} alt={alt} style={style} />
);

export default Dogeza;
