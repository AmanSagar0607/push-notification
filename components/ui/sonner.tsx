'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[#2A1C45] group-[.toaster]:text-white group-[.toaster]:border-[#412c6a] group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-white/90',
          actionButton:
            'group-[.toast]:bg-[#412c6a] group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-[#412c6a]/50 group-[.toast]:text-white',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };