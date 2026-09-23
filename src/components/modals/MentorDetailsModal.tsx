import React from "react";
import { X, Mail, Phone, Building2, Calendar, Clock, MapPin, Award, Send } from "lucide-react";

interface MentorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor?: {
    name: string;
    title: string;
    department: string;
    email: string;
    phone: string;
    office: string;
    officeHours: string;
    assignedInternsCount: number;
    specialization: string;
    avatarInitials: string;
  };
}

export const MentorDetailsModal: React.FC<MentorDetailsModalProps> = ({
  isOpen,
  onClose,
  mentor = {
    name: "Dr. Priya Sharma",
    title: "Senior Project Guide & Professor",
    department: "Department of Computer Science & Engineering",
    email: "priya.sharma@institution.edu",
    phone: "+91 98401 23456",
    office: "Block B, Room 304",
    officeHours: "Mon & Wed: 2:00 PM - 4:00 PM",
    assignedInternsCount: 8,
    specialization: "Cloud Architecture, Web Systems & AI",
    avatarInitials: "PS",
  },
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-white">
        {/* Header Background Banner */}
        <div className="h-28 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Avatar Overlay */}
        <div className="px-6 relative pb-6">
          <div className="flex justify-between items-end -mt-12 mb-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 text-3xl font-bold text-white shadow-xl ring-4 ring-slate-900">
              {mentor.avatarInitials}
            </div>
            <span className="rounded-full bg-green-500/20 border border-green-500/30 px-3 py-1 text-xs font-semibold text-green-400">
              ● Active Advisor
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">{mentor.name}</h2>
            <p className="text-sm font-medium text-purple-400">{mentor.title}</p>
            <p className="text-xs text-slate-400 mt-0.5">{mentor.department}</p>
          </div>

          {/* Details List */}
          <div className="mt-6 space-y-3.5 border-t border-slate-800 pt-5">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Email Address</p>
                <p className="font-medium text-white">{mentor.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Phone Number</p>
                <p className="font-medium text-white">{mentor.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-amber-400">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Office Location</p>
                <p className="font-medium text-white">{mentor.office}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-purple-400">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Office Hours</p>
                <p className="font-medium text-white">{mentor.officeHours}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-pink-400">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Specialization</p>
                <p className="font-medium text-white">{mentor.specialization}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <a
              href={`mailto:${mentor.email}`}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 shadow-lg shadow-blue-600/20"
            >
              <Send className="h-4 w-4" /> Send Email
            </a>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetailsModal;
