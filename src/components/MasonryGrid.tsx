'use client';

import { Project } from '@/types/project'
import { MasonryProjectCard } from './MasonryProjectCard'
import { useMemo } from 'react'

interface MasonryGridProps {
  projects: Project[];
  className?: string;
}

export const MasonryGrid = ({ projects, className = "" }: MasonryGridProps) => {
  const displayedItems = useMemo(() => projects, [projects])

  return (
    <div className={`w-full ${className}`}>
      <div className="sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 group">
          {displayedItems.map((project) => (
            <div key={project.id}>
              <MasonryProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
