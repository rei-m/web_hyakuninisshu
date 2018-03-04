import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '../../styles';
import PageTitle from '../PageTitle';

export interface ExamMenuSectionProps {
  readonly onSubmit: () => void;
}

const RootSection = withAppTheme(styled.section)`
  max-width: 380px;
  margin: auto;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing2x};
`;

const Explain = withAppTheme(styled.div)`
  margin: ${({ theme }) => `${theme.spacing4x} ${theme.spacing2x}`};
`;

const StartButton = withAppTheme(styled.button)`
  margin-top: ${({ theme }) => theme.spacing4x};
`;

const ExamMenuSection = ({ onSubmit }: ExamMenuSectionProps) => (
  <RootSection>
    <PageTitle title="腕試し" />
    <div>
      <Explain>
        全百首からランダムに出題されます。<br />練習の成果を確認しましょう。
      </Explain>
      <StartButton
        type="submit"
        className="pt-button pt-intent-primary pt-large pt-icon-edit"
        onClick={onSubmit}
      >
        腕試しをはじめる
      </StartButton>
    </div>
  </RootSection>
);

export default ExamMenuSection;
