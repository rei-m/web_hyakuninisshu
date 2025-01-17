import type { Metadata } from 'next';

import AboutClientPage from '../components/pages/about';

export const metadata: Metadata = {
  title: `百人一首 - サイトについて -`,
};

const AboutPage = () => <AboutClientPage />;

export default AboutPage;
