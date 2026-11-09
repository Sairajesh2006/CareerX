import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, JobApplication } from '../types';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Kanban,
  Table as TableIcon,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Edit2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

const STATUS_COLUMNS: ApplicationStatus[] = [
  'Interested',
  'Applied',
  'Online Assessment',
  'Technical Interview',
  'HR Interview',
  'Selected',
  'Rejected',
];

const STATUS_BADGE_STYLES: Record<ApplicationStatus, string> = {
  'Interested': 'bg-slate-800 text-slate-300 border-slate-700',
  'Applied': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Online Assessment': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Technical Interview': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'HR Interview': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Selected': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-bold',
  'Rejected': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const ApplicationTracker: React.FC = () => {
  const { 
    jobApplications, 
    addJobApplication, 
    updateJobApplication, 
    deleteJobApplication 
  } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);

  // Form state for adding/editing
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('Software Development Engineer (SDE-1)');
  const [packageCTC, setPackageCTC] = useState('22.0 LPA');
  const [location, setLocation] = useState('Bangalore / Remote');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<ApplicationStatus>('Applied');
  const [notes, setNotes] = useState('');

  const openAddModal = () => {
    setEditingApp(null);
    setCompanyName('');
    setRole('Software Development Engineer (SDE-1)');
    setPackageCTC('20.0 LPA');
    setLocation('Bangalore');
    setApplicationDate(new Date().toISOString().split('T')[0]);
    setStatus('Applied');
    setNotes('');
    setShowAddModal(true);
  };

  const openEditModal = (app: JobApplication) => {
    setEditingApp(app);
    setCompanyName(app.companyName);
    setRole(app.role);
    setPackageCTC(app.packageCTC);
    setLocation(app.location);
    setApplicationDate(app.applicationDate);
    setStatus(app.status);
    setNotes(app.notes || '');
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    if (editingApp) {
      updateJobApplication(editingApp.id, {
        companyName,
        role,
        packageCTC,
        location,
        applicationDate,
        status,
        notes,
      });
    } else {
      addJobApplication({
        companyName,
        role,
        packageCTC,
        location,
        applicationDate,
        status,
        roundsCompleted: status === 'Selected' ? 4 : status === 'Technical Interview' ? 2 : status === 'Online Assessment' ? 1 : 0,
        totalRounds: 4,
        notes,
      });
    }

    setShowAddModal(false);
  };

  // Filter applications
  const filteredApps = jobApplications.filter(app => {
    const matchesSearch = 
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-cyan-950/60 border border-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>Pipeline & Offer Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Placement Application Tracker
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Track on-campus recruitment, off-campus referrals, online assessment links, and technical rounds in an interactive Kanban pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Company Application</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-slate-400">Total Tracked</div>
            <div className="text-xl font-bold text-white mt-0.5">{jobApplications.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-cyan-400">Active Pipelines</div>
            <div className="text-xl font-bold text-cyan-300 mt-0.5">
              {jobApplications.filter(a => a.status !== 'Rejected' && a.status !== 'Selected').length}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-indigo-400">Interviews in Progress</div>
            <div className="text-xl font-bold text-indigo-300 mt-0.5">
              {jobApplications.filter(a => a.status === 'Technical Interview' || a.status === 'HR Interview').length}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-emerald-400">Offers Secured 🏆</div>
            <div className="text-xl font-bold text-emerald-300 mt-0.5">
              {jobApplications.filter(a => a.status === 'Selected').length}
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter & View Mode Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status filter dropdown */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            {STATUS_COLUMNS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* View mode toggle (Kanban vs Table) */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 self-end sm:self-auto text-xs">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
              viewMode === 'kanban'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 overflow-x-auto pb-4">
          {STATUS_COLUMNS.map(colStatus => {
            const appsInCol = filteredApps.filter(a => a.status === colStatus);

            return (
              <div
                key={colStatus}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/90 flex flex-col min-w-[260px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{colStatus}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400">
                      {appsInCol.length}
                    </span>
                  </div>
                </div>

                {/* Applications list */}
                <div className="space-y-3 flex-1">
                  {appsInCol.length === 0 ? (
                    <div className="h-24 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-[11px] text-slate-600 italic">
                      No applications
                    </div>
                  ) : (
                    appsInCol.map(app => (
                      <div
                        key={app.id}
                        className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all shadow-sm group relative"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                              {app.companyName}
                            </h4>
                            <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{app.role}</div>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-400 shrink-0">
                            {app.packageCTC}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-2.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {app.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {app.applicationDate}
                          </span>
                        </div>

                        {app.notes && (
                          <p className="text-[10px] text-slate-400 mt-2 bg-slate-900/60 p-1.5 rounded border border-slate-850 line-clamp-2">
                            {app.notes}
                          </p>
                        )}

                        {/* Status change actions */}
                        <div className="mt-3 pt-2.5 border-t border-slate-850 flex items-center justify-between">
                          <select
                            value={app.status}
                            onChange={e => updateJobApplication(app.id, { status: e.target.value as ApplicationStatus })}
                            className="text-[10px] bg-slate-900 text-slate-300 border border-slate-800 rounded px-1.5 py-1 focus:outline-none"
                          >
                            {STATUS_COLUMNS.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditModal(app)}
                              className="p-1 text-slate-500 hover:text-slate-300"
                              title="Edit application"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteJobApplication(app.id)}
                              className="p-1 text-slate-500 hover:text-rose-400"
                              title="Delete application"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Company</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">CTC / Package</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Applied Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 italic">
                      No applications found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map(app => (
                    <tr key={app.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="p-3.5 font-bold text-white">
                        {app.companyName}
                      </td>
                      <td className="p-3.5 text-slate-300">{app.role}</td>
                      <td className="p-3.5 font-bold text-emerald-400">{app.packageCTC}</td>
                      <td className="p-3.5 text-slate-400">{app.location}</td>
                      <td className="p-3.5 text-slate-400">{app.applicationDate}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${STATUS_BADGE_STYLES[app.status]}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(app)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteJobApplication(app.id)}
                            className="p-1 text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-white mb-1">
              {editingApp ? 'Edit Application Details' : 'Add Placement Job Application'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Keep track of company deadlines, CTC offerings, and interview status.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amazon, Google, Razorpay"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Role / Cadre</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SDE-1, Cloud Associate"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Package (CTC)</label>
                  <input
                    type="text"
                    placeholder="e.g. 18.5 LPA"
                    value={packageCTC}
                    onChange={e => setPackageCTC(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore / Remote"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Application Date</label>
                  <input
                    type="date"
                    value={applicationDate}
                    onChange={e => setApplicationDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Current Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as ApplicationStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    {STATUS_COLUMNS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Notes & Next Round Details</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Cleared OA, Round 2 on Tuesday with emphasis on Graphs..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-500/25"
                >
                  {editingApp ? 'Update Application' : 'Save Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
