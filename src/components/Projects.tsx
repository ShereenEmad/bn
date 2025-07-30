import React, { useState, useEffect } from 'react';
import { Heart, Eye, Github, ExternalLink, Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import ProjectEditor from './ProjectEditor';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  likes: string[];
  views: number;
  githubUrl?: string;
  liveUrl?: string;
}

export default function Projects() {
  const { t } = useLanguage();
  const { user, addActivity } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    // Load projects from localStorage or set default
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      const defaultProjects: Project[] = [
        {
          id: '1',
          title: 'E-Commerce Website',
          description: 'Modern e-commerce platform with React and responsive design',
          image: 'https://tse2.mm.bing.net/th/id/OIP.rioxJFihSDk4o1DAC_MlhAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3',
          technologies: ['React', 'CSS3', 'JavaScript'],
          likes: [],
          views: 0
        },
        {
          id: '2',
          title: 'Portfolio Website',
          description: 'Personal portfolio showcasing modern web design principles',
          image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
          technologies: ['HTML5', 'CSS3', 'JavaScript'],
          likes: [],
          views: 0
        },
        {
          id: '3',
          title: 'Landing Page',
          description: 'High-converting landing page with modern animations',
          image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
          technologies: ['HTML5', 'Tailwind', 'JavaScript'],
          likes: [],
          views: 0
        },
        {
          id: '4',
          title: 'Dashboard App',
          description: 'Modern admin dashboard with data visualization',
          image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
          technologies: ['React', 'Bootstrap', 'Chart.js'],
          likes: [],
          views: 0
        },
        {
          id: '5',
          title: 'Todo App',
          description: 'Feature-rich task management application',
          image: 'https://images.pexels.com/photos/1226398/pexels-photo-1226398.jpeg?auto=compress&cs=tinysrgb&w=800',
          technologies: ['React', 'CSS3', 'LocalStorage'],
          likes: [],
          views: 0
        },
        {
          id: '6',
          title: 'Weather App',
          description: 'Beautiful weather application with API integration',
          image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
          technologies: ['JavaScript', 'CSS3', 'Weather API'],
          likes: [],
          views: 0
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('projects', JSON.stringify(defaultProjects));
    }
  }, []);

  const handleLike = (projectId: string) => {
    if (!user) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const isLiked = project.likes.includes(user.id);
        const newLikes = isLiked 
          ? project.likes.filter(id => id !== user.id)
          : [...project.likes, user.id];
        
        addActivity(isLiked ? `Unliked project: ${project.title}` : `Liked project: ${project.title}`);
        
        return { ...project, likes: newLikes };
      }
      return project;
    });

    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const incrementViews = (projectId: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return { ...project, views: project.views + 1 };
      }
      return project;
    });

    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const handleSaveProject = (projectData: Omit<Project, 'id' | 'likes' | 'views'>) => {
    if (!user?.isOwner) return;

    if (editingProject) {
      // Update existing project
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...projectData }
          : p
      );
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      addActivity(`Updated project: ${projectData.title}`);
    } else {
      // Create new project
      const newProject: Project = {
        ...projectData,
        id: Date.now().toString(),
        likes: [],
        views: 0
      };
      const updatedProjects = [newProject, ...projects];
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      addActivity(`Created new project: ${projectData.title}`);
    }

    setShowEditor(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: string) => {
    if (!user?.isOwner) return;

    const project = projects.find(p => p.id === projectId);
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    addActivity(`Deleted project: ${project?.title}`);
  };

  if (showEditor) {
    return (
      <ProjectEditor
        project={editingProject}
        onSave={handleSaveProject}
        onCancel={() => {
          setShowEditor(false);
          setEditingProject(null);
        }}
      />
    );
  }

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-16">
          <div className="text-center flex-1">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              {t('projectsTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('projectsDescription')}
            </p>
          </div>

          {user?.isOwner && (
            <button
              onClick={() => setShowEditor(true)}
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-red-700 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Project</span>
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <button
                      onClick={() => incrementViews(project.id)}
                      className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <div className="flex space-x-2 items-center">
                      {user?.isOwner && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingProject(project);
                              setShowEditor(true);
                            }}
                            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project.id);
                            }}
                            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats and Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {project.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className={`w-4 h-4 mr-1 ${project.likes.length > 0 ? 'text-red-500' : ''}`} />
                      {project.likes.length}
                    </span>
                  </div>

                  <button
                    onClick={() => handleLike(project.id)}
                    disabled={!user}
                    className={`p-2 rounded-full transition-all transform hover:scale-110 ${
                      user && project.likes.includes(user.id)
                        ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400'
                    } ${!user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <Heart className={`w-5 h-5 ${user && project.likes.includes(user.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Like what you see?</h3>
            <p className="text-blue-100 mb-6">
              Let's work together to bring your ideas to life with modern web technologies
            </p>
            <a
              href="#contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}