
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { getEntries, ContentTypes, ProjectFields, AboutFields } from '@/lib/contentful';

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [aboutInfo, setAboutInfo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured projects
        const projects = await getEntries<any>(ContentTypes.PROJECT);
        const featured = projects
          .filter(project => project.fields.featured)
          .slice(0, 3);
        setFeaturedProjects(featured);
        
        // Fetch about information
        const aboutEntries = await getEntries<any>(ContentTypes.ABOUT);
        if (aboutEntries.length > 0) {
          setAboutInfo(aboutEntries[0]);
        }
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="content-transition">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold">
              Creating Digital<br className="hidden md:block" /> Experiences
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
              Full-stack developer specializing in crafting beautiful, functional, and user-friendly web applications.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/projects">View Projects</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Button variant="ghost" asChild>
              <Link to="/projects" className="flex items-center gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(index => (
                <div key={index} className="bg-background rounded-lg shadow-sm p-4 h-64 animate-pulse" />
              ))}
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map(project => (
                <ProjectCard key={project.sys.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-muted-foreground">
              No featured projects available. Please add projects in Contentful.
            </p>
          )}
        </div>
      </section>
      
      {/* About Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              {aboutInfo ? (
                <>
                  <h3 className="text-xl mb-4">{aboutInfo.fields.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {aboutInfo.fields.bio?.content ? 
                      aboutInfo.fields.bio.content[0]?.content[0]?.value?.substring(0, 200) + '...' :
                      'I am a developer passionate about creating exceptional digital experiences...'}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl mb-4">Full Stack Developer</h3>
                  <p className="text-muted-foreground mb-6">
                    I am a developer passionate about creating exceptional digital experiences with modern technologies. My focus is on building responsive, accessible, and performant web applications.
                  </p>
                </>
              )}
              <Button asChild>
                <Link to="/about">Learn More About Me</Link>
              </Button>
            </div>
            
            <div className="aspect-square max-w-md mx-auto">
              <img 
                src={aboutInfo?.fields?.profileImage ? 
                  `https:${aboutInfo.fields.profileImage.fields.file.url}` : 
                  '/placeholder.svg'
                }
                alt="Profile" 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/90">
            Let's collaborate to bring your ideas to life with cutting-edge technologies and exceptional design.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
