import React, { useState, useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
function NoteEditor({ note, onSave, loading, autofocus }) {
  /**
   * Note editing form: title and content.
   */
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');

  const titleRef = useRef(null);

  useEffect(() => {
    setTitle(note ? note.title : '');
    setContent(note ? note.content : '');
    if (autofocus && titleRef.current) {
      titleRef.current.focus();
    }
  }, [note, autofocus]);

  // On save handler
  function handleSave(e) {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    onSave({
      ...note,
      title: title.trim(),
      content: content.trim(),
    });
  }

  return (
    <form className="note-editor" onSubmit={handleSave}>
      <input
        ref={titleRef}
        className="note-title-input"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        maxLength={64}
        aria-label="Note title"
      />
      <textarea
        className="note-content-input"
        placeholder="Write your note here..."
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={12}
        aria-label="Note content"
      />
      <div className="editor-actions">
        <button type="submit" className="primary-btn" disabled={loading || (!title.trim() && !content.trim())}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}

export default NoteEditor;
