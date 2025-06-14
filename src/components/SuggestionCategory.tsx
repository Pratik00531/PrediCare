
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import SuggestionItem from './SuggestionItem';

interface SuggestionItemData {
  title: string;
  description: string;
  priority: string;
  timeline: string;
  status: string;
}

interface SuggestionCategoryProps {
  category: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  cardBgColor: string;
  items: SuggestionItemData[];
}

const SuggestionCategory = ({ category, icon: Icon, color, bgColor, cardBgColor, items }: SuggestionCategoryProps) => {
  return (
    <Card className={`p-6 mb-8 ${cardBgColor}`}>
      <div className="flex items-center space-x-2 mb-6">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <h3 className="text-xl font-semibold text-theme-gray-900">{category}</h3>
      </div>
      
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item, itemIndex) => (
          <SuggestionItem
            key={itemIndex}
            title={item.title}
            description={item.description}
            priority={item.priority}
            timeline={item.timeline}
            status={item.status}
          />
        ))}
      </div>
    </Card>
  );
};

export default SuggestionCategory;
