import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import MessagePageTemplate from '@src/presentation/components/templates/MessagePageTemplate';
import Txt from '@src/presentation/components/atoms/Txt';
import { useDogezaImage } from '@src/presentation/hooks/static-queries/useDogezaImage';
import { AppError } from '@src/presentation/types';

export type Props = {
  error: Error;
};

export const UNKNOWN_MESSAGE = '予期せぬエラーが発生しました。時間をおいて再度お試しください。';

const UnhandledErrorPage = ({ error }: Props) => {
  return (
    <MessagePageTemplate>
      <Txt size={`l`}>{error instanceof AppError ? error.message : UNKNOWN_MESSAGE}</Txt>
      <GatsbyImage
        image={useDogezaImage()}
        style={{
          width: 200,
          marginTop: '32px',
        }}
        alt={`エラーが起きました`}
      />
    </MessagePageTemplate>
  );
};

export default UnhandledErrorPage;
