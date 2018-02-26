import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../PageTitle';

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
  box-sizing: border-box;
  padding: 16px;
`;

const Explain = styled.div`
  margin: 32px 16px;
`;

const StartButton = styled.button`
  margin-top: 32px;
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
