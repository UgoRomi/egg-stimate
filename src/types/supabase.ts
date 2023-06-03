export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          created_at: string | null
          id: number
          name: string
          show_votes: boolean
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          show_votes?: boolean
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          show_votes?: boolean
          updated_at?: string | null
        }
      }
      users: {
        Row: {
          created_at: string | null
          current_vote: number | null
          id: number
          is_spectator: boolean
          name: string
          room: number
        }
        Insert: {
          created_at?: string | null
          current_vote?: number | null
          id?: number
          is_spectator?: boolean
          name: string
          room: number
        }
        Update: {
          created_at?: string | null
          current_vote?: number | null
          id?: number
          is_spectator?: boolean
          name?: string
          room?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
