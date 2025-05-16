
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProjectFields, getAssetUrl } from '@/lib/contentful';

interface ProjectCardProps {
  project: {
    sys: {
      id: string;
    };
    fields: ProjectFields;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { fields } = project;
  const imageUrl = fields.featuredImage ? getAssetUrl(fields.featuredImage) : '/placeholder.svg';

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={fields.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="text-xl font-semibold line-clamp-1">{fields.title}</h3>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {fields.technologiesUsed && fields.technologiesUsed.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="inline-flex items-center text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
          {fields.technologiesUsed && fields.technologiesUsed.length > 3 && (
            <span className="text-xs font-medium text-muted-foreground">
              +{fields.technologiesUsed.length - 3} more
            </span>
          )}
        </div>
        
        <p className="text-muted-foreground mt-3 line-clamp-2">
          {fields.description}
        </p>
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <div className="flex justify-between w-full">
          <Button variant="outline" asChild>
            <Link to={`/projects/${fields.slug}`}>View Details</Link>
          </Button>
          
          {fields.githubUrl && (
            <Button variant="ghost" asChild>
              <a href={fields.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
