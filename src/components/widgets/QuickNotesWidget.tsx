import React, { useState } from "react";
import { StickyNote, Plus, Trash2 } from "lucide-react";

export const QuickNotesWidget: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([
    "Review backend API integration docs",
    "Revise data structures assignment",
    "Prepare daily work memo for mentor review",
    "Check internship project submission checklist",
  ]);

  const [input, setInput] = useState("");

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setNotes([input.trim(), ...notes]);
    setInput("");
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md text-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
              <StickyNote className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">Quick Notes</h3>
          </div>
          <span className="text-xs text-slate-500">{notes.length} items</span>
        </div>

        <form onSubmit={addNote} className="flex gap-2 mb-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a quick note..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-xl bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-purple-500"
          >
            <Plus className="h-4 w-4" />
          </button>
        </form>

        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
          {notes.map((note, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-300 transition hover:border-slate-700"
            >
              <span className="flex-1 truncate">• {note}</span>
              <button
                onClick={() => deleteNote(idx)}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-[11px] text-center text-slate-500 italic">
        Keep going! You're doing great. 💜
      </p>
    </div>
  );
};

export default QuickNotesWidget;
