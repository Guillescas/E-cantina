import { ReactElement, ReactNode } from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
  children: ReactNode;
}

const Tooltip = ({
  title,
  className,
  children,
}: TooltipProps): ReactElement => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
