"use client";

/**
 * Page de liste des projets
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { projectsApi } from '@/lib/api';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaPlus, FaProjectDiagram } from 'react-icons/fa';
import { getProjectStatusColor, getProjectStatusLabel, getPriorityColor, getPriorityLabel } from '@/lib/utils/helpers';
import type { Project } from '@/lib/types';

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsApi.getProjects();
      if (response.success && response.data) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des projets');
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
            <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
            <Link
              href="/projects/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaPlus className="mr-2" />
              Nouveau projet
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <FaProjectDiagram className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun projet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Commencez par créer un nouveau projet.
                </p>
                <div className="mt-6">
                  <Link
                    href="/projects/new"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <FaPlus className="mr-2" />
                    Nouveau projet
                  </Link>
                </div>
              </div>
            ) : (
              projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(project.priority)}`}>
                      {getPriorityLabel(project.priority)}
                    </span>
                  </div>
                  {project.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{project.description}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(project.status)}`}>
                      {getProjectStatusLabel(project.status)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">
                        {project.tasks?.length || 0} tâches
                      </div>
                      <div className="text-sm font-semibold text-blue-600">
                        {project.progress || 0}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress || 0}%` }}
                    ></div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
