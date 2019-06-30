import * as React from 'react';
import Img from 'gatsby-image';
import styled from '@src/styles/styled-components';
import MessagePageTemplate from '@src/components/templates/MessagePageTemplate';
import Block from '@src/components/atoms/Block';
import Txt from '@src/components/atoms/Txt';
import { useDogezaImage } from '@src/hooks/staticQueries/useDogezaImage';

const Container = styled(Block)`
  margin: 128px 0;
  padding: ${({ theme }) => theme.spacingByPx(2)};
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
        fluid={useDogezaImage()}
        style={{
          marginTop: '32px',
        }}
        alt={`ページが見つかりませんでした`}
      />
    </Container>
  </MessagePageTemplate>
);

export default NotFound;
