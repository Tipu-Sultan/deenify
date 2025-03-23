import { BookOpen, Tag } from "lucide-react";

export default function DuaCard({ dua }) {
  return (
    <div className="p-6 rounded-xl shadow-md border hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold mb-4">{dua.title}</h3>
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="h-5 w-5" />
        <span className="text-sm">{dua.source || "Unknown source"}</span>
      </div>
      <p className="text-2xl text-right mb-4 leading-relaxed tracking-wide font-arabic">
        {dua.arabic}
      </p>
      {dua.latin && <p className="text-lg italic mb-4">{dua.latin}</p>}
      <p className="text-lg mb-4">{dua.translation}</p>
      {(dua.fawaid || dua.notes) && (
        <p className="text-sm italic mb-4">{dua.fawaid || dua.notes}</p>
      )}
      <div className="flex items-center gap-2">
        <Tag className="h-5 w-5" />
        <span className="text-sm capitalize">
          {dua.category.replace(/-/g, " ")}
        </span>
      </div>
    </div>
  );
}