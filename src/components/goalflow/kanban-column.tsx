"use client";

import type { KanbanStatus, Objective } from '@/types/okr';
import ObjectiveCard from './objective-card';
import { ListTodo, ClipboardList, CheckCircle2, DraftingCompass } from 'lucide-react';

interface KanbanColumnProps {
  title: KanbanStatus;
  objectives: Objective[];
  onEditObjective: (objective: Objective) => void;
  onDeleteObjective: (objectiveId: string) => void;
  onStatusChange: (objectiveId: string, newStatus: KanbanStatus) => void;
}

const columnIcons: Record<KanbanStatus, React.ElementType> = {
  'To Do': ListTodo,
  'In Progress': DraftingCompass, // Changed from ClipboardList for better visual differentiation
  'Done': CheckCircle2,
};

const columnColors: Record<KanbanStatus, string> = {
    'To Do': 'bg-blue-100 border-blue-300',
    'In Progress': 'bg-yellow-100 border-yellow-300',
    'Done': 'bg-green-100 border-green-300',
}

export default function KanbanColumn({
  title,
  objectives,
  onEditObjective,
  onDeleteObjective,
  onStatusChange,
}: KanbanColumnProps) {
  const Icon = columnIcons[title];

  return (
    <div className={`flex-1 p-4 rounded-lg shadow-sm min-w-[300px] bg-card border ${columnColors[title] || 'bg-muted/30 border-muted'}`}>
      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[hsl(var(--border))]">
        <div className="flex items-center gap-2">
          <Icon size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
        </div>
        <span className="text-sm font-medium bg-primary text-primary-foreground rounded-full px-2.5 py-0.5">
          {objectives.length}
        </span>
      </div>
      <div className="space-y-4 h-[calc(100vh-250px)] overflow-y-auto pr-1">
        {objectives.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">No objectives here yet.</p>
        ) : (
          objectives.map((objective) => (
            <ObjectiveCard
              key={objective.id}
              objective={objective}
              onEdit={onEditObjective}
              onDelete={onDeleteObjective}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
