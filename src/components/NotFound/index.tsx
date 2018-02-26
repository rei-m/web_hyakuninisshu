import * as React from 'react';
import styled from 'styled-components';
import * as dogeza from './dogeza_businessman.png';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffff0;
  flex-direction: column;
  box-sizing: border-box;
  min-height: calc(100vh - 56px);

  @media screen and (min-width: 768px) {
    min-height: calc(100vh - 64px);
  }
`;

const Message = styled.div`
  font-size: 1.8rem;
`;

const DogezaImg = styled.img`
  margin-top: 32px;
  width: 200px;
`;

const NotFound = () => {
  return (
    <Root>
      <Message>
        ページが見つかりませんでした。<br />トップページにお戻りください。
      </Message>
      <DogezaImg src={dogeza} alt="ページが見つかりませでした" />
    </Root>
  );
};

export default NotFound;
