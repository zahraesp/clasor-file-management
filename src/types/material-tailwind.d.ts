declare module '@material-tailwind/react' {
  import { ComponentProps } from 'react';
  
  export interface ButtonProps extends ComponentProps<'button'> {
    placeholder?: string;
    variant?: 'filled' | 'outlined' | 'gradient' | 'text';
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    loading?: boolean;
    fullWidth?: boolean;
  }
  
  export interface TypographyProps extends ComponentProps<'p'> {
    placeholder?: string;
    variant?: string;
    color?: string;
  }
  
  export interface DialogProps extends ComponentProps<'div'> {
    placeholder?: string;
    open?: boolean;
    handler?: () => void;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    dismiss?: {
      enabled?: boolean;
      escapeKey?: boolean;
      outsidePress?: boolean;
    };
  }
  
  export interface DialogHeaderProps extends ComponentProps<'div'> {
    placeholder?: string;
  }
  
  export interface DialogBodyProps extends ComponentProps<'div'> {
    placeholder?: string;
    divider?: boolean;
  }
  
  export interface DialogFooterProps extends ComponentProps<'div'> {
    placeholder?: string;
  }
  
  export interface InputProps extends ComponentProps<'input'> {
    placeholder?: string;
    label?: string;
    error?: boolean;
    success?: boolean;
    size?: 'md' | 'lg';
    color?: string;
    variant?: 'standard' | 'outlined' | 'static';
    containerProps?: ComponentProps<'div'>;
    labelProps?: ComponentProps<'label'>;
    crossOrigin?: string;
  }
  
  export const Button: React.FC<ButtonProps>;
  export const Typography: React.FC<TypographyProps>;
  export const Dialog: React.FC<DialogProps>;
  export const DialogHeader: React.FC<DialogHeaderProps>;
  export const DialogBody: React.FC<DialogBodyProps>;
  export const DialogFooter: React.FC<DialogFooterProps>;
  export const Input: React.FC<InputProps>;
}
