import './Button.css';
import className from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  loading?: boolean;
};

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  loading,
  ...rest
}: ButtonProps) {
  const classes = className('button', {
    primary: primary,
    secondary: secondary,
    success: success,
    warning: warning,
    danger: danger,
    outline: outline,
    rounded: rounded,
    loading: loading,
  });

  return (
    <button {...rest} className={classes} disabled={loading}>
      {loading ? 'Loading...' : children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }: ButtonProps) => {
    const count = Number(!!primary) + Number(!!secondary) + Number(!!warning) + Number(!!success) + Number(!!danger);

    if (count > 1) {
      return new Error('Only one of primary, secondary, success, warning, danger can be true');
    }
  },
};

export default Button;
