import React from 'react';
import {TypographyDTO} from './types';
import {ContainText} from './styles';

const Typography: React.FC<TypographyDTO> = props => {
  const {children} = props;
  return <ContainText {...props}>{children}</ContainText>;
};

export default Typography;
