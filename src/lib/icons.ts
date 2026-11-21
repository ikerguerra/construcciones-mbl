import arrowRight from 'lucide-static/icons/arrow-right.svg?raw';
import arrowUpRight from 'lucide-static/icons/arrow-up-right.svg?raw';
import award from 'lucide-static/icons/award.svg?raw';
import building2 from 'lucide-static/icons/building-2.svg?raw';
import calculator from 'lucide-static/icons/calculator.svg?raw';
import check from 'lucide-static/icons/check.svg?raw';
import chevronRight from 'lucide-static/icons/chevron-right.svg?raw';
import clock from 'lucide-static/icons/clock.svg?raw';
import compass from 'lucide-static/icons/compass.svg?raw';
import globe from 'lucide-static/icons/globe.svg?raw';
import mail from 'lucide-static/icons/mail.svg?raw';
import mapPin from 'lucide-static/icons/map-pin.svg?raw';
import menu from 'lucide-static/icons/menu.svg?raw';
import messageCircle from 'lucide-static/icons/message-circle.svg?raw';
import phone from 'lucide-static/icons/phone.svg?raw';
import search from 'lucide-static/icons/search.svg?raw';
import share2 from 'lucide-static/icons/share-2.svg?raw';
import shieldCheck from 'lucide-static/icons/shield-check.svg?raw';
import star from 'lucide-static/icons/star.svg?raw';
import xIcon from 'lucide-static/icons/x.svg?raw';

const RAW_ICONS = {
  'arrow-right': arrowRight,
  'arrow-up-right': arrowUpRight,
  award,
  'building-2': building2,
  calculator,
  check,
  'chevron-right': chevronRight,
  clock,
  compass,
  globe,
  mail,
  'map-pin': mapPin,
  menu,
  'message-circle': messageCircle,
  phone,
  search,
  'share-2': share2,
  'shield-check': shieldCheck,
  star,
  x: xIcon,
} as const;

export type IconName = keyof typeof RAW_ICONS;

function extractInnerSvg(raw: string): string {
  return raw
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/\s*\n\s*/g, '')
    .trim();
}

export const ICON_SYMBOLS_HTML = (Object.entries(RAW_ICONS) as [IconName, string][])
  .map(([name, svg]) => `<symbol id="i-${name}" viewBox="0 0 24 24">${extractInnerSvg(svg)}</symbol>`)
  .join('');
