
"use client";

import type { KeyResult, KanbanStatus, Objective } from '@/types/okr';
import { Edit3, MoreVertical, Trash2, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { KANBAN_STATUSES } from '@/types/okr';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface ObjectiveCardProps {
  objective: Objective;
  onEdit: (objective: Objective) => void;
  onDelete: (objectiveId: string) => void;
  onStatusChange: (objectiveId: string, newStatus: KanbanStatus) => void;
  isReadOnly?: boolean; // New prop
}

export default function ObjectiveCard({
  objective,
  onEdit,
  onDelete,
  onStatusChange,
  isReadOnly = false, // Default to false
}: ObjectiveCardProps) {
  const overallProgress =
    objective.keyResults.length > 0
      ? objective.keyResults.reduce((sum, kr) => sum + kr.progress, 0) /
        objective.keyResults.length
      : 0;

  return (
    <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{objective.title}</CardTitle>
          {!isReadOnly && ( // Conditionally render DropdownMenu
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(objective)}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {KANBAN_STATUSES.filter(status => status !== objective.status).map(status => (
                   <DropdownMenuItem key={status} onClick={() => onStatusChange(objective.id, status)}>
                      <MoveRight className="mr-2 h-4 w-4" />
                      Move to {status}
                   </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the objective "{objective.title}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(objective.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Badge variant={objective.period === 'Weekly' ? 'secondary' : 'outline'}>
            {objective.period}
          </Badge>
          <span className="text-xs">Created: {new Date(objective.createdAt).toLocaleDateString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 space-y-3 flex-grow">
        {objective.keyResults.map((kr) => (
          <div key={kr.id}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-muted-foreground">{kr.description}</p>
              <span className="text-sm font-medium text-[hsl(var(--custom-yellow-foreground))]">
                {kr.progress}%
              </span>
            </div>
            <Progress value={kr.progress} className="h-2 [&>div]:bg-[hsl(var(--custom-yellow))]" />
          </div>
        ))}
        {objective.keyResults.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No key results defined.</p>
        )}
      </CardContent>
      {objective.keyResults.length > 0 && (
        <CardFooter className="pt-0 pb-4">
            <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold">Overall Progress</p>
                    <span className="text-sm font-bold text-primary">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
