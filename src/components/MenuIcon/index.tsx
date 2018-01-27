import * as React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  padding: 16px;
`;

const Icon = styled.i`
  width: 150px;
  height: 150px;
  margin-bottom: 30px;
  border: 4px solid;
  border-radius: 50%;
  color: #f1b400;
  font-size: 6rem;
  line-height: 142px;
  text-align: center;
`;

export enum IconType {
  Training,
  Exam,
  Material
}

export interface MenuIconProps {
  readonly iconType: IconType;
}

interface Value {
  readonly icon: string;
  readonly title: string;
  readonly explain: string;
}

const TRAINING_VALUE: Value = {
  icon: 'create',
  title: '練習',
  explain: '説明',
};

const EXAM_VALUE: Value = {
  icon: 'note',
  title: '力試し',
  explain: '説明',
};

const MATERIAL_VALUE: Value = {
  icon: 'library_books',
  title: '資料',
  explain: '説明',
};

const iconTypeToValue = (iconType: IconType) => {
  switch(iconType) {
    case IconType.Training:
      return TRAINING_VALUE;
    case IconType.Exam:
      return EXAM_VALUE;
    case IconType.Material:
      return MATERIAL_VALUE;
    default:
      throw new Error('unknown TypeName');
  }
};

const MenuIcon = (props: MenuIconProps) => {
  const value = iconTypeToValue(props.iconType);
  return (
    <Root>
      <Icon className="material-icons">{value.icon}</Icon>
      <div>{value.title}</div>
      <p>{value.explain}</p>
    </Root>
  );
}

export default MenuIcon;
