/**
 * Composant des statistiques du dashboard
 */

import { FaTasks, FaHourglassHalf, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface StatsData {
  total: number;
  inProgress: number;
  done: number;
  overdue: number;
}

interface StatsProps {
  stats: StatsData;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const statCards = [
    {
      label: 'Total des tâches',
      value: stats.total,
      icon: FaTasks,
      color: 'bg-blue-500',
    },
    {
      label: 'En cours',
      value: stats.inProgress,
      icon: FaHourglassHalf,
      color: 'bg-yellow-500',
    },
    {
      label: 'Terminées',
      value: stats.done,
      icon: FaCheckCircle,
      color: 'bg-green-500',
    },
    {
      label: 'En retard',
      value: stats.overdue,
      icon: FaExclamationTriangle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
        >
          <div className={`${stat.color} p-3 rounded-lg`}>
            <stat.icon className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
