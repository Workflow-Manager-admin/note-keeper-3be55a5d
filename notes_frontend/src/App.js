import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import NoteViewer from './components/NoteViewer';
import {
  fetchNotes,
  fetchNoteById,
  createNote,
  updateNote,
  deleteNote
} from './notesApi';

/**
 * The top-level note-keeper app.
 * Provides sidebar layout, CRUD logic, and responsive container.
 *
 * PUBLIC_INTERFACE
 */
function App() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false); // If true, show NoteEditor
  const [error, setError] = useState(null);

  // Fetch and refresh notes
  async function refreshNotes(selectId = undefined) {
    setLoading(true);
    setError(null);
    try {
      const notesData = await fetchNotes();
      setNotes(notesData);
      // If first load, select first note
      if (selectId !== undefined) {
        setSelectedId(selectId);
      } else if (notesData.length && !selectedId) {
        setSelectedId(notesData[0].id);
      } else if (!notesData.length) {
        setSelectedId(null);
        setSelectedNote(null);
      }
    } catch (err) {
      setError('Failed to load notes');
    }
    setLoading(false);
  }

  // Load notes and current note on mount or selectedId changes
  useEffect(() => {
    refreshNotes();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setSelectedNote(null);
      setEditing(false);
      return;
    }
    setLoading(true);
    fetchNoteById(selectedId)
      .then(note => {
        setSelectedNote(note);
        setEditing(false);
      })
      .catch(() => setError('Failed to load note'))
      .finally(() => setLoading(false));
  }, [selectedId]);

  // Handler to create new note
  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const newNote = await createNote({
        title: '',
        content: ''
      });
      await refreshNotes(newNote.id);
      setEditing(true);
    } catch (err) {
      setError('Failed to create note');
    }
    setLoading(false);
  };

  // Handler to select note
  const handleSelect = (id) => {
    setSelectedId(id);
    setEditing(false);
    setError(null);
  };

  // Handler to delete note
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    setLoading(true);
    setError(null);
    try {
      await deleteNote(id);
      await refreshNotes();
      if (notes.length > 1) {
        setSelectedId(notes[0].id === id && notes[1] ? notes[1].id : notes[0].id);
      } else {
        setSelectedId(null);
        setSelectedNote(null);
      }
    } catch (err) {
      setError('Failed to delete note');
    }
    setLoading(false);
  };

  // Handler to save note (update)
  const handleSave = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (!data.id) { // should not happen in this UI, but fallback
        await handleCreate();
      } else {
        await updateNote(data.id, { title: data.title, content: data.content });
        await refreshNotes(data.id);
        setEditing(false);
      }
    } catch (err) {
      setError('Failed to save note');
    }
    setLoading(false);
  };

  // Handler to enter editing mode
  const handleEdit = () => setEditing(true);

  // Handler to cancel editing
  const handleCancelEdit = () => setEditing(false);

  // Sidebar, main editor/view content
  return (
    <div className="App note-keeper-root">
      <div className="container-note-layout">
        <Sidebar
          notes={notes}
          selectedId={selectedId}
          onSelect={handleSelect}
          onCreate={handleCreate}
          onDelete={handleDelete}
        />
        <main className="main-content">
          {error && <div className="error-bar">{error}</div>}
          {selectedNote && !editing && (
            <div className="note-actions-top">
              <button className="secondary-btn" onClick={handleEdit}>Edit</button>
            </div>
          )}
          {editing && selectedNote ? (
            <NoteEditor
              note={selectedNote}
              onSave={handleSave}
              loading={loading}
              autofocus
            />
          ) : (
            <NoteViewer note={selectedNote} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
