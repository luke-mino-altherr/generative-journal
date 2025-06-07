export const colors = {
  background: {
    dark: '#1b1b1b',
    light: '#f7f7f6',
  },
  text: {
    dark: '#f2f2f2', // soft white for dark mode
    light: '#1f1f1f', // dark gray for light mode
  },
} as const;

export const hexToGrayscale = (hex: string): number => {
  // Remove the # if present
  const cleanHex = hex.replace('#', '');
  // Convert hex to RGB - for grayscale we only need one channel since r=g=b
  return parseInt(cleanHex.substring(0, 2), 16);
};
