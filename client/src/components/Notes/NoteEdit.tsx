import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { noteService } from '../../services/notes';
import NoteForm from './NoteForm';

const NoteEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: noteResponse, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => noteService.getNoteById(id as string),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          Loading note...
        </div>
      </div>
    );
  }

  if (error || !noteResponse?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">
          Error loading note. {(error as Error)?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Note</h2>
        <NoteForm
          note={noteResponse.data}
          onClose={() => navigate('/notes')}
          onSuccess={() => navigate('/notes')}
        />
      </div>
    </div>
  );
};

export default NoteEdit;