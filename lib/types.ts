export interface Project {
  id?: number
  created_at?: string
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  figma?: string
  website?: string
  color: string
  category: ("project" | "playgrounds")[]
  is_draft?: boolean
}
