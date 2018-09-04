import * as React from 'react';
import styled from 'styled-components';
import { withAppTheme } from '@src/styles';
import PageTitle from '@src/components/PageTitle';

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
  background-color: ${({ theme }) => theme.colorAccent} !important;
  &:active {
    background-color: ${({ theme }) => theme.colorAccentActive} !important;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colorAccentHover} !important;
  }
`;

const ExamMenuSection: React.SFC<ExamMenuSectionProps> = ({ onSubmit }) => (
  <RootSection>
    <PageTitle title="腕試し" />
    <div>
      <Explain>
        全百首からランダムに出題されます。
        <br />
        練習の成果を確認しましょう。
      </Explain>
      <StartButton
        type="submit"
        className="pt-button pt-intent-primary pt-large pt-icon-edit"
        onClick={onSubmit}
        data-test="start-exam-button"
      >
        腕試しをはじめる
      </StartButton>
    </div>
  </RootSection>
);

export default ExamMenuSection;
