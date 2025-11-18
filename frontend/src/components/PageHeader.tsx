import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MoreVertical } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
    icon?: React.ReactNode;
  }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {actions && (
        <div className="flex gap-2">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant={action.variant || 'default'}
              onClick={action.onClick}
              className={action.variant === 'default' ? 'bg-gradient-hero' : ''}
            >
              {action.icon || (action.variant === 'default' && <Plus className="h-4 w-4 mr-2" />)}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
