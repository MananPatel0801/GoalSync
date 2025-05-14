
import type { Objective } from '@/types/okr';

export const STORAGE_KEY = 'goalflow_objectives';

export const initialObjectives: Objective[] = [
  {
    id: 'obj-1',
    title: 'Learn Next.js App Router',
    period: 'Weekly',
    keyResults: [
      { id: 'kr-1-1', description: 'Complete official Next.js tutorial', progress: 50 },
      { id: 'kr-1-2', description: 'Build a small project with App Router', progress: 20 },
    ],
    status: 'In Progress',
    createdAt: new Date(2024, 0, 15).toISOString(), // Example: Jan 15, 2024
  },
  {
    id: 'obj-2',
    title: 'Improve Physical Fitness',
    period: 'Monthly',
    keyResults: [
      { id: 'kr-2-1', description: 'Go to the gym 3 times a week', progress: 75 },
      { id: 'kr-2-2', description: 'Run a 5K', progress: 30 },
      { id: 'kr-2-3', description: 'Reduce sugar intake', progress: 60 },
    ],
    status: 'To Do',
    createdAt: new Date(2024, 0, 10).toISOString(), // Example: Jan 10, 2024
  },
  {
    id: 'obj-3',
    title: 'Read 12 Books This Year',
    period: 'Monthly',
    keyResults: [
      { id: 'kr-3-1', description: 'Finish "Atomic Habits"', progress: 100 },
      { id: 'kr-3-2', description: 'Start "The Pragmatic Programmer"', progress: 10 },
    ],
    status: 'In Progress',
    createdAt: new Date(2024, 0, 5).toISOString(), // Example: Jan 5, 2024
  },
  {
    id: 'obj-4',
    title: 'Ship Q1 Product Features',
    period: 'Monthly',
    keyResults: [
      { id: 'kr-4-1', description: 'User authentication module', progress: 100 },
      { id: 'kr-4-2', description: 'Dashboard analytics page', progress: 100 },
      { id: 'kr-4-3', description: 'Onboarding flow v1', progress: 100 },
    ],
    status: 'Done',
    createdAt: new Date(2023, 11, 1).toISOString(), // Example: Dec 1, 2023
  }
];
