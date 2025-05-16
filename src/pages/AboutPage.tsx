
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import RichText from '@/components/RichText';
import SkillBadge from '@/components/SkillBadge';
import { getEntries, getAboutInfo, ContentTypes, getAssetUrl, AboutFields } from '@/lib/contentful';

const AboutPage = () => {
  const [aboutInfo, setAboutInfo] = useState<{fields: AboutFields} | null>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch about information
        const aboutData = await getAboutInfo();
        setAboutInfo(aboutData);
        
        // Fetch skills
        const skillsData = await getEntries<any>(ContentTypes.SKILL);
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching about page data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.fields.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);
  
  return (
    <div className="py-12 md:py-16 content-transition">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-muted-foreground">
            Learn more about my background, skills, and what drives me as a developer.
          </p>
        </div>
        
        {loading ? (
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
              <div className="lg:col-span-2">
                <div className="aspect-square max-w-md mx-auto">
                  <img 
                    src={aboutInfo?.fields?.profileImage ? 
                      `https:${aboutInfo.fields.profileImage.fields.file.url}` : 
                      '/placeholder.svg'
                    }
                    alt={aboutInfo?.fields?.name || 'Profile'} 
                    className="w-full h-full object-cover rounded-2xl" 
                  />
                </div>
                
                {aboutInfo?.fields && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold">
                      {aboutInfo.fields.name || 'John Doe'}
                    </h2>
                    <p className="text-xl text-muted-foreground">
                      {aboutInfo.fields.title || 'Full Stack Developer'}
                    </p>
                    
                    {aboutInfo.fields.location && (
                      <p className="mt-2 text-muted-foreground">
                        📍 {aboutInfo.fields.location}
                      </p>
                    )}
                    
                    <div className="mt-4 space-y-2">
                      {aboutInfo.fields.email && (
                        <p>
                          <span className="font-medium">Email:</span>{' '}
                          <a href={`mailto:${aboutInfo.fields.email}`} className="text-primary hover:underline">
                            {aboutInfo.fields.email}
                          </a>
                        </p>
                      )}
                    </div>
                    
                    {aboutInfo.fields.socialLinks && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {Object.entries(aboutInfo.fields.socialLinks as Record<string, string>).map(([platform, url]) => (
                          <a 
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-secondary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {platform}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-3">
                <div className="prose max-w-none">
                  <h2 className="text-3xl font-bold mb-6">My Story</h2>
                  
                  {aboutInfo?.fields?.bio ? (
                    <RichText content={aboutInfo.fields.bio} />
                  ) : (
                    <div className="text-muted-foreground">
                      <p>
                        I am a passionate developer focused on creating exceptional digital experiences with 
                        modern technologies. With a keen eye for design and attention to detail, I strive to 
                        build applications that are not only functional but also beautiful and user-friendly.
                      </p>
                      <p className="mt-4">
                        Throughout my journey as a developer, I've gained expertise in front-end and back-end 
                        technologies, allowing me to craft full-stack solutions that meet client needs and exceed expectations.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
                  
                  {Object.keys(skillsByCategory).length > 0 ? (
                    <div className="space-y-8">
                      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                        <div key={category}>
                          <h3 className="text-xl font-medium mb-4">{category}</h3>
                          <div className="flex flex-wrap gap-2">
                            {categorySkills.map(skill => (
                              <SkillBadge key={skill.sys.id} skill={skill} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      No skills information available. Please add skills in Contentful.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Work Together</h2>
              <p className="max-w-2xl mx-auto mb-6">
                I'm always interested in new opportunities and collaborations. If you have a project in mind or just want to connect, don't hesitate to reach out!
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
