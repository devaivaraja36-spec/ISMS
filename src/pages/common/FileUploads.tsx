import React, { useState } from "react";
import { Upload, FileText, Download, Trash2, Eye, Filter, Search, CheckCircle2, Clock, AlertCircle, FileCode, FileSpreadsheet, Plus, X } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import MentorSidebar from "../../components/layout/MentorSidebar";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { useAuth } from "../../context/AuthContext";

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  category: "Project Report" | "Work Memo" | "Assignment" | "Certificate" | "Presentation" | "Code";
  uploadedBy: string;
  userRole: "student" | "mentor" | "admin";
  uploadDate: string;
  status: "Approved" | "Pending Review" | "Feedback Given";
  fileType: "pdf" | "docx" | "zip" | "code" | "image";
}

const DEFAULT_FILES: UploadedFile[] = [
  {
    id: "f1",
    name: "Internship_Final_Report_v1.pdf",
    size: "2.4 MB",
    category: "Project Report",
    uploadedBy: "Arun Kumar",
    userRole: "student",
    uploadDate: "Sep 18, 2026",
    status: "Approved",
    fileType: "pdf",
  },
  {
    id: "f2",
    name: "Weekly_Work_Memo_Week4.docx",
    size: "450 KB",
    category: "Work Memo",
    uploadedBy: "Rahul Kumar",
    userRole: "student",
    uploadDate: "Sep 19, 2026",
    status: "Pending Review",
    fileType: "docx",
  },
  {
    id: "f3",
    name: "AI_Analytics_Source_Code.zip",
    size: "14.8 MB",
    category: "Code",
    uploadedBy: "Dr. Priya Sharma",
    userRole: "mentor",
    uploadDate: "Sep 15, 2026",
    status: "Approved",
    fileType: "zip",
  },
  {
    id: "f4",
    name: "System_Architecture_Presentation.pptx",
    size: "5.1 MB",
    category: "Presentation",
    uploadedBy: "Sneha Patel",
    userRole: "student",
    uploadDate: "Sep 17, 2026",
    status: "Feedback Given",
    fileType: "pdf",
  },
];

export const FileUploads: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.role || "student";

  const [files, setFiles] = useState<UploadedFile[]>(DEFAULT_FILES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [dragActive, setDragActive] = useState(false);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);

  // Upload modal state
  const [isUploading, setIsUploading] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newCategory, setNewCategory] = useState<UploadedFile["category"]>("Project Report");

  const categories = ["All", "Project Report", "Work Memo", "Assignment", "Certificate", "Presentation", "Code"];

  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const dropped = e.dataTransfer.files[0];
      setNewFileName(dropped.name);
      setIsUploading(true);
    }
  };

  const handleAddFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const newFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: newFileName,
      size: "1.2 MB",
      category: newCategory,
      uploadedBy: user?.name || "CurrentUser",
      userRole: userRole as any,
      uploadDate: "Sep 20, 2026",
      status: "Pending Review",
      fileType: newFileName.endsWith(".zip") ? "zip" : newFileName.endsWith(".pdf") ? "pdf" : "docx",
    };

    setFiles([newFile, ...files]);
    setIsUploading(false);
    setNewFileName("");
    alert("File uploaded successfully!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      setFiles(files.filter((f) => f.id !== id));
    }
  };

  const handleDownload = (file: UploadedFile) => {
    alert(`Downloading ${file.name}...`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Role-based Sidebar */}
      {userRole === "admin" && <AdminSidebar />}
      {userRole === "mentor" && <MentorSidebar />}
      {userRole === "student" && <Sidebar />}

      {/* Main Content */}
      <main className="ml-20 transition-all duration-300 flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">File Uploads & Documents</h1>
            <p className="mt-1 text-sm text-slate-400">
              Upload, organize, and share project reports, memos, and assignments.
            </p>
          </div>

          <button
            onClick={() => setIsUploading(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            <Upload className="h-5 w-5" /> Upload Document
          </button>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative mb-8 rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            dragActive
              ? "border-blue-500 bg-blue-500/10 scale-[1.01]"
              : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
          }`}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 mb-4">
            <Upload className="h-8 w-8 animate-bounce" />
          </div>
          <h3 className="text-lg font-semibold text-white">Drag & drop files here to upload</h3>
          <p className="mt-1 text-xs text-slate-400">
            Supports PDF, DOCX, ZIP, Code files, and images up to 50MB
          </p>

          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition">
            <span>Browse Files</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewFileName(e.target.files[0].name);
                  setIsUploading(true);
                }
              }}
            />
          </label>
        </div>

        {/* Search & Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents by name or user..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter className="h-4 w-4 text-slate-500 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium shrink-0 transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "border border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Uploaded Files Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 font-semibold uppercase tracking-wider text-slate-400">
                  <th className="p-4">Document Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Uploaded By</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="transition hover:bg-slate-800/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          {file.fileType === "code" ? (
                            <FileCode className="h-5 w-5 text-purple-400" />
                          ) : (
                            <FileText className="h-5 w-5 text-blue-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{file.name}</p>
                          <p className="text-[11px] text-slate-500">{file.size}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300 border border-slate-700">
                        {file.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <div>
                        <p className="font-medium text-slate-200">{file.uploadedBy}</p>
                        <span className="text-[10px] capitalize text-slate-500">{file.userRole}</span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-400">{file.uploadDate}</td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          file.status === "Approved"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : file.status === "Pending Review"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        }`}
                      >
                        {file.status === "Approved" && <CheckCircle2 className="h-3 w-3" />}
                        {file.status === "Pending Review" && <Clock className="h-3 w-3" />}
                        {file.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setPreviewFile(file)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                          title="Preview File"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDownload(file)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-blue-400"
                          title="Download File"
                        >
                          <Download className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(file.id)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                          title="Delete File"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload File Modal */}
        {isUploading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-white">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Upload className="h-4 w-4 text-blue-400" /> Confirm Document Upload
                </h3>
                <button onClick={() => setIsUploading(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddFileSubmit} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">File Name</label>
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Category Tag</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white outline-none"
                  >
                    <option value="Project Report">Project Report</option>
                    <option value="Work Memo">Work Memo</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Code">Code</option>
                  </select>
                </div>

                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-[11px] text-blue-300">
                  Document will be submitted for mentor and admin review upon uploading.
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsUploading(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500 shadow-md shadow-blue-600/20"
                  >
                    Upload Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-white">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">{previewFile.name}</h3>
                </div>
                <button onClick={() => setPreviewFile(null)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="my-6 rounded-xl border border-slate-800 bg-slate-950 p-6 text-center">
                <FileText className="mx-auto h-16 w-16 text-blue-400 mb-3" />
                <p className="text-sm font-semibold text-white">{previewFile.name}</p>
                <p className="text-xs text-slate-400 mt-1">Size: {previewFile.size} • Category: {previewFile.category}</p>
                <p className="text-xs text-slate-500 mt-2">Uploaded by {previewFile.uploadedBy} on {previewFile.uploadDate}</p>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setPreviewFile(null)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(previewFile)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                >
                  Download File
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FileUploads;
