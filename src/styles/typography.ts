import Typography from 'typography';

const typography = new Typography({
  bodyFontFamily: ['Raleway', 'Hiragino Kaku Gothic ProN', 'Meiryo', 'sans-serif'],
  overrideStyles: (_verticalRhythm, _options) => ({
    html: {
      fontSize: '62.5%',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      fontSize: '1.4rem',
      textAlign: 'center',
    },
  }),
});

export default typography;
