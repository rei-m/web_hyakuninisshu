import Typography from '@mui/material/Typography';

import type { TypographyProps } from '@mui/material/Typography';

export type RatioProps = {
  denominator: number;
  numerator: number;
} & Omit<TypographyProps, 'children'>;

export const Ratio = (props: RatioProps) => (
  <Typography {...props}>{`${props.numerator} / ${props.denominator}`}</Typography>
);
