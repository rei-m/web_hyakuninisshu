import * as React from 'react';
import styled from '@src/styles/styled-components';
import Layout from '@src/components/Layout';
import SEO from '@src/components/SEO';
import ErrorBoundary from '@src/components/ErrorBoundary';
import KarutaCard from '@src/components/KarutaCard';
import { GeneratedPageComponentProps, Karuta } from '@src/types';
import { toKarutaNoString } from '@src/utils';
import { MenuType } from '@src/enums';

type Props = GeneratedPageComponentProps<{ karuta: Karuta }>;

const Container = styled.div`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing2x};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 24px;
`;

const KarutasPageTemplate: React.FC<Props> = ({ pageContext }) => {
  const { karuta } = pageContext;
  const karutaNoString = toKarutaNoString(karuta.no);
  const title = `百人一首 - ${karutaNoString} -`;
  const description = `百人一首の${karutaNoString}の歌のページです。作者は${
    karuta.creator
  }です。百人一首の暗記を練習できます。百人一首の札の画像や現代語訳も載せています。百人一首の歌の意味に触れながら楽しく覚えましょう。`;
  const onClickBack = () => {
    window.history.back();
  };

  return (
    <ErrorBoundary>
      <Layout
        title={title}
        canBack={true}
        isDisplayNav={true}
        currentMenuType={MenuType.Material}
        onClickBack={onClickBack}
      >
        <SEO
          title={title}
          keywords={[
            `百人一首`,
            karutaNoString,
            karuta.creator,
            `小倉百人一首`,
            `歌`,
            `一覧`,
            `意味`,
            `歌番号`,
            `暗記`,
            `練習`,
          ]}
          description={description}
        />
        <Container>
          <KarutaCard karuta={karuta} />
        </Container>
      </Layout>
    </ErrorBoundary>
  );
};

export default KarutasPageTemplate;
