import Image from 'next/image';
import colorModeSvg from './colorModeIcon.svg';

export function ColorModeIcon() {
  console.log('Is ColorModeIcon a RSC?');
  return <Image src={colorModeSvg} alt="Color Mode Icon" className="mr-2 h-6 w-6" />;
}
