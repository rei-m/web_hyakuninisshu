import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { withTheme } from '../../styles';
import PageTitle from '../PageTitle';

const RootSection = withTheme(styled.section)`
  max-width: 380px;
  margin: auto;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing2x};
`;

const Explain = withTheme(styled.div)`
  margin: ${({ theme }) => `${theme.spacing4x} ${theme.spacing2x}`};
`;

const StartButton = withTheme(styled.button)`
  margin-top: ${({ theme }) => theme.spacing4x};
`;

const handleSubmit = ({ history }: RouteComponentProps<{}>) => {
  return (_e: React.SyntheticEvent<HTMLButtonElement>) => {
    history.push('/exam/question', {
      submitTime: new Date().getTime()
    });
  };
};

const ExamMenuSection = (props: RouteComponentProps<{}>) => (
  <RootSection>
    <PageTitle title="腕試し" />
    <div>
      <Explain>
        全百首からランダムに出題されます。<br />練習の成果を確認しましょう。
      </Explain>
      <StartButton
        type="submit"
        className="pt-button pt-intent-primary pt-large pt-icon-edit"
        onClick={handleSubmit(props)}
      >
        腕試しをはじめる
      </StartButton>
    </div>
  </RootSection>
);

export default withRouter(ExamMenuSection);
