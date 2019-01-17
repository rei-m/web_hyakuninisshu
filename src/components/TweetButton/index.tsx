import * as React from 'react';

interface TweetButtonProps {
  text: string;
  url?: string;
}

class TweetButton extends React.Component<TweetButtonProps> {
  public componentDidMount() {
    window.twttr.widgets.load(this.refs.tweetButton);
  }

  public render() {
    const { text, url } = this.props;
    return (
      <a
        // tslint:disable-next-line:jsx-no-string-ref
        ref="tweetButton"
        href="https://twitter.com/share"
        className="twitter-share-button"
        data-text={text}
        data-size="large"
        data-url={url ? url : 'https://hyakuninanki.net'}
        data-show-count="false"
      >
        Tweet
      </a>
    );
  }
}

export default TweetButton;
