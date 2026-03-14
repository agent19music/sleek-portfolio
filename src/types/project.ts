export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  oneLiner?: string;
  video?: string;
  image?: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  dates?: string;
  links?: {
    type: string;
    href: string;
  }[];
  date?: string;
  tweetUrl?: string;
  isNew?: boolean;
}
