import Typography, { type TypographyProps } from '@mui/material/Typography';

export type RatioProps = {
  denominator: number;
  numerator: number;
} & Omit<TypographyProps, 'children'>;

const Ratio = (props: RatioProps) => <Typography {...props}>{`${props.numerator} / ${props.denominator}`}</Typography>;

export default Ratio;
