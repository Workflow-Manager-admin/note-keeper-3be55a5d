import React from 'react';

// PUBLIC_INTERFACE
function NoteViewer({ note }) {
  /**
   * Read-only view of the note.
   */
  if (!note) {
    return (
      <div className="note-viewer">
        <div className="note-placeholder">Select or create a note to get started!</div>
      </div>
    );
  }
  return (
    <div className="note-viewer">
      <h2 className="note-view-title">{note.title || '(Untitled)'}</h2>
      <div className="note-view-content">
        {note.content && note.content.split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export default NoteViewer;
