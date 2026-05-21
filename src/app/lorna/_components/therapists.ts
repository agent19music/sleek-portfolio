export type Modality = 'video' | 'in-person'

export interface Therapist {
  id: string
  name: string
  /** lowercased, dash-joined — used as the tapback.co avatar seed */
  slug: string
  specialization: string
  yearsExperience: number
  sessionDay: string
  sessionTime: string
  modality: Modality
  /** tapback color index, 0-17 */
  avatarColor: number
  location?: string
}

export const therapists: Therapist[] = [
  {
    id: 't1',
    name: 'Dr. Maya Okonjo',
    slug: 'maya-okonjo',
    specialization: 'Cognitive Behavioral Therapy',
    yearsExperience: 8,
    sessionDay: 'Tue',
    sessionTime: '3:00 PM',
    modality: 'video',
    avatarColor: 2,
  },
  {
    id: 't2',
    name: 'Dr. Jonas Berglund',
    slug: 'jonas-berglund',
    specialization: 'Trauma-focused Therapy',
    yearsExperience: 12,
    sessionDay: '14 Sep',
    sessionTime: '10:00 AM',
    modality: 'in-person',
    avatarColor: 5,
    location: 'Studio 4 · 2nd floor',
  },
]

export function avatarUrl(t: Therapist): string {
  return `https://tapback.co/api/avatar/${t.slug}.webp?color=${t.avatarColor}`
}
