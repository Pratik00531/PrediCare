
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-theme-seafoam text-white';
    case 'in-progress':
      return 'bg-theme-indigo-200 text-theme-indigo-800';
    case 'urgent':
      return 'bg-theme-blue-200 text-theme-blue-800';
    default:
      return 'bg-theme-gray-100 text-theme-gray-600';
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-theme-blue-200 text-theme-blue-800';
    case 'Medium':
      return 'bg-theme-indigo-200 text-theme-indigo-800';
    default:
      return 'bg-theme-seafoam-200 text-theme-seafoam-800';
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'urgent':
      return 'Urgent';
    default:
      return 'Recommended';
  }
};
