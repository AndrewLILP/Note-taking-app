import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { noteService } from '../../services/notes';

interface Note {
  _id?: string;
  title: string;
  content: string;
}

interface NoteFormProps {
  note?: Note;
  onClose?: () => void;
  onSuccess?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Omit<Note, '_id'>>({
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content
      });
    }
  }, [note]);

  const createMutation = useMutation({
    mutationFn: (data: Omit<Note, '_id'>) => noteService.createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess?.() || navigate('/notes');
    },
    onError: (error: any) => {
      setErrors({
        submit: error.response?.data?.message || 'Failed to create note'
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: Note) => 
      noteService.updateNote(note?._id as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess?.() || navigate('/notes');
    },
    onError: (error: any) => {
      setErrors({
        submit: error.response?.data?.message || 'Failed to update note'
      });
    }
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (note?._id) {
      updateMutation.mutate({ ...formData, _id: note._id });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCancel = () => {
    onClose?.() || navigate('/notes');
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {errors.submit}
            </div>
          )}

          <div>
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.title 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label 
              htmlFor="content" 
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.content 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : note?._id ? 'Update Note' : 'Create Note'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NoteForm;