import { Card } from '@/components/ui/card';
import { Github, User, Mail } from 'lucide-react';
const TeamSection = () => {
  const teamMembers = [{
    name: 'Pratik Patel',
    role: 'Full Stack Developer & AI Engineer',
    bio: 'Passionate about leveraging AI for healthcare innovation. Specialized in machine learning models and scalable web applications.',
    avatar: '/avatars/pratik.JPG',
    skills: ['React', 'Python', 'TensorFlow', 'Node.js']
  }, {
    name: 'Anuruth',
    role: 'Frontend Developer & Data Analyst',
    bio: 'Expert in predictive modeling and healthcare analytics. Focused on creating accurate health risk assessment algorithms.',
    avatar: '/avatars/anuruth .jpg',
    skills: ['Python', 'scikit-learn', 'Pandas', 'SQL']
  }, {
    name: 'Dev Jaladkar',
    role: 'Data Scientist & ML Engineer',
    bio: 'Creating intuitive and accessible healthcare interfaces. Ensuring users have seamless experience with complex health data.',
    avatar: '/avatars/Dev.jpg',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma']
  }, {
    name: 'Harshali',
    role: 'Backend Developer & DevOps',
    bio: 'Building robust and secure backend systems for healthcare data. Focused on scalability and data privacy compliance.',
    avatar: '/avatars/harshali.jpg',
    skills: ['Node.js', 'MongoDB', 'AWS', 'Docker']
  }];
  return <section id="team" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-theme-gray-600 max-w-3xl mx-auto">
            A passionate group of developers, data scientists, and healthcare enthusiasts working together to revolutionize preventive healthcare through AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-theme-blue-50">
              <div className="space-y-4">
                <div className="relative mx-auto w-24 h-24">
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover border-4 border-theme-gray-100" />
                  <div className="absolute inset-0 rounded-full bg-theme-blue/0 hover:bg-theme-blue/10 transition-colors duration-200"></div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-theme-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-theme-blue font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-theme-gray-600 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.skills.map((skill, skillIndex) => <span key={skillIndex} className="px-2 py-1 text-xs font-medium bg-theme-seafoam-100 text-theme-seafoam-dark rounded-full">
                        {skill}
                      </span>)}
                  </div>
                  
                  <div className="flex justify-center space-x-3">
                    <button className="p-2 text-theme-gray-400 hover:text-theme-blue transition-colors duration-200">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-theme-gray-400 hover:text-theme-blue transition-colors duration-200">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>)}
        </div>

        {/* Hackathon Info */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-theme-blue/5 to-theme-seafoam/10 border-theme-blue/20 bg-[#2da8ff]">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-theme-gray-900 mb-4">
                Built for Innovation
              </h3>
              <p className="text-lg text-theme-gray-600 mb-6">
                PrediCare was developed during a healthcare hackathon with the mission to make AI-powered health predictions accessible to everyone. Our team combines expertise in machine learning, web development, and healthcare to create solutions that truly matter.
              </p>
              <div className="flex justify-center items-center space-x-6 text-sm text-theme-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-theme-blue rounded-full"></div>
                  <span>Healthcare Innovation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-theme-seafoam rounded-full"></div>
                  <span>AI-Powered Solutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-theme-indigo rounded-full"></div>
                  <span>Open Source</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>;
};
export default TeamSection;