
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RichText from '@/components/RichText';
import { getEntryBySlug, ContentTypes, getAssetUrl } from '@/lib/contentful';

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const projectEntry = await getEntryBySlug<any>(ContentTypes.PROJECT, slug);
        
        if (!projectEntry) {
          setError('Project not found');
          return;
        }
        
        setProject(projectEntry);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [slug]);
  
  if (loading) {
    return (
      <div className="py-16 container mx-auto content-transition">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
          <div className="h-64 bg-gray-200 rounded w-full mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        </div>
      </div>
    );
  }
  
  if (error || !project) {
    return (
      <div className="py-16 container mx-auto text-center content-transition">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-muted-foreground mb-6">{error || 'Project not found'}</p>
        <Button asChild>
          <Link to="/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }
  
  const { fields } = project;
  const imageUrl = fields.featuredImage ? getAssetUrl(fields.featuredImage) : '/placeholder.svg';
  
  return (
    <div className="py-12 md:py-16 container mx-auto content-transition">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/projects" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
        
        <h1 className="text-3xl md:text-4xl font-bold">{fields.title}</h1>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {fields.technologiesUsed && fields.technologiesUsed.map((tech: string, index: number) => (
            <span 
              key={index}
              className="inline-flex items-center text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-8">
        <img
          src={imageUrl}
          alt={fields.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Project Links */}
      {(fields.projectUrl || fields.githubUrl) && (
        <div className="flex flex-wrap gap-4 mb-8">
          {fields.projectUrl && (
            <Button asChild>
              <a href={fields.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Globe className="mr-2 h-4 w-4" /> View Live Project
              </a>
            </Button>
          )}
          
          {fields.githubUrl && (
            <Button variant="outline" asChild>
              <a href={fields.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="mr-2 h-4 w-4" /> View Source Code
              </a>
            </Button>
          )}
        </div>
      )}
      
      {/* Project Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-muted-foreground">{fields.description}</p>
      </div>
      
      {/* Project Content */}
      {fields.content && (
        <div className="prose max-w-none">
          <RichText content={fields.content} />
        </div>
      )}
      
      <div className="mt-12 border-t border-border pt-6">
        <Button asChild>
          <Link to="/contact" className="flex items-center">
            Interested in working together? Get in touch
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
