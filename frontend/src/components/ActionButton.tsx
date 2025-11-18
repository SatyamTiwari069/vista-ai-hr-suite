import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { actionHandlers } from '@/lib/actionHandlers';
import { Loader } from 'lucide-react';

interface ActionButtonProps extends ButtonProps {
  action: keyof typeof actionHandlers;
  actionParams?: any[];
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
  confirmMessage?: string;
  icon?: React.ReactNode;
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({
    action,
    actionParams = [],
    onSuccess,
    onError,
    confirmMessage,
    icon,
    children,
    onClick,
    disabled,
    ...props
  }, ref) => {
    const [loading, setLoading] = React.useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      }

      if (confirmMessage && !window.confirm(confirmMessage)) {
        return;
      }

      setLoading(true);
      try {
        const handler = actionHandlers[action] as any;
        if (typeof handler === 'function') {
          const result = await handler(...actionParams);
          onSuccess?.(result);
        }
      } catch (error) {
        onError?.(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </Button>
    );
  }
);

ActionButton.displayName = 'ActionButton';

export default ActionButton;
