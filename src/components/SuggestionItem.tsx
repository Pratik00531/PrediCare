
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { getStatusColor, getPriorityColor, getStatusLabel } from '@/utils/suggestionUtils';

interface SuggestionItemProps {
  title: string;
  description: string;
  priority: string;
  timeline: string;
  status: string;
}

const SuggestionItem = ({ title, description, priority, timeline, status }: SuggestionItemProps) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-theme-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="font-semibold text-theme-gray-900">{title}</h4>
          <Badge className={getStatusColor(status)}>
            {getStatusLabel(status)}
          </Badge>
        </div>
        
        <p className="text-sm text-theme-gray-600">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(priority)}>
              {priority}
            </Badge>
            <div className="flex items-center space-x-1 text-xs text-theme-gray-500">
              <Clock className="w-3 h-3" />
              <span>{timeline}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionItem;
