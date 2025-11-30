
import { ReactElement } from 'react';

interface IProps{
    children: ReactElement;
    isTrue: boolean;
}
const RenderIf = ({ children, isTrue }: IProps): ReactElement | null => {
  return isTrue ? children : null;
};

export default RenderIf;
