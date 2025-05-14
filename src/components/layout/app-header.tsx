import { KanbanSquare, Archive } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AppHeader() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <KanbanSquare size={28} />
          <h1 className="text-2xl font-bold">GoalFlow</h1>
        </Link>
        <nav>
          <Button variant="outline" asChild>
            <Link href="/completed" className="flex items-center gap-2">
              <Archive size={18} />
              View Completed
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
