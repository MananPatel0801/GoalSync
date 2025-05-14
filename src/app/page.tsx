"use client";

import { useState, useEffect } from 'react';
import type { Objective, KanbanStatus } from '@/types/okr';
import KanbanBoard from '@/components/goalflow/kanban-board';
import ObjectiveForm from '@/components/goalflow/objective-form';
import GoalSummary from '@/components/goalflow/goal-summary';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { initialObjectives, STORAGE_KEY } from '@/lib/initial-data';

export default function HomePage() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingObjective, setEditingObjective] = useState<Objective | null>(null);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedObjectives = localStorage.getItem(STORAGE_KEY);
      if (storedObjectives) {
        setObjectives(JSON.parse(storedObjectives));
      } else {
        setObjectives(initialObjectives);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialObjectives));
      }
    } catch (error) {
      console.error("Failed to load objectives from localStorage", error);
      setObjectives(initialObjectives); // Fallback to initial data
    }
  }, []);

  const saveObjectives = (updatedObjectives: Objective[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedObjectives));
    } catch (error) {
      console.error("Failed to save objectives to localStorage", error);
      toast({
        title: "Save Error",
        description: "Could not save changes to local storage. Your data might not persist.",
        variant: "destructive",
      });
    }
  };

  const handleAddObjective = () => {
    setEditingObjective(null);
    setIsFormOpen(true);
  };

  const handleEditObjective = (objective: Objective) => {
    setEditingObjective(objective);
    setIsFormOpen(true);
  };

  const handleDeleteObjective = (objectiveId: string) => {
    setObjectives((prev) => {
      const updated = prev.filter((obj) => obj.id !== objectiveId);
      saveObjectives(updated);
      return updated;
    });
    toast({
      title: 'Objective Deleted',
      description: 'The objective has been successfully deleted.',
      variant: 'destructive'
    });
  };

  const handleStatusChange = (objectiveId: string, newStatus: KanbanStatus) => {
    setObjectives((prev) => {
      const updated = prev.map((obj) =>
        obj.id === objectiveId ? { ...obj, status: newStatus } : obj
      );
      saveObjectives(updated);
      return updated;
    });
    toast({
      title: 'Objective Updated',
      description: `Objective moved to ${newStatus}.`,
    });
  };

  const handleFormSubmit = (data: Objective) => {
    setObjectives((prev) => {
      let updated;
      if (editingObjective) {
        updated = prev.map((obj) => (obj.id === data.id ? data : obj));
      } else {
        updated = [...prev, data];
      }
      saveObjectives(updated);
      return updated;
    });
    setIsFormOpen(false);
    setEditingObjective(null);
  };
  
  if (!isClient) {
    // Render nothing or a loading indicator on the server or before hydration
    return null; 
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          My Objectives
        </h2>
        <Button onClick={handleAddObjective} className="bg-[hsl(var(--custom-yellow))] text-[hsl(var(--custom-yellow-foreground))] hover:bg-[hsl(var(--custom-yellow))]/90">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Objective
        </Button>
      </div>

      <KanbanBoard
        objectives={objectives}
        onEditObjective={handleEditObjective}
        onDeleteObjective={handleDeleteObjective}
        onStatusChange={handleStatusChange}
      />

      <GoalSummary objectives={objectives} />

      {isFormOpen && (
         <ObjectiveForm
            isOpen={isFormOpen}
            onClose={() => {
              setIsFormOpen(false);
              setEditingObjective(null);
            }}
            onSubmit={handleFormSubmit}
            initialData={editingObjective}
          />
      )}
    </div>
  );
}
