import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import KarutaListSection, {
  KarutaListSectionConnectedProps,
  KarutaListSectionDispatchProps
} from '../../components/KarutaListSection';

const mapStateToProps = ({
  karutasState
}: GlobalState): KarutaListSectionConnectedProps => {
  return {
    karutas: karutasState.karutas
  };
};

const mapDispatchToProps = (
  _dispatch: Dispatch<GlobalState>,
  { history }: RouteComponentProps<{}>
): KarutaListSectionDispatchProps => {
  return {
    onClickKarutaListRow: (karuatId: number) => {
      history.push(`/karutas/${karuatId}`);
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KarutaListSection)
);
