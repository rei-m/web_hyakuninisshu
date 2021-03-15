import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MessagePageTemplate from '@src/presentation/components/templates/MessagePageTemplate';
import Block from '@src/presentation/components/atoms/Block';
import Txt from '@src/presentation/components/atoms/Txt';
import { useDogezaImage } from '@src/presentation/hooks/static-queries/useDogezaImage';
import { ThemeInterface } from '@src/presentation/styles/theme';

const useStyles = makeStyles<ThemeInterface>((theme) => ({
  container: {
    margin: '128px 0',
    padding: theme.spacing(2),
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <MessagePageTemplate>
      <Block className={classes.container}>
        <Txt size={`l`}>
          ページが見つかりませんでした。
          <br />
          トップページにお戻りください。
        </Txt>
        <GatsbyImage
          image={useDogezaImage()}
          style={{
            marginTop: '32px',
          }}
          alt={`ページが見つかりませんでした`}
        />
      </Block>
    </MessagePageTemplate>
  );
};

export default NotFoundPage;
