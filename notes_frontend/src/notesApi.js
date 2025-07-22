/**
 * Utility functions for CRUD operations on notes using Supabase.
 */

import { supabase } from './supabaseClient';

// PUBLIC_INTERFACE
export async function fetchNotes() {
  /** Fetch all notes ordered by updated_at descending. */
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
export async function fetchNoteById(id) {
  /** Fetch a single note by its id. */
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
export async function createNote(note) {
  /** Create a new note (expects { title, content }). */
  const { data, error } = await supabase
    .from('notes')
    .insert(note)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
export async function updateNote(id, note) {
  /** Update a note by id. */
  const { data, error } = await supabase
    .from('notes')
    .update(note)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete a note by id. */
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
