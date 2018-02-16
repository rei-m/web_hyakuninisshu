import { connect } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import KarutaCard, { KarutaCardProps } from '../../components/KarutaCard';

const mapStateToProps = (
  { karutasState }: GlobalState,
  { match }: RouteComponentProps<{ id: number }>
): KarutaCardProps => {
  return {
    karuta: karutasState.karutas[match.params.id - 1]
  };
};

export default withRouter(connect(mapStateToProps)(KarutaCard));
