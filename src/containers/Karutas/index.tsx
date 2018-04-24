import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../../reducers/index';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import KarutaListSection, {
  KarutaListSectionProps
} from '../../components/KarutaListSection';

export type KarutasConnectedProps = Pick<KarutaListSectionProps, 'karutas'>;

export type KarutasDispatchProps = Pick<
  KarutaListSectionProps,
  'onClickKarutaListRow'
>;

const mapStateToProps = ({
  karutasState
}: GlobalState): KarutasConnectedProps => ({
  karutas: karutasState.karutas
});

const mapDispatchToProps = (
  _dispatch: Dispatch<GlobalState>,
  { history }: RouteComponentProps<{}>
): KarutasDispatchProps => ({
  onClickKarutaListRow: (karuatId: number) => {
    history.push(`/karutas/${karuatId}`);
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(KarutaListSection)
);
