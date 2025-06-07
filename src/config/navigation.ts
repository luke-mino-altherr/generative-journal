export interface NavItem {
  href: string;
  label: string;
}

export const navigationItems: NavItem[] = [
  {
    href: '/',
    label: 'About',
  },
  {
    href: '/music/',
    label: 'Music',
  },
  {
    href: '/drawings/',
    label: 'Drawings',
  },
];
