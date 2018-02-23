import { connect } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import KarutaDetailSection, {
  KarutaDetailSectionProps
} from '../../components/KarutaDetailSection';

const mapStateToProps = (
  { karutasState }: GlobalState,
  { match }: RouteComponentProps<{ id: number }>
): KarutaDetailSectionProps => {
  return {
    karuta: karutasState.karutas[match.params.id - 1]
  };
};

export default withRouter(connect(mapStateToProps)(KarutaDetailSection));
