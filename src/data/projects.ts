import { Project } from '@/types/project'
import { DATA } from '@/app/data/portfolioData'

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

export const projects: Project[] = DATA.projects.map((project) => {
  const githubLink =
    project.links.find((link) => link.type.toLowerCase().includes("repo"))?.href ??
    undefined
  const liveLink =
    project.links.find((link) => link.type.toLowerCase().includes("website"))?.href ??
    project.href

  return {
    id: toSlug(project.title),
    title: project.title,
    description: project.description,
    oneLiner: project.oneLiner,
    longDescription: project.description,
    dates: project.dates,
    liveLink,
    githubLink,
    image: project.image || undefined,
    video: project.video || undefined,
    links: project.links.map((link) => ({ type: link.type, href: link.href })),
    tags: [...project.technologies],
  }
})

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

export const getAllProjects = (): Project[] => {
  return projects
}
