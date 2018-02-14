import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import SectionTitle from '../SectionTitle';

const RootSection = styled.section`
  max-width: 380px;
  margin: auto;
`;

const Explain = styled.div`
  margin: 16px;
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
    <SectionTitle title="腕試し" />
    <Explain>
      全百首から出題されます。出題順は毎回変わります。<br />練習の成果を確認しましょう。
    </Explain>
    <StartButton
      type="submit"
      className="pt-button pt-intent-primary pt-large pt-icon-edit"
      onClick={handleSubmit(props)}
    >
      腕試しをはじめる
    </StartButton>
  </RootSection>
);

export default withRouter(ExamMenuSection);
