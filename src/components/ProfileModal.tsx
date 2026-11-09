import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  X,
  GraduationCap,
  Briefcase,
  DollarSign,
  Award,
  Code2,
  Save,
  CheckCircle2
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useApp();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [college, setCollege] = useState(profile.college);
  const [degree, setDegree] = useState(profile.degree);
  const [branch, setBranch] = useState(profile.branch);
  const [currentYear, setCurrentYear] = useState(profile.currentYear);
  const [cgpa, setCgpa] = useState(profile.cgpa.toString());
  const [targetPackage, setTargetPackage] = useState(profile.targetPackage);
  const [preferredRoles, setPreferredRoles] = useState(profile.preferredRoles.join(', '));
  const [careerInterests, setCareerInterests] = useState(profile.careerInterests.join(', '));
  const [leetcodeCount, setLeetcodeCount] = useState((profile.leetcodeCount || 280).toString());
  const [githubUsername, setGithubUsername] = useState(profile.githubUsername || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile({
      name,
      email,
      college,
      degree,
      branch,
      currentYear,
      cgpa: parseFloat(cgpa) || 8.5,
      targetPackage,
      preferredRoles: preferredRoles.split(',').map(s => s.trim()).filter(Boolean),
      careerInterests: careerInterests.split(',').map(s => s.trim()).filter(Boolean),
      leetcodeCount: parseInt(leetcodeCount) || 280,
      githubUsername,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 my-8">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Student Placement Profile</h2>
              <p className="text-xs text-slate-400">Update your academic credentials and target recruiter package.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">College / University</label>
              <input
                type="text"
                required
                value={college}
                onChange={e => setCollege(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Degree</label>
              <input
                type="text"
                value={degree}
                onChange={e => setDegree(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Branch / Specialization</label>
              <input
                type="text"
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Current CGPA (out of 10)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={cgpa}
                onChange={e => setCgpa(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Current Academic Year</label>
              <select
                value={currentYear}
                onChange={e => setCurrentYear(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              >
                <option value="Final Year (7th Sem)">Final Year (7th Sem)</option>
                <option value="Final Year (8th Sem)">Final Year (8th Sem)</option>
                <option value="Pre-Final Year (5th Sem)">Pre-Final Year (5th Sem)</option>
                <option value="Pre-Final Year (6th Sem)">Pre-Final Year (6th Sem)</option>
                <option value="Graduated 2025/2026">Graduated 2025/2026</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Target Package (CTC)</label>
              <select
                value={targetPackage}
                onChange={e => setTargetPackage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-emerald-400 focus:outline-none"
              >
                <option value="7 - 12 LPA">7 - 12 LPA (Mass Tech / Digital)</option>
                <option value="12 - 18 LPA">12 - 18 LPA (Product Mid-Tier)</option>
                <option value="18 - 25 LPA">18 - 25 LPA (Tier-1 SDE-1)</option>
                <option value="25 - 45+ LPA">25 - 45+ LPA (FAANG / HFT)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Preferred Job Roles (comma separated)</label>
            <input
              type="text"
              value={preferredRoles}
              onChange={e => setPreferredRoles(e.target.value)}
              placeholder="e.g. SDE-1, Backend Engineer, Cloud Developer"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Career Interests & Focus (comma separated)</label>
            <input
              type="text"
              value={careerInterests}
              onChange={e => setCareerInterests(e.target.value)}
              placeholder="e.g. Distributed Systems, Machine Learning, System Design"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Problems Solved (LeetCode / GfG)</label>
              <input
                type="number"
                value={leetcodeCount}
                onChange={e => setLeetcodeCount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">GitHub Username</label>
              <input
                type="text"
                value={githubUsername}
                onChange={e => setGithubUsername(e.target.value)}
                placeholder="e.g. arjunsharma-dev"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/25 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Placement Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
