import { useLayoutEffect, useRef } from 'react';

export type TweetLinkButtonProps = {
  text: string;
  hashTag?: string;
  url?: string;
};

const TweetLinkButton = ({ text, hashTag, url }: TweetLinkButtonProps) => {
  const tweetButtonEl = useRef<HTMLAnchorElement>(null);
  useLayoutEffect(() => {
    window.twttr?.widgets.load(tweetButtonEl.current);
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

export default TweetLinkButton;
