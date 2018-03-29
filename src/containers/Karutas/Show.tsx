import { connect } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import KarutaDetailSection, {
  KarutaDetailSectionProps
} from '../../components/KarutaDetailSection';
import { AppError, AppErrorType } from '../../errors';

const mapStateToProps = (
  { karutasState }: GlobalState,
  { match }: RouteComponentProps<{ id: number }>
): KarutaDetailSectionProps => {
  const karuta = karutasState.karutas[match.params.id - 1];
  if (!karuta) {
    throw new AppError(
      '指定された番号のかるたは存在しません',
      AppErrorType.NotFound
    );
  }

  return {
    karuta
  };
};

export default withRouter(connect(mapStateToProps)(KarutaDetailSection));
