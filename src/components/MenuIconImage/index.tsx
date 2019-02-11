import * as React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SettingsIcon from '@material-ui/icons/Settings';
import { MenuType } from '@src/enums';

export interface Props {
  iconType: MenuType;
  fontSize?: number | string;
}

const MenuIconImage: React.FC<Props> = ({ iconType, fontSize }) => {
  switch (iconType) {
    case MenuType.Training:
      return <CreateIcon style={{ fontSize: fontSize }} />;
    case MenuType.Exam:
      return <NoteIcon style={{ fontSize: fontSize }} />;
    case MenuType.Material:
      return <LibraryBooksIcon style={{ fontSize: fontSize }} />;
    case MenuType.Other:
      return <SettingsIcon style={{ fontSize: fontSize }} />;
  }
};

export default MenuIconImage;
