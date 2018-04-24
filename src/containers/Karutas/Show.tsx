import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GlobalState } from '@src/reducers';
import { AppError, AppErrorType } from '@src/errors';
import KarutaDetailSection, {
  KarutaDetailSectionProps
} from '@src/components/KarutaDetailSection';

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
