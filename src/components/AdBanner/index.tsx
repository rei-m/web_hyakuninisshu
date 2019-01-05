import * as React from 'react';
import AdSense from 'react-adsense';

const AdBanner: React.FC<{}> = () => (
  <AdSense.Google
    client="ca-pub-4104372369598017"
    slot="9171068817"
    style={{ display: 'block' }}
    format="auto"
    responsive="true"
  />
);

export default AdBanner;
