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
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      users: {
        Row: {
          created_at: string | null
          current_vote: number | null
          id: number
          name: string
          room: number
        }
        Insert: {
          created_at?: string | null
          current_vote?: number | null
          id?: number
          name: string
          room: number
        }
        Update: {
          created_at?: string | null
          current_vote?: number | null
          id?: number
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
