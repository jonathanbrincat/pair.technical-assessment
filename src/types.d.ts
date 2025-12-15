export interface Session {
  id: string
  title: string
  tags: string[]
  mins: number
  difficulty: string | null
  popularity: number
  updatedAt: string
  completed: boolean
  favourite: boolean
}
