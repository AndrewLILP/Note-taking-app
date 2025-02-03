import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="font-bold text-lg mb-2 text-gray-900">{note.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
          <p className="text-sm text-gray-500 mb-4">
            Created: {formatDate(note.createdAt)}
            {note.updatedAt && note.updatedAt !== note.createdAt && (
              <span className="ml-2">
                • Updated: {formatDate(note.updatedAt)}
              </span>
            )}
          </p>
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <Link to={`/notes/${note._id}`}>
            <Button variant="outline" size="sm" className="flex items-center">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(note._id)}
            className="flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteItem;