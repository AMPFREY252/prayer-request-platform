import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  HandHeart,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { dashboardRoute } from "../App";
import { PrayerStatus } from "../backend";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { EmptyState } from "../components/EmptyState";
import { SkeletonCardGrid } from "../components/SkeletonCard";
import { StatusBadge } from "../components/StatusBadge";
import {
  useDeletePrayerRequest,
  useGetPrayerRequests,
  useUpdatePrayerStatus,
} from "../hooks/usePrayerRequests";
import { DashboardLayout } from "../layouts/DashboardLayout";
import type { FilterStatus, PrayerRequest } from "../types";

const PAGE_SIZE = 20;

function formatDate(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Prayer Request Card ──────────────────────────────────────────────────────

interface PrayerCardProps {
  request: PrayerRequest;
  index: number;
  onMarkPrayed: (id: bigint) => void;
  onDelete: (id: bigint) => void;
  isPrayedPending: boolean;
  isDeletePending: boolean;
}

function PrayerCard({
  request,
  index,
  onMarkPrayed,
  onDelete,
  isPrayedPending,
  isDeletePending,
}: PrayerCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const isAlreadyPrayed = request.status === PrayerStatus.prayed;
  const MESSAGE_LIMIT = 120;
  const needsTruncate = request.message.length > MESSAGE_LIMIT;
  const displayName = request.anonymous || !request.name ? null : request.name;

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          duration: 0.25,
          delay: Math.min(index * 0.04, 0.3),
          ease: "easeOut",
        }}
        data-ocid={`prayer_card.item.${index + 1}`}
        className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-smooth flex flex-col gap-3"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {displayName ? (
              <span className="font-semibold text-foreground text-sm truncate">
                {displayName}
              </span>
            ) : (
              <Badge
                variant="secondary"
                className="text-xs font-medium bg-muted text-muted-foreground rounded-full border-0 shrink-0"
              >
                Anonymous
              </Badge>
            )}
          </div>
          <StatusBadge status={request.status} className="shrink-0" />
        </div>

        {/* Message */}
        <div className="text-sm text-muted-foreground leading-relaxed min-w-0">
          <span className="break-words">
            {needsTruncate && !expanded
              ? `${request.message.slice(0, MESSAGE_LIMIT)}`
              : request.message}
          </span>
          {needsTruncate && !expanded && (
            <span className="text-muted-foreground/50">…</span>
          )}
          {needsTruncate && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              data-ocid={`prayer_card.toggle.${index + 1}`}
              className="ml-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-0.5 shrink-0"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border/60 gap-2">
          <span className="text-xs text-muted-foreground/60">
            {formatDate(request.createdAt)}
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant={isAlreadyPrayed ? "secondary" : "default"}
              disabled={isAlreadyPrayed || isPrayedPending}
              onClick={() => onMarkPrayed(request.id)}
              data-ocid={`prayer_card.mark_prayed.${index + 1}`}
              className="text-xs h-8 px-3 gap-1.5"
            >
              {isPrayedPending ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <HandHeart className="w-3 h-3" />
                  {isAlreadyPrayed ? "Prayed" : "Mark Prayed"}
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={isDeletePending}
              onClick={() => setConfirmOpen(true)}
              data-ocid={`prayer_card.delete_button.${index + 1}`}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              aria-label="Delete prayer request"
            >
              {isDeletePending ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete prayer request?"
        description="This will permanently remove this prayer request. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Keep"
        variant="destructive"
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete(request.id);
        }}
      />
    </>
  );
}

// ── Dashboard content ────────────────────────────────────────────────────────

