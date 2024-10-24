import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Note } from '../types';
import { AutoResizeTextarea } from './AutoResizeTextarea';

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

export function NoteEditor({ note, onSave, onClose }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title, content,
      isPinned: false
    });
    setTitle('');
    setContent('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md max-h-[80vh] flex flex-col my-8">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 scrollbar-styled">
            <div className="mb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <AutoResizeTextarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note content..."
                className="w-full px-3 py-2 border rounded-lg min-h-[8rem] max-h-[50vh] focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white scrollbar-styled"
                required
              />
            </div>
          </div>
          
          <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}