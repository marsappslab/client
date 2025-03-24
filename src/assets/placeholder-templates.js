/ Créer un dossier client/src/assets
// client/src/assets/placeholder-templates.js
// Ce fichier contient des données de prévisualisation pour les templates de CV

const placeholderTemplateData = {
  personalInfo: {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '06 12 34 56 78',
    address: '10 Rue de la Paix',
    city: 'Paris',
    country: 'France',
    postalCode: '75001',
    summary: 'Développeur web full-stack avec plus de 5 ans d\'expérience dans la création d\'applications web modernes. Passionné par les nouvelles technologies et l\'amélioration continue des processus de développement.'
  },
  experiences: [
    {
      company: 'TechSolutions',
      position: 'Développeur Full Stack Senior',
      startDate: '01/2020',
      endDate: 'Présent',
      description: 'Développement et maintenance d\'applications web de gestion pour des clients internationaux. Conception d\'architectures évolutives et mise en place de bonnes pratiques de développement.',
      context: 'Équipe de 8 développeurs, méthodologie Agile Scrum',
      responsibilities: 'Développement frontend et backend, revue de code, mentorat',
      tools: 'React, Node.js, MongoDB, AWS, Docker'
    },
    {
      company: 'WebInnovate',
      position: 'Développeur Frontend',
      startDate: '03/2018',
      endDate: '12/2019',
      description: 'Création d\'interfaces utilisateur réactives et optimisation des performances pour des applications à fort trafic.',
      context: 'Startup en croissance',
      responsibilities: 'Développement d\'interfaces, tests, déploiement',
      tools: 'Angular, SCSS, Git, Jenkins'
    }
  ],
  education: [
    {
      institution: 'Université de Paris',
      degree: 'Master en Informatique',
      field: 'Développement Web et Mobile',
      startDate: '09/2016',
      endDate: '06/2018',
      description: 'Spécialisation en développement d\'applications web et mobiles, intelligence artificielle et gestion de projets.'
    },
    {
      institution: 'IUT de Lyon',
      degree: 'DUT Informatique',
      field: 'Développement logiciel',
      startDate: '09/2014',
      endDate: '06/2016',
      description: 'Formation générale en informatique avec une spécialisation en développement.'
    }
  ],
  skills: [
    { name: 'JavaScript', level: 5, category: 'Programmation' },
    { name: 'React', level: 5, category: 'Frontend' },
    { name: 'Node.js', level: 4, category: 'Backend' },
    { name: 'MongoDB', level: 4, category: 'Base de données' },
    { name: 'Gestion de projet', level: 3, category: 'Soft Skills' },
    { name: 'Git', level: 5, category: 'Outils' },
    { name: 'Docker', level: 3, category: 'DevOps' },
    { name: 'CI/CD', level: 3, category: 'DevOps' }
  ],
  languages: [
    { name: 'Français', level: 'Natif' },
    { name: 'Anglais', level: 'Courant' },
    { name: 'Espagnol', level: 'Intermédiaire' }
  ],
  certifications: [
    { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '2022' },
    { name: 'Professional Scrum Master I', issuer: 'Scrum.org', date: '2021' }
  ]
};

export default placeholderTemplateData;

// Créer un dossier pour les images des templates
// Ces images seraient généralement des fichiers PNG ou JPG, 
// pour le MVP on peut simplement créer des placeholders