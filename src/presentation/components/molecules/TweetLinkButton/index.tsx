import React, { useLayoutEffect, useRef } from 'react';

export type Props = {
  text: string;
  hashTag?: string;
  url?: string;
};

const TweetButton = ({ text, hashTag, url }: Props) => {
  // tslint:disable-next-line:no-null-keyword
  const tweetButtonEl = useRef<HTMLAnchorElement>(null);
  useLayoutEffect(() => {
    window.twttr.widgets.load(tweetButtonEl.current);
  }, []);

  return (
    <a
      ref={tweetButtonEl}
      href="https://twitter.com/share"
      className="twitter-share-button"
      data-text={text}
      data-size="large"
      data-url={url ? url : 'https://hyakuninanki.net'}
      data-show-count="false"
      data-hashtags={[hashTag]}
    >
      Tweet
    </a>
  );
};

export default TweetButton;
