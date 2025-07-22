import React from 'react';

// PUBLIC_INTERFACE
function Sidebar({ notes, selectedId, onSelect, onCreate, onDelete }) {
  /** Sidebar showing list of notes and the "new note" button. */
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Notes</h1>
        <button className="accent-btn" onClick={onCreate} title="Add note">
          +
        </button>
      </div>
      <ul className="notes-list">
        {notes.map((note) => (
          <li
            key={note.id}
            className={note.id === selectedId ? 'selected' : ''}
            onClick={() => onSelect(note.id)}
          >
            <span className="note-title">{note.title || '(Untitled)'}</span>
            <button className="delete-btn" title="Delete" onClick={e => {e.stopPropagation(); onDelete(note.id);}}>
              &#128465;
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
