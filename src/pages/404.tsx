import * as React from 'react';
import Img from 'gatsby-image';
import { appTheme } from '@src/styles/theme';
import MessagePageTemplate from '@src/components/templates/MessagePageTemplate';
import Txt from '@src/components/atoms/Txt';
import { useAppContext } from '@src/hooks/useAppContext';

const NotFound = () => (
  <MessagePageTemplate>
    <Txt size={`l`}>
      ページが見つかりませんでした。
      <br />
      トップページにお戻りください。
    </Txt>
    <Img
      fluid={useAppContext().useDogezaImage()}
      style={{
        width: 200,
        marginTop: appTheme.spacing4x,
      }}
      alt={`ページが見つかりませんでした`}
    />
  </MessagePageTemplate>
);

export default NotFound;
