'use client';

import { Project } from '@/types/project'
import Image from "next/image";
import Link from "next/link";

interface MasonryProjectCardProps {
  project: Project;
  className?: string;
}

export const MasonryProjectCard = ({ project, className = "" }: MasonryProjectCardProps) => {
  const oneLineDescription = (project.oneLiner || project.description || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return (
    <Link
      href={`/projects/${project.id}`}
      className={`group/item block w-full text-left touch-manipulation ${className}`}
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
      aria-label={`Open project page for ${project.title}`}
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition-all duration-300 ease-out dark:border-white/10 dark:bg-white/5 group-has-hover:opacity-40 group-has-hover:group-hover/item:scale-[1.01] group-has-hover:group-hover/item:opacity-100">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        ) : null}

        <div className="space-y-1.5 p-3">
          <h3 className="text-sm font-medium text-black dark:text-white">{project.title}</h3>
          <p className="truncate text-xs text-black/60 dark:text-white/60">
            {oneLineDescription}
          </p>
        </div>
      </article>
    </Link>
  )
};
