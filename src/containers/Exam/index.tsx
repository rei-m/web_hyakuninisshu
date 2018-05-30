import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ROUTE_PATHS } from '@src/constants';
import ExamMenuSection, {
  ExamMenuSectionProps
} from '@src/components/ExamMenuSection';

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
