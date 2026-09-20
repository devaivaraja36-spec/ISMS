import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertTriangle, X, Clock, FileText, User } from "lucide-react";

interface SendDeadlineEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  studentEmail?: string;
  projectName?: string;
  dueDate?: string;
  senderRole?: "Admin" | "Mentor";
  senderName?: string;
}

export const SendDeadlineEmailModal: React.FC<SendDeadlineEmailModalProps> = ({
  isOpen,
  onClose,
  studentName = "Arun Kumar",
  studentEmail = "arun@example.com",
  projectName = "Internship Activity Monitoring System",
  dueDate = "May 30, 2024",
  senderRole = "Mentor",
  senderName = senderRole === "Admin" ? "System Administrator" : "Dr. Priya Sharma",
}) => {
  const defaultSubject = `⚠️ Urgent: Project Deadline Reminder for "${projectName}"`;
  const defaultBody = `Dear ${studentName},

This is an official deadline notification from your ${senderRole} (${senderName}) regarding your internship project "${projectName}".

Your upcoming submission deadline is on ${dueDate} (Due in 2 Days).

Please wrap up all pending work memos, code commits, and project reports, and submit your final deliverables before the official cutoff.

If you encounter any technical blockers or require guidance, please contact your assigned mentor immediately.

Best regards,
${senderName}
${senderRole} • InternTrack Monitoring Portal`;

  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fadeIn text-white">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Send Deadline Warning Email</h3>
              <p className="text-xs text-slate-400">Official notification to student before deadline</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {sentSuccess ? (
          <div className="p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-4 ring-emerald-500/30">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="mt-4 text-xl font-bold text-white">Deadline Warning Email Sent!</h4>
            <p className="mt-1 text-xs text-slate-400">
              Default reminder email sent to <span className="text-blue-400 font-semibold">{studentEmail}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-4 text-xs">
            {/* Target Student Info Badge */}
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
              <div className="flex items-center gap-2.5">
                <User className="h-4 w-4 text-purple-400" />
                <div>
                  <span className="font-semibold text-white">{studentName}</span>
                  <span className="text-slate-400"> ({studentEmail})</span>
                </div>
              </div>
              <span className="rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold">
                Due: {dueDate}
              </span>
            </div>

            {/* Email Subject */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Email Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Default Mail Content */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Pre-Filled Deadline Message Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={9}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-slate-200 outline-none focus:border-blue-500 font-mono leading-relaxed"
                required
              />
            </div>

            {/* Template Notice */}
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-[11px] text-blue-300 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-blue-400" />
              <span>
                Default notification template prepared by <strong>{senderRole} ({senderName})</strong>. Click send to issue email to intern candidate.
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition"
              >
                <Send className="h-4 w-4" /> Send Warning Email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SendDeadlineEmailModal;
