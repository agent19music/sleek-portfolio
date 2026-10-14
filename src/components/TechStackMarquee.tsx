import Image from 'next/image'

type StackItem = { name: string; icon?: string }
const stackGroups: { category: string; items: StackItem[] }[] = [
  {
    category: 'Language',
    items: [
      { name: 'TypeScript', icon: '/tech-icons/typescript.svg' },
      { name: 'Elixir', icon: '/tech-icons/elixir.svg' },
      { name: 'Python', icon: '/tech-icons/python.svg' },
      { name: 'SQL', icon: '/tech-icons/sql.svg' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: '/tech-icons/react.svg' },
      { name: 'Next.js', icon: '/tech-icons/nextjs.svg' },
      { name: 'Tailwind CSS', icon: '/tech-icons/tailwind.svg' },
      { name: 'Phoenix LiveView', icon: '/tech-icons/phoenix.svg' },
    ],
  },
  {
    category: 'Mobile',
    items: [
      { name: 'React Native', icon: '/tech-icons/react.svg' },
      { name: 'Kotlin', icon: '/tech-icons/kotlin.svg' },
    ],
  },
  {
    category: 'Backend & Database',
    items: [
      { name: 'FastAPI', icon: '/tech-icons/fastapi.svg' },
      { name: 'Phoenix', icon: '/tech-icons/phoenix.svg' },
      { name: 'PostgreSQL', icon: '/tech-icons/postgresql.svg' },
      { name: 'Redis', icon: '/tech-icons/redis.svg' },
    ],
  },
  {
    category: 'Workflow & AI',
    items: [
      { name: 'Claude', icon: '/tech-icons/claude.svg' },
      { name: 'Cursor', icon: '/tech-icons/cursor.svg' },
      { name: 'Gemini', icon: '/tech-icons/gemini.svg' },
      { name: 'ChatGPT', icon: '/tech-icons/openai.svg' },
      { name: 'Codex', icon: '/tech-icons/openai.svg' },
      { name: 'Grok' },
      { name: 'Git', icon: '/tech-icons/Git.svg' },
      { name: 'Docker', icon: '/tech-icons/docker.svg' },
      { name: 'Vercel', icon: '/skills/vercel.svg' },
    ],
  },
  {
    category: 'Analytics',
    items: [
      { name: 'Google Analytics', icon: '/tech-icons/google-analytics.svg' },
      { name: 'OpenPanel', icon: '/tech-icons/openpanel.svg' },
      { name: 'PostHog', icon: '/tech-icons/posthog.svg' },
    ],
  },
  {
    category: 'Design',
    items: [
      { name: 'Figma', icon: '/tech-icons/figma.svg' },
      { name: 'Paper', icon: '/tech-icons/paper.svg' },
    ],
  },
  {
    category: 'Cloud',
    items: [
      { name: 'Azure', icon: '/tech-icons/Azure.svg' },
      { name: 'AWS', icon: '/tech-icons/AWS.svg' },
      { name: 'Google Cloud', icon: '/tech-icons/gcp.svg' },
    ],
  },
]

export default function TechStackMarquee({ className = '' }: { className?: string }) {
  return (
    <section id="stack" aria-labelledby="stack-heading" className={`border-x border-y border-border ${className}`}>
      <header className="border-b border-border px-4">
        <h2 id="stack-heading" className="py-1 text-3xl font-medium tracking-tight">Stack</h2>
      </header>
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-48 hidden border-r border-dashed border-border sm:block" />
        {stackGroups.map(({ category, items }, index) => {
          const categoryId = `stack-${index + 1}`
          return (
            <div key={category} className="grid items-start gap-y-2 border-b border-border py-4 last:border-none sm:grid-cols-[12rem_1fr]">
              <h3 id={categoryId} className="pl-4 text-sm/6 font-normal">
                <span aria-hidden="true" className="mr-1.5 font-mono text-muted-foreground/80">{String(index + 1).padStart(2, '0')}</span>
                {category}
              </h3>
              <ul aria-labelledby={categoryId} className="flex flex-wrap gap-1.5 px-4">
                {items.map(({ name, icon }) => (
                  <li key={name} className="flex">
                    <span className="inline-flex h-6 items-center justify-center gap-1.25 rounded-full bg-zinc-50/80 px-2 font-mono text-xs text-foreground inset-ring-1 inset-ring-border dark:bg-zinc-900/80">
                      {icon && <Image src={icon} alt="" aria-hidden="true" width={14} height={14} className="size-3.5 shrink-0 object-contain grayscale opacity-80 dark:invert" />}
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
