import * as React from 'react';

export interface Props {
  text: string;
  url?: string;
}

const TweetButton: React.FC<Props> = ({ text, url }) => {
  // tslint:disable-next-line:no-null-keyword
  const tweetButtonEl = React.useRef<HTMLAnchorElement>(null);
  React.useEffect(() => {
    window.twttr.widgets.load(tweetButtonEl.current);
  });

  return (
    <a
      ref={tweetButtonEl}
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
};

export default TweetButton;
