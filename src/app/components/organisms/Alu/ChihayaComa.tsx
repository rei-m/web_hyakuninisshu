'use client';

import { CHIHAYA_COMA_LIST } from './coma';

const THRESHOLD = 0.5;

// 超手抜き
export const ChihayaComa =
  process.env.NODE_ENV === 'production'
    ? () => {
        const idx = new Date().getTime() % CHIHAYA_COMA_LIST.length;
        const data = CHIHAYA_COMA_LIST[idx];
        return (
          <>
            <style
              scoped
              dangerouslySetInnerHTML={{
                __html: `
.alu-embed-iframe-${data.id} {
  width: ${data.width * THRESHOLD}px;
  height: ${data.height * THRESHOLD}px;
}
@media screen and (max-width: ${480 * THRESHOLD}px) {
  .alu-embed-iframe-${data.id} {
    width: ${data.spWidth * THRESHOLD}px;
    height: ${data.spHeight * THRESHOLD}px;
  }
}
`,
              }}
            />
            <iframe
              scrolling="no"
              className={`alu-embed-iframe-${data.id}`}
              src={`${data.src}?referer=oembed`}
              style={{
                margin: 'auto',
                display: 'block',
                borderWidth: 0,
              }}
            ></iframe>
            <div
              className="alu-embed"
              style={{
                maxWidth: data.maxWidth * THRESHOLD,
                textAlign: 'right',
                margin: '0 auto',
              }}
            >
              <a
                href={data.src}
                target="_blank"
                style={{
                  margin: '0 auto !important',
                  display: 'inline-block',
                  paddingTop: 10,
                  fontSize: '12px',
                  color: '#787c7b',
                  textDecoration: 'none',
                  textAlign: 'right',
                }}
              >
                ちはやふる / alu.jp
              </a>
            </div>
          </>
        );
      }
    : () => <></>;
