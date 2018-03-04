import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ExamMenuSection, {
  ExamMenuSectionProps
} from '../../components/ExamMenuSection';
import { ROUTE_PATHS } from '../../constants';

export type ExamDispatchProps = Pick<ExamMenuSectionProps, 'onSubmit'>;

const Exam = ({ history }: RouteComponentProps<{}>) => {
  const onSubmit = () => {
    history.push(ROUTE_PATHS.EXAM_QUESTION, {
      submitTime: new Date().getTime()
    });
  };

  return <ExamMenuSection onSubmit={onSubmit} />;
};

export default withRouter(Exam);