function DashboardContent() {
  const navigate = useNavigate({ from: dashboardRoute.id });
  const searchParams = useSearch({ from: dashboardRoute.id });

  const searchQuery = searchParams.search ?? "";
  const sortOrder = searchParams.sort ?? "newest";
  const statusFilter = (searchParams.status ?? "all") as FilterStatus;

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [pendingPrayedId, setPendingPrayedId] = useState<bigint | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<bigint | null>(null);

  const {
    data: allRequests = [],
    isLoading,
    isError,
    refetch,
  } = useGetPrayerRequests();

  const updateStatus = useUpdatePrayerStatus();
  const deleteRequest = useDeletePrayerRequest();

  const updateParam = useCallback(
    (key: string, value: string) => {
      navigate({
        search: (prev) => ({ ...prev, [key]: value }),
        replace: true,
      });
    },
    [navigate],
  );

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...allRequests];

    if (statusFilter !== "all") {
      const targetStatus =
        statusFilter === "prayed" ? PrayerStatus.prayed : PrayerStatus.pending;
      list = list.filter((r) => r.status === targetStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.message.toLowerCase().includes(q) ||
          r.name?.toLowerCase().includes(q),
      );
    }

    list.sort((a, b) =>
      sortOrder === "newest"
        ? Number(b.createdAt - a.createdAt)
        : Number(a.createdAt - b.createdAt),
    );

    return list;
  }, [allRequests, statusFilter, searchQuery, sortOrder]);

  const paginatedRequests = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(Math.ceil(visibleCount / PAGE_SIZE), totalPages);

  const handleMarkPrayed = useCallback(
    async (id: bigint) => {
      setPendingPrayedId(id);
      try {
        await updateStatus.mutateAsync({ id, status: PrayerStatus.prayed });
        toast.success("Marked as prayed 🙏");
      } catch {
        toast.error("Failed to update status. Please try again.");
      } finally {
        setPendingPrayedId(null);
      }
    },
    [updateStatus],
  );

  const handleDelete = useCallback(
    async (id: bigint) => {
      setPendingDeleteId(id);
      try {
        await deleteRequest.mutateAsync(id);
        toast.success("Prayer request deleted.");
      } catch {
        toast.error("Failed to delete request. Please try again.");
      } finally {
        setPendingDeleteId(null);
      }
    },
    [deleteRequest],
  );

  const filterTabs: { label: string; value: FilterStatus }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Prayed", value: "prayed" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
              Prayer Requests
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage and respond to your community's prayer needs
            </p>
          </div>
          {!isLoading && allRequests.length > 0 && (
            <Badge
              variant="secondary"
              data-ocid="dashboard.count_badge"
              className="bg-accent/15 text-accent-foreground border-0 rounded-full text-xs font-semibold h-6 px-2.5 shrink-0 self-start mt-1"
            >
              {allRequests.length}
            </Badge>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          data-ocid="dashboard.refresh_button"
          className="self-start flex items-center gap-2 h-9 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </Button>
      </div>

      {/* Toolbar */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        {/* Search + Sort row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => {
                updateParam("search", e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search by name or message…"
              data-ocid="dashboard.search_input"
              className="pl-9 h-9 text-sm"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              updateParam("sort", sortOrder === "newest" ? "oldest" : "newest")
            }
            data-ocid="dashboard.sort_toggle"
            className="flex items-center gap-2 h-9 shrink-0 text-sm"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </Button>
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-1" data-ocid="dashboard.status_filter">
          {filterTabs.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                updateParam("status", value);
                setVisibleCount(PAGE_SIZE);
              }}
              data-ocid={`dashboard.filter.${value}`}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-smooth",
                statusFilter === value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <div
          className="text-center py-10 text-destructive text-sm"
          data-ocid="dashboard.error_state"
        >
          Failed to load prayer requests. Please refresh.
        </div>
      )}

      {/* Request grid */}
      {isLoading ? (
        <SkeletonCardGrid count={6} />
      ) : !isError && filtered.length === 0 ? (
        <EmptyState
          title={
            searchQuery || statusFilter !== "all"
              ? "No matching requests"
              : "No prayer requests yet"
          }
          description={
            searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filters to find what you're looking for."
              : "When community members submit prayer requests, they'll appear here."
          }
        />
      ) : !isError && filtered.length > 0 ? (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            data-ocid="dashboard.requests_grid"
          >
            <AnimatePresence mode="popLayout">
              {paginatedRequests.map((req, idx) => (
                <PrayerCard
                  key={req.id.toString()}
                  request={req}
                  index={idx}
                  onMarkPrayed={handleMarkPrayed}
                  onDelete={handleDelete}
                  isPrayedPending={pendingPrayedId === req.id}
                  isDeletePending={pendingDeleteId === req.id}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {(hasMore || totalPages > 1) && (
            <div className="flex flex-col items-center gap-3 pt-2">
              <p className="text-xs text-muted-foreground">
                Showing {paginatedRequests.length} of {filtered.length} requests
                {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
              </p>
              {hasMore && (
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  data-ocid="dashboard.load_more_button"
                  className="h-9 text-sm"
                >
                  Load more
                </Button>
              )}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

// ── Page export ──────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}
