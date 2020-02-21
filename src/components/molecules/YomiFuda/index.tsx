import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Block from '@src/components/atoms/Block';
import YomiFudaPhrase, { SPACE } from '@src/components/molecules/YomiFudaPhrase';
import { YomiFuda as YomiFudaType } from '@src/types';
import { ThemeInterface, SPACING_UNIT } from '@src/styles/theme';

type Size = 's' | 'm' | 'l';

const RATIO_L = 1.15;
const RATIO_M = 1.0;
const RATIO_S = 0.875;
const ratioMap = {
  s: RATIO_S,
  m: RATIO_M,
  l: RATIO_L,
};

export type Props = {
  yomiFuda: YomiFudaType;
  answered: boolean;
  duration: number;
  size?: Size;
  className?: string;
};

export type PresenterProps = {
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  duration: number;
  size?: Size;
  className?: string;
  onAnimationEnd: () => void;
};

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

const useStyles = makeStyles<ThemeInterface, Pick<Props, 'size'>>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorThin,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.dark,
    borderWidth: ({ size = 'm' }) => `${5 * ratioMap[size]}px`,
    borderRadius: 10,
    width: ({ size = 'm' }) => `${120 * ratioMap[size]}px`,
    height: ({ size = 'm' }) => `${205 * ratioMap[size]}px`,
    fontFamily: '"Sawarabi Mincho"',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  first: {},
  second: {
    paddingTop: ({ size = 'm' }) => `${SPACING_UNIT * 3 * ratioMap[size]}px`,
    marginLeft: ({ size = 'm' }) => `${SPACING_UNIT * ratioMap[size]}px`,
    marginRight: ({ size = 'm' }) => `${SPACING_UNIT * ratioMap[size]}px`,
  },
  third: {
    paddingTop: ({ size = 'm' }) => `${SPACING_UNIT * 6 * ratioMap[size]}px`,
  },
}));

const adjustDisplayText = (text: string, startIndex: number, currentPosition: number) => {
  if (currentPosition < startIndex) {
    return Array.from(Array(text.length).keys())
      .map(_ => SPACE)
      .join('');
  }
  const line = currentPosition > startIndex ? text.substr(0, currentPosition - startIndex) : '';
  const mod = text.length - (currentPosition - startIndex);
  const linePad =
    mod > 0
      ? Array.from(Array(mod).keys())
          .map(_ => SPACE)
          .join('')
      : '';
  return line + linePad;
};

export const YomiFudaPresenter = ({
  firstLine,
  secondLine,
  thirdLine,
  duration,
  size = 'l',
  className,
  onAnimationEnd,
}: PresenterProps) => {
  const classes = useStyles({ size });
  return (
    <Block className={clsx(classes.root, className)}>
      <Block className={classes.inner}>
        <YomiFudaPhrase
          text={firstLine}
          duration={duration}
          size={size}
          onAnimationEnd={onAnimationEnd}
          className={classes.first}
        />
        <YomiFudaPhrase
          text={secondLine}
          duration={duration}
          size={size}
          onAnimationEnd={onAnimationEnd}
          className={classes.second}
        />
        <YomiFudaPhrase
          text={thirdLine}
          duration={duration}
          size={size}
          onAnimationEnd={onAnimationEnd}
          className={classes.third}
        />
      </Block>
    </Block>
  );
};

export const YomiFudaContainer = ({
  yomiFuda,
  className = '',
  answered,
  duration,
  size,
  presenter,
}: ContainerProps) => {
  const { firstText, secondText, thirdText } = yomiFuda;
  const durationOrAnswered = answered ? 0 : duration;

  const [position, setPosition] = React.useState(
    duration === 0 ? firstText.length + secondText.length + thirdText.length : 1
  );

  const firstLine = adjustDisplayText(firstText, 0, position);
  const secondLine = adjustDisplayText(secondText, firstText.length, position);
  const thirdLine = adjustDisplayText(thirdText, firstText.length + secondText.length, position);

  const onAnimationEnd = () => {
    if (answered) {
      return;
    }
    setPosition(position + 1);
  };

  return presenter({
    firstLine,
    secondLine,
    thirdLine,
    duration: durationOrAnswered,
    size,
    className,
    onAnimationEnd,
  });
};

const YomiFuda = (props: Props) => <YomiFudaContainer presenter={YomiFudaPresenter} {...props} />;

export default YomiFuda;
