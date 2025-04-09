import { dark } from '@clerk/themes';

function isDarkMode(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

export function useClerkAppearance() {
  if (isDarkMode())
    return {
      baseTheme: [dark],
      variables: {
        colorPrimary: 'hsl(217.2 91.2% 59.8%)',
        colorBackground: 'hsl(222.2 84% 4.9%)',
        colorText: 'hsl(210 40% 98%)',
        colorInputBackground: 'hsl(217.2 32.6% 17.5%)',
        colorInputText: 'hsl(210 40% 98%)',
        colorDanger: 'hsl(0 62.8% 30.6%)',
      },
    };

  return {
    variables: {
      colorPrimary: 'hsl(221.2 83.2% 53.3%)',
      colorBackground: 'hsl(0 0% 100%)',
      colorText: 'hsl(222.2 84% 4.9%)',
      colorInputBackground: 'hsl(0 0% 100%)',
      colorInputText: 'hsl(222.2 84% 4.9%)',
      colorDanger: 'hsl(0 84.2% 60.2%)',
      fontFamily: 'var(--font-sans)',
    },
  };
}
