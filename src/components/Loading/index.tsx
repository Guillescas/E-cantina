import { ReactElement } from 'react';

import { StylesContainer } from './styles';

const Loading = (): ReactElement => {
  return (
    <StylesContainer>
      <div className="sk-chase">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
    </StylesContainer>
  );
};

export default Loading;
