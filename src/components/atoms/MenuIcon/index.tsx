import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SettingsIcon from '@material-ui/icons/Settings';
import { MenuType } from '@src/enums';

export const TrainingIcon = CreateIcon;
export const ExamIcon = NoteIcon;
export const MaterialIcon = LibraryBooksIcon;
export const OtherIcon = SettingsIcon;

export const menuIcon = (iconType: MenuType) => {
  switch (iconType) {
    case MenuType.Training:
      return TrainingIcon;
    case MenuType.Exam:
      return ExamIcon;
    case MenuType.Material:
      return MaterialIcon;
    case MenuType.Other:
      return OtherIcon;
  }
};
