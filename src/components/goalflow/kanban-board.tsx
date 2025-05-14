"use client";

import type { KanbanStatus, Objective } from '@/types/okr';
import KanbanColumn from './kanban-column';
import { KANBAN_STATUSES } from '@/types/okr';

interface KanbanBoardProps {
  objectives: Objective[];
  onEditObjective: (objective: Objective) => void;
  onDeleteObjective: (objectiveId: string) => void;
  onStatusChange: (objectiveId: string, newStatus: KanbanStatus) => void;
}

export default function KanbanBoard({
  objectives,
  onEditObjective,
  onDeleteObjective,
  onStatusChange,
}: KanbanBoardProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
      {KANBAN_STATUSES.map((status) => (
        <KanbanColumn
          key={status}
          title={status}
          objectives={objectives.filter((obj) => obj.status === status)}
          onEditObjective={onEditObjective}
          onDeleteObjective={onDeleteObjective}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
