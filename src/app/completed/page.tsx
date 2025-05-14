
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Objective } from '@/types/okr';
import ObjectiveCard from '@/components/goalflow/objective-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArchiveX } from 'lucide-react';
import { initialObjectives, STORAGE_KEY } from '@/lib/initial-data'; // Assuming initial-data.ts is in src/lib

export default function CompletedObjectivesPage() {
  const [completedObjectives, setCompletedObjectives] = useState<Objective[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedObjectives = localStorage.getItem(STORAGE_KEY);
      const allObjectives = storedObjectives ? JSON.parse(storedObjectives) : initialObjectives;
      setCompletedObjectives(allObjectives.filter((obj: Objective) => obj.status === 'Done'));
    } catch (error) {
      console.error("Failed to load objectives from localStorage", error);
      // Fallback to filtering initialObjectives if localStorage fails
      setCompletedObjectives(initialObjectives.filter((obj: Objective) => obj.status === 'Done'));
    }
  }, []);

  if (!isClient) {
    // Render nothing or a loading indicator on the server or before hydration
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Completed Objectives
        </h2>
        <Button variant="outline" asChild>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {completedObjectives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedObjectives.map((objective) => (
            <ObjectiveCard
              key={objective.id}
              objective={objective}
              onEdit={() => {}} // No edit action on this page
              onDelete={() => {}} // No delete action on this page
              onStatusChange={() => {}} // No status change on this page
              isReadOnly={true} // Make card read-only
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <ArchiveX size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">
            No objectives have been completed yet.
          </p>
          <p className="text-muted-foreground">
            Keep working on your goals and mark them as 'Done' to see them here!
          </p>
        </div>
      )}
    </div>
  );
}
