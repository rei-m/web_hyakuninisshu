import * as React from 'react';
import { GatsbyLinkProps, Link } from 'gatsby';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';
import CircleFrame from '@src/components/atoms/CircleFrame';
import Txt from '@src/components/atoms/Txt';
import Paragraph from '@src/components/atoms/Paragraph';
import { withRipple } from '@src/enhancers/withRipple';

export interface Props {
  to: string;
  icon: React.ReactElement<SvgIconProps>;
  name: string;
  description: string;
  className?: string;
}

const LinkWithRipple = withRipple<GatsbyLinkProps<{}>>(Link);

const Container = styled(Block)`
  border: 1px solid #00000030;
  background-color: #fff;
  border-radius: 16px;
  box-sizing: border-box;
  text-align: center;
  & :hover {
    text-decoration: none;
    background-color: #f5f5f5;
  }
`;

const IconWrapper = styled(CircleFrame)`
  width: 32px;
  height: 32px;
  border-color: #f1b400;
  color: #f1b400;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${({ theme }) => theme.spacingByPx(1)};
  left: ${({ theme }) => theme.spacingByPx(1)};

  & svg {
    font-size: inherit;
  }

  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    width: 124px;
    height: 124px;
    border-width: 4px;
    position: initial;
    font-size: 6rem;
    margin: 0 auto;
  }
`;

const Title = styled(Txt)`
  margin: ${({ theme }) => theme.spacingByPx(1)};
  position: relative;
  &:after {
    content: '';
    width: 100%;
    border-bottom: 4px double #a9a9a9;
    position: absolute;
    bottom: -8px;
    left: 0;
  }
`;

const Explain = styled(Paragraph)`
  margin-top: ${({ theme }) => theme.spacingByPx(3)};
`;

const linkStyles = {
  ':hover': {
    textDecoration: 'none',
  },
  display: 'inline-block',
  height: '100%',
  padding: '16px',
};

const MenuLink = ({ to, icon, name, description, className = '' }: Props) => (
  <Container className={className}>
    <LinkWithRipple to={to} style={linkStyles}>
      <IconWrapper>{icon}</IconWrapper>
      <Title tag={`div`} size={`ll`}>
        {name}
      </Title>
      <Explain size={`s`}>{description}</Explain>
    </LinkWithRipple>
  </Container>
);

export default MenuLink;
