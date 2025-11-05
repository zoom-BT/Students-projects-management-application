/**
 * Composant Dashboard - Vue d'ensemble
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import taskService from '../../services/taskService';
import projectService from '../../services/projectService';
import LoadingSpinner from '../common/LoadingSpinner';
import Stats from './Stats';
import { FaProjectDiagram, FaTasks, FaPlus } from 'react-icons/fa';
import { getStatusLabel, getStatusColor, getPriorityColor } from '../../utils/helpers';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, projectsRes, tasksRes] = await Promise.all([
        taskService.getTaskStats(),
        projectService.getProjects({ status: 'active' }),
        taskService.getTasks({ status: 'in_progress' })
      ]);

      if (statsRes.success) setStats(statsRes.data.stats);
      if (projectsRes.success) setProjects(projectsRes.data.projects.slice(0, 5));
      if (tasksRes.success) setRecentTasks(tasksRes.data.tasks.slice(0, 5));
    } catch (error) {
      toast.error('Erreur lors du chargement du dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <div className="flex space-x-3">
          <Link
            to="/projects/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaPlus className="mr-2" />
            Nouveau projet
          </Link>
          <Link
            to="/tasks/new"
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
            <Link to="/projects" className="text-blue-600 hover:text-blue-700 text-sm">
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
                  to={`/projects/${project.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {project.stats?.totalTasks || 0} tâches
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
                            strokeDasharray={`${(project.stats?.progress || 0) * 1.76} 176`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-semibold">
                            {project.stats?.progress || 0}%
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
            <Link to="/tasks" className="text-blue-600 hover:text-blue-700 text-sm">
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
                  to={`/tasks/${task.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                      {getStatusLabel(task.status)}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
