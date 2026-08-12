import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'font-medium transition-all duration-300 font-secondary flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-[#1a1d2e] text-white hover:bg-[#252938] rounded-2xl shadow-sm border-none',
    secondary: 'bg-white/20 text-white border border-white/30 hover:bg-white/30 rounded-2xl',
    outline: 'bg-white text-[#1a1d2e] border-2 border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#fafafa] rounded-2xl shadow-sm'
  };

  const sizeStyles = {
    sm: 'px-5 py-2 text-sm h-9',
    md: 'px-7 py-2.5 text-base h-11',
    lg: 'px-9 py-3 text-lg h-12'
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      className={combinedStyles}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;