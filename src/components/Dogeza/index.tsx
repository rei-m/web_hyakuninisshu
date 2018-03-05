import * as React from 'react';
import styled from 'styled-components';
import * as dogeza from './dogeza_businessman.png';

export interface DogezaProps {
  alt: string;
}

const DogezaImg = styled.img`
  width: 200px;
`;

const Dogeza = ({ alt, style }: React.ImgHTMLAttributes<{}>) => (
  <DogezaImg src={dogeza} alt={alt} style={style} />
);

export default Dogeza;
