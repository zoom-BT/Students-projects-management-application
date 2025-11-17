/**
 * Liste des projets
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import projectService from '../../services/projectService';
import LoadingSpinner from '../common/LoadingSpinner';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { getStatusColor, getStatusLabel, getPriorityLabel } from '../../utils/helpers';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getProjects({ search });
      if (response.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
        <Link
          to="/projects/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Nouveau projet
        </Link>
      </div>

      {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="flex space-x-2">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un projet..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Rechercher
        </button>
      </form>

      {/* Liste des projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Aucun projet trouvé</p>
          </div>
        ) : (
          projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description || 'Pas de description'}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {project.stats?.totalTasks || 0} tâches
                </span>
                <span className="font-semibold text-blue-600">
                  {project.stats?.progress || 0}% complété
                </span>
              </div>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${project.stats?.progress || 0}%` }}
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;
