import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No prayer requests yet",
  description = "When members submit prayer requests, they will appear here. Be the first to share.",
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-16 px-6 animate-in fade-in duration-300"
      data-ocid="empty_state"
    >
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5">
        {icon ?? <HeartHandshake className="w-8 h-8 text-accent" />}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} data-ocid="empty_state.primary_button">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
