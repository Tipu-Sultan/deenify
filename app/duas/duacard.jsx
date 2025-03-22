import { BookOpen, Tag } from 'lucide-react';

export default function DuaCard({ dua }) {
  return (
    <div className="p-6 rounded-xl shadow-md bg-background/80 backdrop-blur-sm border border-muted-foreground/10 hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground">{dua.reference}</span>
      </div>
      <p className="text-2xl text-right mb-4 leading-relaxed tracking-wide">{dua.arabic}</p>
      <p className="text-muted-foreground text-lg">{dua.translation}</p>
      <div className="flex items-center gap-2 mt-4">
        <Tag className="h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground capitalize">{dua.category}</span>
      </div>
    </div>
  );
}