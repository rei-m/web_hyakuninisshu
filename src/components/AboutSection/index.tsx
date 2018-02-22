import * as React from 'react';

const AboutSection = () => {
  return (
    <section>
      <article>
        <h2>サイトについて</h2>
        <div>
          このサイトは百人一首を覚えるためのサイトです。4択のクイズ形式で繰り返し練習することで効率よく百人一首を覚えることが出来ます。
        </div>
      </article>
      <article>
        <h2>使い方について</h2>
        <div>
          練習では様々な条件を組み合わせて出題範囲を指定できます。ご自身の習熟度に合わせて効率よく練習できます。
          もう全部覚えたという方は腕試しに挑戦しましょう。百首通しでランダムに出題されます。
          資料は百人一首の詳細な情報を閲覧できます。決まり字や歌の現代語訳などを確認することができます。
        </div>
      </article>
      <article>
        <h2>アプリ版について</h2>
        <div>
          Androidのみリリースしています。こちらは一旦インストールしていただけばオフラインでも使えます。iOS版は未定ですが、要望があればがんばります。
        </div>
        <a href="https://play.google.com/store/apps/details?id=me.rei_m.hyakuninisshu&hl=ja&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
          <img
            alt="Google Play で手に入れよう"
            src="https://play.google.com/intl/en_us/badges/images/generic/ja_badge_web_generic.png"
            style={{
              width: 200
            }}
          />
        </a>
      </article>
      <article>
        <h2>運営者</h2>
        <div>
          当サイトは
          <a href="https://twitter.com/rei_m" target="_blank">
            @rei_m
          </a>
          が個人で運営しています。不具合や要望等あればTwitterまでご連絡ください。
          アプリのレビューで読み上げ機能が欲しいというお声をいただくのですが、使えるいい音源があれば搭載します。
        </div>
      </article>
    </section>
  );
};

export default AboutSection;
