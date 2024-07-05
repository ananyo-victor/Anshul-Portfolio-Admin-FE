const ToolOptions = ({ tools }) => {
    const frontendTools = [
        "HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular",
        "Svelte", "Next.js", "Nuxt.js", "Gatsby", "Bootstrap",
        "Tailwind CSS", "Material-UI", "Ant Design", "Chakra UI",
        "Foundation", "Bulma", "Semantic UI", "jQuery", "Redux",
        "Recoil", "MobX", "Apollo Client", "GraphQL", "Three.js",
        "D3.js", "Chart.js", "ECharts", "PWA", "Webpack", "Parcel",
        "Vite", "Gulp", "Babel", "Storybook", "Jest", "Testing Library",
        "Cypress", "Mocha", "Chai", "Enzyme", "Playwright", "Puppeteer"
    ];

    const backendTools = [
        "Node.js", "Express.js", "Koa", "NestJS", "Hapi", "Fastify",
        "Python", "Django", "Flask", "FastAPI", "Tornado", "Java",
        "Spring Boot", "Dropwizard", "Micronaut", "Quarkus", "Ruby",
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
    return (
        <>
            {tools.map((tool, index) => (
                <option key={index} value={tool}>{tool}</option>
            ))}
        </>
    );
};
