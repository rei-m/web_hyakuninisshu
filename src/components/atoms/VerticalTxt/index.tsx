import Typography, { type TypographyProps } from '@mui/material/Typography';

export type VerticalTxtProps = Omit<TypographyProps, 'fontSize'> & Required<Pick<TypographyProps, 'fontSize'>>;

const VerticalTxt = (props: VerticalTxtProps) => (
  <Typography
    {...props}
    sx={[
      { display: 'inline-block', width: props.fontSize, lineHeight: 1.05 },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  >
    {props.children}
  </Typography>
);

export default VerticalTxt;
