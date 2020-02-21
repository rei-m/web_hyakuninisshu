import React from 'react';
import Img from 'gatsby-image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MessagePageTemplate from '@src/components/templates/MessagePageTemplate';
import Block from '@src/components/atoms/Block';
import Txt from '@src/components/atoms/Txt';
import { useDogezaImage } from '@src/hooks/staticQueries/useDogezaImage';
import { ThemeInterface } from '@src/styles/theme';

const useStyles = makeStyles<ThemeInterface>(theme => ({
  container: {
    margin: '128px 0',
    padding: theme.spacing(2),
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <MessagePageTemplate>
      <Block className={classes.container}>
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
      </Block>
    </MessagePageTemplate>
  );
};

export default NotFound;
