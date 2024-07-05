import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [_id, set_id] = useState('');
    const [skills, setSkills] = useState([{ _id: '', id: 1, category: '', tools: [{ _id: '', id: 1, name: '' }] }]);
    const [users, setUsers] = useState([{ _id: '', id: 1, name: '', resume: '', github: '', photo: '' }]);
    const [projects, setProjects] = useState([{ _id: '', id: 1, image: '', name: '', description: '', link: '' }]);
    const [experiences, setExperiences] = useState([{ _id: '', id: 1, logo: '', role: '', company: '', start: '', end: '', description: '', skills: [{ _id: '', id: 1, name: '' }] }]);
    const [educations, setEducations] = useState([{ _id: '', id: 1, institute: '', start: '', end: '', grade: '', description: '' }]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const logout = () => {
        localStorage.removeItem('auth-token');
        navigate('/');
    };


    const fetchPortfolio = async () => {
        try {
            const response = await axios.get('https://anshul-portfolio-admin-be.onrender.com/portfolio/receive');
            const data = response.data;

            if (data) {
                console.log(data);
                set_id(data[data.length - 1]._id);
                setUsers(data[data.length - 1].users.map(user => ({
                    id: user.id,
                    name: user.name,
                    resume: user.resume,
                    github: user.github,
                    photo: user.photo,
                    _id: user._id
                })));
                setProjects(data[data.length - 1].projects.map(project => ({
                    id: project.id,
                    image: project.image,
                    name: project.name,
                    description: project.description,
                    link: project.link,
                    _id: project._id
                })));
                setExperiences(data[data.length - 1].experiences.map(experience => ({
                    id: experience.id,
                    logo: experience.logo,
                    role: experience.role,
                    company: experience.company,
                    start: experience.start,
                    end: experience.end,
                    description: experience.description,
                    skills: experience.skills.map(skill => ({
                        id: skill.id,
                        name: skill.name,
                        _id: skill._id
                    })),
                    _id: experience._id
                })));
                setEducations(data[data.length - 1].educations.map(education => ({
                    id: education.id,
                    institute: education.institute,
                    start: education.start,
                    end: education.end,
                    grade: education.grade,
                    description: education.description,
                    _id: education._id
                })));
                setSkills(data[data.length - 1].skills.map(skill => ({
                    id: skill.id,
                    category: skill.category,
                    tools: skill.tools.map(tool => ({
                        id: tool.id,
                        name: tool.name,
                        _id: tool._id
                    })),
                    _id: skill._id
                })));
            }
        } catch (error) {
            console.error('Error fetching portfolio data', error);
        }
    };

    // const savePortfolio = async () => {
    //     try {
    //         const portfolioData = {
    //             users: users.map(user => ({ ...user })),
    //             projects: projects.map(project => ({ ...project })),
    //             experiences: experiences.map(experience => ({
    //                 ...experience,
    //                 start: new Date(experience.start),
    //                 end: new Date(experience.end),
    //                 skills: experience.skills.map(skill => ({ ...skill }))
    //             })),
    //             educations: educations.map(education => ({
    //                 ...education,
    //                 start: new Date(education.start),
    //                 end: new Date(education.end)
    //             })),
    //             skills: skills.map(skill => ({
    //                 ...skill,
    //                 tools: skill.tools.map(tool => ({ ...tool }))
    //             }))
    //         };

    //         console.log('Sending portfolio data:', portfolioData);

    //         const response = await axios.post('https://anshul-portfolio-admin-be.onrender.com/portfolio/upload', portfolioData, {
    //             headers: {
    //                 'auth-token': localStorage.getItem('auth-token')
    //             }
    //         });
    //         alert('Portfolio saved successfully!');
    //         console.log('Response:', response.data);
    //     } catch (error) {
    //         console.error('Error saving portfolio data', error);
    //         if (error.response) {
    //             console.error('Server responded with status:', error.response.status);
    //             console.error('Server response data:', error.response.data);
    //         }
    //     }
    // };


    // const updatePortfolio = async (id) => {
    //     try {
    //         const portfolioData = { users, projects, experiences, educations, skills };
    //         await axios.put(`/api/portfolio/${id}`, portfolioData);
    //         alert('Portfolio updated successfully!');
    //     } catch (error) {
    //         console.error('Error updating portfolio data', error);
    //     }
    // };

    // const deletePortfolio = async (id) => {
    //     try {
    //         await axios.delete(`/api/portfolio/${id}`);
    //         alert('Portfolio deleted successfully!');
    //     } catch (error) {
    //         console.error('Error deleting portfolio data', error);
    //     }
    // };

    const EDhandleChange = (event, educationId) => {
        const { name, value } = event.target;
        const newEducations = educations.map(education =>
            education.id === educationId ? { ...education, [name]: value } : education
        );
        setEducations(newEducations);
    };

    const EDaddField = () => {
        const newEducation = {
            id: educations.length + 1,
            institute: '',
            start: '',
            end: '',
            grade: '',
            description: ''
        };
        setEducations([...educations, newEducation]);
    };

    const EDremoveField = (educationId) => {
        setEducations(educations.filter(education => education.id !== educationId));
    };

    const EXhandleChange = (event, experienceId, skillId = null) => {
        const { name, value } = event.target;
        const newExperiences = experiences.map(experience => {
            if (experience.id === experienceId) {
                if (name === 'skills' && skillId !== null) {
                    const newSkills = experience.skills.map(skill =>
                        skill.id === skillId ? { ...skill, name: value } : skill
                    );
                    return { ...experience, skills: newSkills };
                }
                return { ...experience, [name]: value };
            }
            return experience;
        });
        setExperiences(newExperiences);
    };

    const EXaddField = () => {
        const newExperience = {
            id: experiences.length + 1,
            logo: '',
            role: '',
            company: '',
            start: '',
            end: '',
            description: '',
            skills: [{ id: 1, name: '' }]
        };
        setExperiences([...experiences, newExperience]);
    };

    const EXremoveField = (experienceId) => {
        setExperiences(experiences.filter(experience => experience.id !== experienceId));
    };

    const addEXSkillField = (experienceId) => {
        const newExperiences = experiences.map(experience => {
            if (experience.id === experienceId) {
                const newSkills = [
                    ...experience.skills,
                    { id: experience.skills.length + 1, name: '' }
                ];
                return { ...experience, skills: newSkills };
            }
            return experience;
        });
        setExperiences(newExperiences);
    };

    const removeEXSkillField = (experienceId, skillId) => {
        const newExperiences = experiences.map(experience => {
            if (experience.id === experienceId) {
                const newSkills = experience.skills.filter(skill => skill.id !== skillId);
                return { ...experience, skills: newSkills };
            }
            return experience;
        });
        setExperiences(newExperiences);
    };

    const PhandleChange = (event, projectId) => {
        const { name, value } = event.target;
        const newProjects = projects.map(project =>
            project.id === projectId ? { ...project, [name]: value } : project
        );
        setProjects(newProjects);
    };

    const PaddField = () => {
        const newProject = { id: projects.length + 1, image: '', name: '', description: '', link: '' };
        setProjects([...projects, newProject]);
    };

    const PremoveField = (projectId) => {
        setProjects(projects.filter(project => project.id !== projectId));
    };

    const UhandleChange = (event, userId) => {
        const { name, value } = event.target;
        const newUsers = users.map(user =>
            user.id === userId ? { ...user, [name]: value } : user
        );
        setUsers(newUsers);
    };

    const frontendTools = [
        "HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular", "Svelte", "Next.js", "Nuxt.js", "Gatsby", "Bootstrap", "Tailwind CSS", "Material-UI", "Ant Design", "Chakra UI",
        "Foundation", "Bulma", "Semantic UI", "jQuery", "Redux",
        "Recoil", "MobX", "Apollo Client", "GraphQL", "Three.js",
        "D3.js", "Chart.js", "ECharts", "PWA", "Webpack", "Parcel",
        "Vite", "Gulp", "Babel", "Storybook", "Jest", "Testing Library",
        "Cypress", "Mocha", "Chai", "Enzyme", "Playwright", "Puppeteer"
    ];

    const backendTools = [
        "Node.js", "Express.js", "Koa", "NestJS", "Hapi", "Fastify", "Python", "Django", "Flask", "FastAPI", "Tornado", "Java", "Spring Boot", "Dropwizard", "Micronaut", "Quarkus", "Ruby",
        "Ruby on Rails", "Sinatra", "Hanami", "PHP", "Laravel",
        "Symfony", "CodeIgniter", "Slim", "Go", "Gin", "Beego", "Echo",
        "Fiber", "Elixir", "Phoenix", "Rust", "Actix", "Rocket", "C#",
        "ASP.NET Core", "F#", "Nancy", "Scala", "Play Framework",
        "Akka HTTP", "Kotlin", "Ktor", "Vert.x", "C++", "Pistache",
        "Crow", "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis",
        "Cassandra", "Elasticsearch", "RabbitMQ", "Kafka", "NATS",
        "Consul", "Vault", "Docker", "Kubernetes", "Terraform",
        "Ansible", "Chef", "Puppet", "Vagrant", "AWS", "Google Cloud",
        "Azure", "Heroku", "DigitalOcean", "Firebase", "Supabase",
        "Vercel", "Netlify", "GraphQL", "Apollo Server", "Prisma",
        "TypeORM", "Sequelize", "Mongoose", "Typegoose", "JWT", "OAuth",
        "Passport.js", "Okta", "Auth0", "Firebase Auth", "Stripe",
        "PayPal", "Braintree", "Twilio", "SendGrid", "Mailgun",
        "Nodemailer", "Swagger", "Postman", "Insomnia", "Jenkins",
        "Travis CI", "CircleCI", "GitLab CI", "GitHub Actions",
        "Bitbucket Pipelines", "SonarQube", "Prometheus", "Grafana",
        "New Relic", "Datadog", "Sentry", "Logstash", "Fluentd", "Splunk"
    ];

    const mobileAndWebTools = [
        "Kotlin", "Dart", "Swift", "Flutter", "React Native", "Ionic", "Xamarin",
        "Cordova", "PhoneGap", "NativeScript"
    ];

    const getToolsByCategory = (category) => {
        switch (category) {
            case "Frontend":
                return frontendTools;
            case "Backend":
                return backendTools;
            case "Mobile And Web Development Tools":
                return mobileAndWebTools;
            case "Database":
                return ["MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis", "Cassandra", "Elasticsearch"];
            case "Tools":
                return ["Docker", "Kubernetes", "Terraform", "Ansible", "Chef", "Puppet", "Vagrant"];
            case "Others":
                return ["AWS", "Google Cloud", "Azure", "Heroku", "DigitalOcean", "Firebase", "Supabase", "Vercel", "Netlify"];
            default:
                return [];
        }
    };

    const handleCategoryChange = (index, category) => {
        const newSkills = [...skills];
        newSkills[index].category = category;
        setSkills(newSkills);
    };

    const handleToolChange = (skillIndex, toolIndex, toolName) => {
        const newSkills = [...skills];
        newSkills[skillIndex].tools[toolIndex].name = toolName;
        setSkills(newSkills);
    };

    const addToolField = (skillIndex) => {
        const newSkills = [...skills];
        const newToolId = newSkills[skillIndex].tools.length ? newSkills[skillIndex].tools[newSkills[skillIndex].tools.length - 1].id + 1 : 1;
        newSkills[skillIndex].tools.push({ id: newToolId, name: '' });
        setSkills(newSkills);
    };

    const removeToolField = (skillIndex, toolId) => {
        const newSkills = [...skills];
        newSkills[skillIndex].tools = newSkills[skillIndex].tools.filter(tool => tool.id !== toolId);
        setSkills(newSkills);
    };

    const addSkillField = () => {
        const newSkillId = skills.length ? skills[skills.length - 1].id + 1 : 1;
        setSkills([...skills, { id: newSkillId, category: '', tools: [{ id: 1, name: '' }] }]);
    };

    const removeSkillField = (skillId) => {
        setSkills(skills.filter(skill => skill.id !== skillId));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // savePortfolio();
        //     // Update each section
        try {
            await Promise.all([
                saveSection(users, 'users'),
                saveSection(projects, 'projects'),
                saveSection(experiences, 'experiences'),
                saveSection(educations, 'educations'),
                saveSection(skills, 'skills')
            ]);

            alert('Portfolio saved successfully!');
        } catch (error) {
            console.error('Error saving portfolio', error);
            alert('Error saving portfolio. Please try again.');
        }
    };

    const saveSection = async (sectionData, sectionName) => {
        for (const item of sectionData) {
            try {
                console.log(item);
                if (item._id) {
                    console.log('put');
                    // If the item has an _id, it's an existing item and should be updated
                    await axios.put(`https://anshul-portfolio-admin-be.onrender.com/portfolio/${sectionName}/${item._id}`, item);
                } else {
                    // New entry, use POST
                    console.log('post');
                    console.log(_id);
                    console.log(sectionName.slice(0, -1));
                    const newItem = {
                        portfolioId: { _id }, // Replace with actual portfolio ID
                        [sectionName.slice(0, -1)]: item
                    };
                    await axios.post(`https://anshul-portfolio-admin-be.onrender.com/portfolio/upload/${sectionName}`, newItem);
                }
            } catch (error) {
                console.error(`Error saving ${sectionName}`, error);
                throw error;
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} method='POST' className='relative'>

            <header className="text-gray-600 body-font fixed top-0 w-full h-16 bg-white">
                <div className="container mx-auto flex flex-wrap px-5 flex-col h-full md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">Anshul Resume</span>
                    </a>

                    <button
                        className="inline-flex ml-auto items-center text-white border-0 py-1 px-3 focus:outline-none hover:bg-indigo-500 rounded text-base mt-4 md:mt-0 bg-indigo-700"
                        type='button' onClick={logout} 
                    >
                        Logout
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                    <button
                        className="inline-flex ml-2 items-center text-white border-0 py-1 px-3 focus:outline-none hover:bg-indigo-500 rounded text-base mt-4 md:mt-0 bg-indigo-700"
                        type="submit"  // Add type="submit" to trigger form submission
                    >
                        Submit
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>

                </div>
            </header>

            <main className="mx-auto max-w-screen md:max-w-[680px] lg:max-w-[1200px] w-[65%] px-3">

                <div className="w-full">
                    <div className='h-16 w-full'></div>
                    {/* User */}
                    <div className="border-4 border-white rounded-xl transparent-yellow mt-10 px-2 lg:pl-5 drop-shadow-xl shadow-xl">
                        <div className='flex justify-center md:block'>
                            <span className="bg-white w-fit h-fit p-2 flex justify-center items-center mt-5 rounded-xl">
                                <p className="text-lg font-bold lg:text-2xl">Users</p>
                            </span>
                        </div>
                        <div className="lg:mt-10 w-full">
                            {users.map(user => (
                                <div className="mt-5 flex w-full" key={`user-${user.id}`}>
                                    <div className='w-full flex flex-col'>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`Uname-${user.id}`}>Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id={`Uname-${user.id}`}
                                                value={user.name}
                                                onChange={(e) => UhandleChange(e, user.id)}
                                                placeholder="Your Name"
                                                className="h-14 lg:h-16 w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`Uphoto-${user.id}`}>Photo</label>
                                            <input
                                                type="text"
                                                name="photo"
                                                id={`Uphoto-${user.id}`}
                                                value={user.photo}
                                                onChange={(e) => UhandleChange(e, user.id)}
                                                placeholder=""
                                                className="h-14 lg:h-16 w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`Uresume-${user.id}`}>Resume Link</label>
                                            <input
                                                type="text"
                                                name="resume"
                                                id={`Uresume-${user.id}`}
                                                value={user.resume}
                                                onChange={(e) => UhandleChange(e, user.id)}
                                                placeholder="Resume Link"
                                                className="h-14 lg:h-16 w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`Ugithub-${user.id}`}>Github Link</label>
                                            <input
                                                type="text"
                                                name="github"
                                                id={`Ugithub-${user.id}`}
                                                value={user.github}
                                                onChange={(e) => UhandleChange(e, user.id)}
                                                placeholder="Your GitHub Link"
                                                className="h-14 lg:h-16 w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="border-4 border-white rounded-xl transparent-yellow mt-10 px-2 lg:pl-5 drop-shadow-xl shadow-xl">
                        <div className='flex justify-center md:block'>
                            <span className="bg-white w-fit h-fit p-2 flex justify-center items-center mt-5 rounded-xl">
                                <p className="text-lg font-bold lg:text-2xl">Skills</p>
                            </span>
                        </div>
                        <div className="lg:mt-10 w-full">
                            {skills.map((skill, skillIndex) => (
                                <div className="flex mt-5 border border-white shadow-2xl p-4" key={`skill-${skill.id}`}>
                                    <div className='w-full'>
                                        <div className='flex flex-col my-3 w-full'>
                                            <label className='lg:text-2xl text-lg font-semibold lg:mb-3 mb-1'>Category</label>
                                            <input
                                                type="text"
                                                list='category-options'
                                                id={`category-input-${skill.id}`}
                                                name='category'
                                                placeholder='Category'
                                                className="h-14 lg:h-16 max-w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                                value={skill.category}
                                                onChange={(e) => handleCategoryChange(skillIndex, e.target.value)}
                                            />
                                            <datalist id='category-options'>
                                                <option value="Frontend">Frontend</option>
                                                <option value="Backend">Backend</option>
                                                <option value="Mobile And Web Development Tools">Mobile And Web Development Tools</option>
                                                <option value="Database">Database</option>
                                                <option value="Tools">Tools</option>
                                                <option value="Others">Others</option>
                                            </datalist>
                                        </div>
                                        {skill.tools.map((tool, toolIndex) => (
                                            <div className='w-full flex shadow-2xl p-4 rounded-lg' key={`tool-${tool.id}`}>
                                                <div className='flex flex-col my-3 w-full'>
                                                    <label className='lg:text-2xl text-lg font-semibold lg:mb-3 mb-1'>Name</label>
                                                    <input
                                                        type="text"
                                                        list='tool-options'
                                                        id={`tool-input-${tool.id}`}
                                                        name='tool'
                                                        placeholder='Tools'
                                                        className="h-14 lg:h-16 max-w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                                        value={tool.name}
                                                        onChange={(e) => handleToolChange(skillIndex, toolIndex, e.target.value)}
                                                    />
                                                    <datalist id='tool-options'>
                                                        {getToolsByCategory(skill.category).map((tool, index) => (
                                                            <option key={index} value={tool}>{tool}</option>
                                                        ))}
                                                    </datalist>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="lg:ml-7 ml-5 shadow-xl rounded-2xl w-fit h-fit p-2"
                                                    onClick={() => removeToolField(skillIndex, tool.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg> {/* remove */}
                                                </button>
                                            </div>
                                        ))}
                                        <div className="mt-3 flex items-center pl-5">
                                            <button
                                                type="button"
                                                className="shadow-xl rounded-2xl w-fit h-fit p-2"
                                                onClick={() => addToolField(skillIndex)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg> {/* add */}
                                            </button>
                                            <p className="ml-4 md:text-xl md:font-semibold lg:text-xl">Add another Name</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="lg:ml-7 ml-5 shadow-xl rounded-2xl w-fit h-fit p-2"
                                        onClick={() => removeSkillField(skill.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg> {/* remove */}
                                    </button>
                                </div>
                            ))}
                            <div className="mt-9 flex items-center pl-5 mb-5">
                                <button
                                    type="button"
                                    className="shadow-xl rounded-2xl w-fit h-fit p-2"
                                    onClick={addSkillField}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg> {/* add */}
                                </button>
                                <p className="ml-4 md:text-xl md:font-semibold lg:text-xl">Add another Category</p>
                            </div>
                        </div>
                    </div>

                    {/* Experiences */}
                    <div className="border-4 border-white rounded-xl transparent-yellow mt-10 px-2 lg:pl-5 drop-shadow-xl shadow-xl">
                        <div className='flex justify-center md:block'>
                            <span className="bg-white w-fit h-fit p-2 flex justify-center items-center mt-5 rounded-xl">
                                <p className="text-lg font-bold lg:text-2xl">Experiences</p>
                            </span>
                        </div>
                        <div className="lg:mt-10 w-full">
                            {experiences.map((experience) => (
                                <div className="mt-5 flex w-full" key={`experience-${experience.id}`}>
                                    <div className='w-full flex flex-col'>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`experience-logo-${experience.id}`}>Company Logo</label>
                                            <input
                                                type="file"
                                                name='logo'
                                                id={`experience-logo-${experience.id}`}
                                                data-id={experience.id}
                                                value={experience.logo}
                                                onChange={(e) => EXhandleChange(e, experience.id)}
                                                placeholder="Company Logo"
                                                className="h-14 lg:h-16 w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`experience-role-${experience.id}`}>Role Name</label>
                                            <input
                                                type="text"
                                                name="role"
                                                id={`experience-role-${experience.id}`}
                                                data-id={experience.id}
                                                value={experience.role}
                                                onChange={(e) => EXhandleChange(e, experience.id)}
                                                placeholder="Role Name"
                                                className="h-14 lg:h-16 w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`experience-company-${experience.id}`}>Company Name</label>
                                            <input
                                                type="text"
                                                name="company"
                                                id={`experience-company-${experience.id}`}
                                                data-id={experience.id}
                                                value={experience.company}
                                                onChange={(e) => EXhandleChange(e, experience.id)}
                                                placeholder="Company Name"
                                                className="h-14 lg:h-16 w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`experience-from-${experience.id}`}>Start Date</label>
                                            <input
                                                type="date"
                                                name="start"
                                                id={`experience-from-${experience.id}`}
                                                data-id={experience.id}
                                                value={experience.start}
                                                onChange={(e) => EXhandleChange(e, experience.id)}
                                                className="h-14 lg:h-16 w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`experience-to-${experience.id}`}>End Date</label>
                                            <input
                                                type="date"
                                                name="end"
                                                id={`experience-to-${experience.id}`}
                                                data-id={experience.id}
                                                value={experience.end}
                                                onChange={(e) => EXhandleChange(e, experience.id)}
                                                className="h-14 lg:h-16 w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`experience-description-${experience.id}`}>Project Description</label>
                                            <textarea
                                                name="description"
                                                id={`experience-description-${experience.id}`}
                                                data-id={experience.id}
                                                value={experience.description}
                                                onChange={(e) => EXhandleChange(e, experience.id)}
                                                placeholder="Project Description"
                                                className="h-40 lg:h-48 w-full border border-white rounded-xl pl-2 pt-2 text-lg shadow-xl resize-none"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`experience-skills-${experience.id}`}>Skills Used</label>
                                            {experience.skills.map((skill) => (
                                                <div key={`experience-skills-${skill.id}`} className='flex items-center my-2'>
                                                    <input
                                                        type="text"
                                                        name="skills"
                                                        id={`experience-skills-${experience.id}-${skill.id}`}
                                                        data-id={experience.id}
                                                        value={skill.name}
                                                        onChange={(e) => EXhandleChange(e, experience.id, skill.id)}
                                                        placeholder="Skills Used"
                                                        className="h-14 lg:h-16 w-full border border-white rounded-xl pl-2 text-lg shadow-xl"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="ml-2 shadow-xl rounded-2xl w-fit h-fit p-2"
                                                        onClick={() => removeEXSkillField(experience.id, skill.id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg> {/* remove */}
                                                    </button>
                                                </div>
                                            ))}
                                            <div className='flex items-center pl-5 mb-5'>
                                                <button
                                                    id='EXSkill'
                                                    type="button"
                                                    className="mt-2 shadow-xl rounded-2xl w-fit h-fit p-2"
                                                    onClick={() => addEXSkillField(experience.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg> {/* add */}
                                                </button>
                                                <label htmlFor='EXSkill' className="ml-4 md:text-xl md:font-semibold lg:text-xl">Add more Skill</label>
                                            </div>
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        className="lg:ml-7 ml-5 shadow-xl rounded-2xl w-fit h-fit p-2"
                                        onClick={() => EXremoveField(experience.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg> {/* remove */}
                                    </button>
                                </div>
                            ))}
                            <div className="flex items-center pl-5 mb-5">
                                <button
                                    type="button"
                                    className="shadow-xl rounded-2xl w-fit h-fit p-2"
                                    onClick={EXaddField}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg> {/* add */}
                                </button>
                                <p className="ml-4 md:text-xl md:font-semibold lg:text-xl">Add another experience</p>
                            </div>
                        </div>
                    </div>

                    {/* Educations */}
                    <div className="border-4 border-white rounded-xl transparent-yellow mt-10 px-2 lg:pl-5 drop-shadow-xl shadow-xl">
                        <div className='flex justify-center md:block'>
                            <span className="bg-white w-fit h-fit p-2 flex justify-center items-center mt-5 rounded-xl">
                                <p className="text-lg font-bold lg:text-2xl">Education</p>
                            </span>
                        </div>
                        <div className="lg:mt-10 w-full">
                            {educations.map((education, index) => (
                                <div className="mt-5 flex w-full" key={`education-${education.id}`}>
                                    <div className='w-full flex flex-col'>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`education-institute-${education.id}`}>Institute</label>
                                            <input
                                                type="text"
                                                name="institute"
                                                id={`education-institute-${education.id}`}
                                                data-id={education.id}
                                                value={education.institute}
                                                onChange={(e) => EDhandleChange(e, education.id)}
                                                placeholder="Name of the Institute"
                                                className="h-14 lg:h-16 border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`education-start-${education.id}`}>Start Date</label>
                                            <input
                                                type="date"
                                                name="start"
                                                id={`education-start-${education.id}`}
                                                data-id={education.id}
                                                value={education.start}
                                                onChange={(e) => EDhandleChange(e, education.id)}
                                                className="h-14 lg:h-16 border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`education-end-${education.id}`}>End Date</label>
                                            <input
                                                type="date"
                                                name="end"
                                                id={`education-end-${education.id}`}
                                                data-id={education.id}
                                                value={education.end}
                                                onChange={(e) => EDhandleChange(e, education.id)}
                                                className="h-14 lg:h-16 border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`education-grade-${education.id}`}>Grade</label>
                                            <input
                                                type="text"
                                                name="grade"
                                                id={`education-grade-${education.id}`}
                                                data-id={education.id}
                                                value={education.grade}
                                                onChange={(e) => EDhandleChange(e, education.id)}
                                                placeholder="Grade"
                                                className="h-14 lg:h-16 border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`education-description-${education.id}`}>Description</label>
                                            <textarea
                                                name="description"
                                                id={`education-description-${education.id}`}
                                                data-id={education.id}
                                                value={education.description}
                                                onChange={(e) => EDhandleChange(e, education.id)}
                                                placeholder="Description"
                                                className="h-40 lg:h-48 border border-white rounded-xl pl-2 pt-2 text-lg shadow-xl resize-none"
                                            />
                                        </div>

                                    </div>
                                    <button
                                        type="button"
                                        className="lg:ml-7 ml-5 shadow-xl rounded-2xl w-fit h-fit p-2"
                                        onClick={() => EDremoveField(education.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg> {/* remove */}
                                    </button>
                                </div>
                            ))}
                            <div className="mt-9 flex items-center pl-5 mb-5">
                                <button
                                    type="button"
                                    className="shadow-xl rounded-2xl w-fit h-fit p-2"
                                    onClick={EDaddField}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg> {/* add */}
                                </button>
                                <p className="ml-4 md:text-xl md:font-semibold lg:text-xl">Add another education</p>
                            </div>
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="border-4 border-white rounded-xl transparent-yellow mt-10 px-2 lg:pl-5 drop-shadow-xl shadow-xl">
                        <div className='flex justify-center md:block'>
                            <span className="bg-white w-fit h-fit p-2 flex justify-center items-center mt-5 rounded-xl">
                                <p className="text-lg font-bold lg:text-2xl">Projects</p>
                            </span>
                        </div>
                        <div className="lg:mt-10 w-full">
                            {projects.map((project, index) => (
                                <div className="mt-5 flex" key={`project-${project.id}`}>
                                    <div className='w-full flex flex-col'>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`project-name-${project.id}`}>Project Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id={`project-name-${project.id}`}
                                                value={project.name}
                                                onChange={(e) => PhandleChange(e, project.id)}
                                                placeholder="Project Name"
                                                className="h-14 lg:h-16 border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`project-description-${project.id}`}>Project Description</label>
                                            <input
                                                type="text"
                                                name="description"
                                                id={`project-description-${project.id}`}
                                                value={project.description}
                                                onChange={(e) => PhandleChange(e, project.id)}
                                                placeholder="Project Description"
                                                className="h-14 lg:h-16 border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                        <div className='w-full flex flex-col my-2'>
                                            <label className='text-2xl font-semibold my-2' htmlFor={`project-link-${project.id}`}>Project Link</label>
                                            <input
                                                type="text"
                                                name="link"
                                                id={`project-link-${project.id}`}
                                                value={project.link}
                                                onChange={(e) => PhandleChange(e, project.id)}
                                                placeholder="Project Link"
                                                className="h-14 lg:h-16 border border-white rounded-xl pl-2 text-lg shadow-xl"
                                            />
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        className="lg:ml-7 ml-5 shadow-xl rounded-2xl w-fit h-fit p-2"
                                        onClick={() => PremoveField(project.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg> {/* remove */}
                                    </button>
                                </div>
                            ))}
                            <div className="mt-9 flex items-center pl-5 mb-5">
                                <button
                                    type="button"
                                    className="shadow-xl rounded-2xl w-fit h-fit p-2"
                                    onClick={PaddField}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg> {/* add */}
                                </button>
                                <p className="ml-4 md:text-xl md:font-semibold lg:text-xl">Add another project</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </form>
    );
}

export default Dashboard;
