import { useState, useEffect } from 'react';
import { Plus, Moon, Sun, Monitor } from 'lucide-react';
import Swal from 'sweetalert2';
import type { Note } from './types';
import { useTheme } from './hooks/useTheme';
import { NoteCard } from './components/NoteCard';
import { NoteEditor } from './components/NoteEditor';

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { theme, setTheme, isSystemTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'isPinned'>) => {
    const timestamp = Date.now();
    if (editingNote) {
      setNotes(notes.map(note =>
        note.id === editingNote.id
          ? { ...note, ...noteData, updatedAt: timestamp }
          : note
      ));
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        ...noteData,
        createdAt: timestamp,
        updatedAt: timestamp,
        isPinned: false,
      };
      setNotes([newNote, ...notes]);
    }
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleDeleteNote = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    });

    if (result.isConfirmed) {
      setNotes(notes.filter(note => note.id !== id));
      await Swal.fire({
        title: 'Deleted!',
        text: 'Your note has been deleted.',
        icon: 'success',
        background: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
      });
    }
  };

  const handleTogglePin = (id: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const cycleTheme = () => {
    setTheme(
      theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    );
  };

  const getThemeIcon = () => {
    if (isSystemTheme) {
      return <Monitor size={24} />;
    }
    return theme === 'light' ? <Sun size={24} /> : <Moon size={24} />;
  };

  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto p-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Notes</h1>
          <div className="flex gap-4">
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:shadow-lg transition-shadow"
              title={isSystemTheme ? 'System theme' : `${theme.charAt(0).toUpperCase() + theme.slice(1)} theme`}
            >
              {getThemeIcon()}
            </button>
            <button
              onClick={() => setIsEditorOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              New Note
            </button>
          </div>
        </header>

        {pinnedNotes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              📌 Pinned Notes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pinnedNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          </div>
        )}

        {unpinnedNotes.length > 0 && (
          <div>
            {pinnedNotes.length > 0 && (
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Other Notes
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unpinnedNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          </div>
        )}

        {notes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No notes yet. Create your first note!</p>
          </div>
        )}

        {isEditorOpen && (
          <NoteEditor
            note={editingNote || undefined}
            onSave={handleSaveNote}
            onClose={() => {
              setIsEditorOpen(false);
              setEditingNote(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;