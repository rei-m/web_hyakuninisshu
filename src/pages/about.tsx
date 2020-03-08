import React from 'react';
import { RouteComponentProps } from '@reach/router';
import AboutPage from '@src/presentation/components/pages/about';

export type Props = RouteComponentProps;

const AboutGatsbyPage = ({ navigate }: Props) => {
  return <AboutPage navigate={navigate} />;
};

export default AboutGatsbyPage;
