import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Heading } from '@/app/components/atoms/Heading';
import { BackButton } from './BackButton';
import { SearchButton } from './SearchButton';

export type HeaderProps = {
  title: string;
  backUrl?: string;
  isDisplaySearch?: boolean;
};

export const Header = (props: HeaderProps) => (
  <AppBar elevation={1} sx={{ zIndex: 3 }}>
    <Toolbar>
      {!!props.backUrl && <BackButton backUrl={props.backUrl} />}
      <Heading level={1} sx={{ flexGrow: 1, color: 'common.white', fontWeight: 700 }}>
        {props.title}
      </Heading>
      {props.isDisplaySearch && <SearchButton />}
    </Toolbar>
  </AppBar>
);
