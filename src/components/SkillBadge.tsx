
import { cn } from '@/lib/utils';
import { SkillFields } from '@/lib/contentful';

interface SkillBadgeProps {
  skill: {
    fields: SkillFields;
  };
  className?: string;
}

const SkillBadge = ({ skill, className }: SkillBadgeProps) => {
  const { fields } = skill;
  
  // Calculate color based on proficiency level
  const getColorClass = () => {
    const level = fields.proficiencyLevel || 0;
    if (level >= 8) return 'bg-primary text-primary-foreground';
    if (level >= 5) return 'bg-secondary text-secondary-foreground';
    return 'bg-muted text-muted-foreground';
  };
  
  return (
    <div className={cn(
      "flex items-center px-3 py-1.5 rounded-full text-sm font-medium",
      getColorClass(),
      className
    )}>
      {fields.name}
    </div>
  );
};

export default SkillBadge;
