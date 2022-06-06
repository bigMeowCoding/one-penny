import { FC, SVGAttributes } from 'react';
import './importAllIcons';
import './icon.scss';
interface Props extends SVGAttributes<SVGElement> {
  name: string;
}
declare const Icon: FC<Props>;
export default Icon;
