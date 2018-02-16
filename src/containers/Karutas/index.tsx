import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import KarutaList, {
  KarutaListConnectedProps,
  KarutaListDispatchProps
} from '../../components/KarutaList';

const mapStateToProps = ({
  karutasState
}: GlobalState): KarutaListConnectedProps => {
  return {
    karutas: karutasState.karutas
  };
};

const mapDispatchToProps = (
  _dispatch: Dispatch<GlobalState>,
  { history }: RouteComponentProps<{}>
): KarutaListDispatchProps => {
  return {
    onClickRow: (karuatId: number) => {
      history.push(`/karutas/${karuatId}`);
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KarutaList)
);
