"use client";

import type { Objective } from '@/types/okr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, TrendingUp } from 'lucide-react';

interface GoalSummaryProps {
  objectives: Objective[];
}

export default function GoalSummary({ objectives }: GoalSummaryProps) {
  const completedObjectives = objectives.filter(obj => obj.status === 'Done');
  const weeklyCompleted = completedObjectives.filter(obj => obj.period === 'Weekly').length;
  const monthlyCompleted = completedObjectives.filter(obj => obj.period === 'Monthly').length;

  return (
    <Card className="mt-8 bg-card shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp size={24} className="text-primary" />
          <CardTitle className="text-xl">Goal Completion Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {objectives.length === 0 ? (
           <p className="text-muted-foreground">No objectives tracked yet. Add some goals to see your summary!</p>
        ) : (
        <>
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <div className='flex items-center gap-2'>
            <CheckCircle size={20} className="text-green-600" />
            <p className="text-md">Total Objectives Completed:</p>
          </div>
          <p className="text-md font-semibold text-primary">{completedObjectives.length}</p>
        </div>
        {weeklyCompleted > 0 && (
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
             <div className='flex items-center gap-2'>
              <CheckCircle size={18} className="text-blue-500" />
              <p className="text-sm">Weekly Goals Completed:</p>
            </div>
            <p className="text-sm font-semibold text-blue-600">{weeklyCompleted}</p>
          </div>
        )}
        {monthlyCompleted > 0 && (
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-md">
             <div className='flex items-center gap-2'>
              <CheckCircle size={18} className="text-purple-500" />
              <p className="text-sm">Monthly Goals Completed:</p>
            </div>
            <p className="text-sm font-semibold text-purple-600">{monthlyCompleted}</p>
          </div>
        )}
        {completedObjectives.length === 0 && objectives.length > 0 && (
             <p className="text-muted-foreground text-center py-4">Keep going! No objectives completed yet.</p>
        )}
        </>
        )}
      </CardContent>
    </Card>
  );
}
