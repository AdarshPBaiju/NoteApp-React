import React from 'react';
import { Pencil, Trash2, Pin } from 'lucide-react';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete, onTogglePin }: NoteCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{note.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onTogglePin(note.id)}
            className={`${
              note.isPinned
                ? 'text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300'
                : 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'
            }`}
          >
            <Pin size={18} fill={note.isPinned ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onEdit(note)}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{note.content}</p>
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}