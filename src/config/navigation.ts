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
    href: '/software/',
    label: 'Software',
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
