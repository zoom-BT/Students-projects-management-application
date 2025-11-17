"use client";

/**
 * Page Dashboard - Vue d'ensemble
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { tasksApi, projectsApi } from '@/lib/api';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Stats from '@/components/dashboard/Stats';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaProjectDiagram, FaTasks, FaPlus } from 'react-icons/fa';
import { getPriorityColor, getTaskStatusColor, getTaskStatusLabel } from '@/lib/utils/helpers';
import type { Project, Task } from '@/lib/types';

interface DashboardStats {
  total: number;
  inProgress: number;
  done: number;
  overdue: number;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, projectsRes, tasksRes] = await Promise.all([
        tasksApi.getTaskStats(),
        projectsApi.getProjects({ status: 'active' }),
        tasksApi.getTasks({ status: 'in-progress' }),
      ]);

      if (statsRes.success && statsRes.data) {
        // Transform the stats to match the expected format
        const dashboardStats: DashboardStats = {
          total: (statsRes.data as any).totalTasks || 0,
          inProgress: (statsRes.data as any).inProgressTasks || 0,
          done: (statsRes.data as any).completedTasks || 0,
          overdue: (statsRes.data as any).overdueTasks || 0,
        };
        setStats(dashboardStats);
      }
      if (projectsRes.success && projectsRes.data) {
        setProjects(projectsRes.data.projects.slice(0, 5));
      }
      if (tasksRes.success && tasksRes.data) {
        setRecentTasks(tasksRes.data.tasks.slice(0, 5));
      }
    } catch (error) {
      toast.error('Erreur lors du chargement du dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <LoadingSpinner fullScreen />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <div className="flex space-x-3">
              <Link
                href="/projects/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus className="mr-2" />
                Nouveau projet
              </Link>
              <Link
                href="/tasks/new"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FaPlus className="mr-2" />
                Nouvelle tâche
              </Link>
            </div>
          </div>

          {/* Statistiques */}
          {stats && <Stats stats={stats} />}

          {/* Projets actifs et tâches en cours */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Projets actifs */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaProjectDiagram className="mr-2 text-blue-600" />
                  Projets actifs
                </h2>
                <Link href="/projects" className="text-blue-600 hover:text-blue-700 text-sm">
                  Voir tout
                </Link>
              </div>
              <div className="space-y-3">
                {projects.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Aucun projet actif</p>
                ) : (
                  projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {project.tasks?.length || 0} tâches
                          </p>
                        </div>
                        <div className="w-16 h-16">
                          <div className="relative w-full h-full">
                            <svg className="transform -rotate-90 w-16 h-16">
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#e5e7eb"
                                strokeWidth="4"
                                fill="none"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${(project.progress || 0) * 1.76} 176`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-semibold">
                                {project.progress || 0}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Tâches en cours */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaTasks className="mr-2 text-green-600" />
                  Tâches en cours
                </h2>
                <Link href="/tasks" className="text-blue-600 hover:text-blue-700 text-sm">
                  Voir tout
                </Link>
              </div>
              <div className="space-y-3">
                {recentTasks.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Aucune tâche en cours</p>
                ) : (
                  recentTasks.map((task) => (
                    <Link
                      key={task.id}
                      href={`/tasks/${task.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getTaskStatusColor(task.status)}`}>
                          {getTaskStatusLabel(task.status)}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
