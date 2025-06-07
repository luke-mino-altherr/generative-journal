import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faSoundcloud,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

export interface SocialLink {
  href: string;
  icon: IconDefinition;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    href: 'https://www.linkedin.com/in/luke-mino-altherr/',
    icon: faLinkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://github.com/luke-mino-altherr',
    icon: faGithub,
    label: 'GitHub',
  },
  {
    href: 'https://soundcloud.com/minalt',
    icon: faSoundcloud,
    label: 'SoundCloud',
  },
  {
    href: 'https://www.instagram.com/lminalt/',
    icon: faInstagram,
    label: 'Instagram',
  },
  {
    href: 'mailto:lminoaltherr@gmail.com',
    icon: faEnvelope,
    label: 'Email',
  },
];
