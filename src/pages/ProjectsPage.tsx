
import { useState, useEffect } from 'react';
import { getEntries, ContentTypes } from '@/lib/contentful';
import ProjectCard from '@/components/ProjectCard';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectEntries = await getEntries<any>(ContentTypes.PROJECT);
        setProjects(projectEntries);
        
        // Extract unique technologies for filtering
        const allTechnologies = projectEntries.flatMap(
          project => project.fields.technologiesUsed || []
        );
        const uniqueTechnologies = Array.from(new Set(allTechnologies));
        setCategories(uniqueTechnologies);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => 
        project.fields.technologiesUsed && project.fields.technologiesUsed.includes(filter)
      );
  
  return (
    <div className="py-12 md:py-16 content-transition">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <p className="text-muted-foreground">
            Explore my portfolio of projects, showcasing my skills and experiences in web development and design.
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="mb-8 overflow-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
              }`}
            >
              All Projects
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  filter === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(index => (
              <div key={index} className="bg-background rounded-lg shadow-sm p-4 h-64 animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.sys.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              {projects.length === 0 
                ? 'No projects found. Please add projects in Contentful.'
                : 'No projects match the selected filter.'}
            </p>
            {projects.length > 0 && filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="text-primary mt-2 hover:underline"
              >
                View all projects
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
