import * as React from 'react';
import Img from 'gatsby-image';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';
import MessagePageTemplate from '@src/components/templates/MessagePageTemplate';
import Block from '@src/components/atoms/Block';
import Txt from '@src/components/atoms/Txt';
import { useAppContext } from '@src/hooks/useAppContext';

const Container = styled(Block)`
  margin: 128px 0;
  padding: ${({ theme }) => theme.spacing2x};
`;

const NotFound = () => (
  <MessagePageTemplate>
    <Container>
      <Txt size={`l`}>
        ページが見つかりませんでした。
        <br />
        トップページにお戻りください。
      </Txt>
      <Img
        fluid={useAppContext().useDogezaImage()}
        style={{
          marginTop: appTheme.spacing4x,
        }}
        alt={`ページが見つかりませんでした`}
      />
    </Container>
  </MessagePageTemplate>
);

export default NotFound;
