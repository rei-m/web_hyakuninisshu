import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GlobalState } from '@src/reducers';
import KarutaListSection, {
  KarutaListSectionProps
} from '@src/components/KarutaListSection';

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
