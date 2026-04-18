import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PrayerStatus } from "../backend";

interface StatusBadgeProps {
  status: PrayerStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const isPrayed = status === PrayerStatus.prayed;
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs font-medium px-3 py-1 rounded-full border-0 transition-smooth",
        isPrayed
          ? "bg-accent/15 text-accent"
          : "bg-muted text-muted-foreground",
        className,
      )}
    >
      {isPrayed ? "Prayed" : "Pending"}
    </Badge>
  );
}
