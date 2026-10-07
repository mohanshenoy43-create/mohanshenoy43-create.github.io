/* ==========================================================================
   PORTFOLIO ENGINE - CORE LOGIC
   ========================================================================== */

// Constants & State
let portfolioData = null;
let activeSemesterFilter = null; // null means "All Semesters"
let activeCategoryFilter = 'all';

// Academic Semester Details (Standard B.Tech progression details)
const BTECH_SEMESTERS = {
  1: {
    title: "Foundations & C Programming",
    period: "Year 1 - Semester 1",
    desc: "Focus on engineering physics/chemistry, mathematics, basic C programming, engineering graphics, and basic electrical concepts."
  },
  2: {
    title: "Data Structures & Digital Design",
    period: "Year 1 - Semester 2",
    desc: "Introduction to basic Data Structures in C, Digital Logic Design, engineering mathematics-II, and basic communication skills."
  },
  3: {
    title: "OOPs & Computer Organization",
    period: "Year 2 - Semester 3",
    desc: "Mastering Object-Oriented Programming (Java/C++), Discrete Mathematical Structures, Computer Organization & Architecture, and Operating Systems."
  },
  4: {
    title: "Algorithms & Databases",
    period: "Year 2 - Semester 4",
    desc: "Design & Analysis of Algorithms, Database Management Systems (DBMS), Software Engineering, and Microprocessors."
  },
  5: {
    title: "Networks & Formal Languages",
    period: "Year 3 - Semester 5",
    desc: "Computer Networks, Theory of Computation (FLAT), Web Technologies, software engineering principles, and core electives."
  },
  6: {
    title: "AI, ML & System Software",
    period: "Year 3 - Semester 6",
    desc: "Machine Learning, Artificial Intelligence, Compiler Design, advanced computer networks, and major mini-project design."
  },
  7: {
    title: "Cloud Computing & Security",
    period: "Year 4 - Semester 7",
    desc: "Cloud Computing architectures, Cryptography & Network Security, Big Data Analytics, and Capstone Project phase-1 implementation."
  },
  8: {
    title: "Major Capstone & Internship",
    period: "Year 4 - Semester 8",
    desc: "Full-time industrial internship / capstone project completion, professional ethics, seminar presentations, and career transition."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  setupEventListeners();
});

// Load Portfolio Data
async function initPortfolio() {
  try {
    // 1. Check LocalStorage cache first (so edits stick locally during dev sessions)
    const cachedData = localStorage.getItem('mohan_portfolio_data');
    if (cachedData) {
      portfolioData = JSON.parse(cachedData);
      renderPortfolio();
    } else {
      // 2. Fetch default portfolio-data.json
      const response = await fetch('portfolio-data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio-data.json');
      }
      portfolioData = await response.json();
      // Cache it initially
      localStorage.setItem('mohan_portfolio_data', JSON.stringify(portfolioData));
      renderPortfolio();
    }
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    // Render fallback data directly in case of fetch errors
    loadFallbackData();
  }
}

// Fallback data in case JSON fetch fails
function loadFallbackData() {
  portfolioData = {
    "profile": {
      "name": "Mohan Shenoy",
      "title": "B.Tech Student",
      "university": "REVA University",
      "department": "Computer Science & Engineering",
      "currentYear": "1st Year",
      "currentSemester": 2,
      "admissionYear": 2025,
      "graduationYear": 2029,
      "bio": "A passionate B.Tech student at REVA University, currently in Semester 2. I am building a strong foundation in computer science through programming projects, problem-solving practice, and continuous learning.",
      "stats": [
        { "label": "Current Semester", "value": "1st Sem" },
        { "label": "Expected CGPA", "value": "N/A" },
        { "label": "Completed Projects", "value": "2" },
        { "label": "Achievements Count", "value": "2" }
      ],
      "socials": {
        "github": "https://github.com/mohanshenoy43-create",
        "linkedin": "https://www.linkedin.com/in/mohan-shenoy-7039aa379/",
        "hackerrank": "https://www.hackerrank.com/profile/mohan_shenoy43",
        "email": "mohanshenoy@example.com"
      }
    },
    "achievements": [
      {
        "id": "ach-1",
        "title": "Admitted to REVA University B.Tech CSE",
        "category": "academic",
        "semester": 1,
        "date": "2025-08-01",
        "description": "Began the B.Tech CSE journey at REVA University.",
        "link": "https://reva.edu.in"
      }
    ],
    "projects": [
      {
        "id": "proj-1",
        "title": "2D Graphics Renderer",
        "description": "A graphics rendering project in C.",
        "tech": ["C"],
        "link": "https://github.com/mohanshenoy43-create/2D-Graphics-R25EJ077",
        "semester": 1
      },
      {
        "id": "proj-2",
        "title": "LeetCode Solutions",
        "description": "A growing practice collection covering arrays and strings, algorithms, stacks, and linked lists, with progress notes for each problem.",
        "tech": ["Python", "Algorithms", "Problem Solving"],
        "link": "https://github.com/mohanshenoy43-create/leetcode-solutions",
        "semester": 2
      }
    ],
    "skills": [
      {
        "category": "Languages",
        "items": ["C", "HTML", "CSS"]
      }
    ]
  };
  localStorage.setItem('mohan_portfolio_data', JSON.stringify(portfolioData));
  renderPortfolio();
}

// Render All Portfolio Sections
function renderPortfolio() {
  if (!portfolioData) return;
  
  updateStatsCounters();
  renderProfile();
  renderTimeline();
  renderAchievements();
  renderProjects();
  renderSkills();
}

// Re-calculate achievements and projects count dynamic stats
function updateStatsCounters() {
  const achCount = portfolioData.achievements.length;
  const projCount = portfolioData.projects.length;
  const curSem = portfolioData.profile.currentSemester;
  
  portfolioData.profile.stats = [
    { "label": "Current Semester", "value": `${curSem}${curSem === 1 ? 'st' : curSem === 2 ? 'nd' : curSem === 3 ? 'rd' : 'th'} Sem` },
    { "label": "Expected CGPA", "value": "TBD" },
    { "label": "Completed Projects", "value": projCount.toString() },
    { "label": "Achievements Count", "value": achCount.toString() }
  ];
}

// Render Profile details (Hero, Bio, Socials, Stats)
function renderProfile() {
  const profile = portfolioData.profile;
  
  // Hero Name
  document.getElementById('hero-name').textContent = profile.name;
  document.getElementById('profile-meta-name').textContent = profile.name;
  
  // Bio
  document.getElementById('hero-bio').textContent = profile.bio;
  
  // Department & University
  document.getElementById('profile-meta-dept').innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${profile.department}<br><small>${profile.university}</small>`;
  
  // Stats grid
  const statsGrid = document.getElementById('stats-grid');
  statsGrid.innerHTML = '';
  profile.stats.forEach(stat => {
    const item = document.createElement('div');
    item.className = 'stat-item';
    item.innerHTML = `
      <span class="stat-val">${stat.value}</span>
      <span class="stat-lbl">${stat.label}</span>
    `;
    statsGrid.appendChild(item);
  });
  
  // Contact details
  document.getElementById('contact-email').textContent = profile.socials.email;
  
  // Social link icons in contact section
  const contactSocials = document.getElementById('contact-socials');
  contactSocials.innerHTML = '';
  
  if (profile.socials.github) {
    contactSocials.innerHTML += `<a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>`;
  }
  if (profile.socials.linkedin) {
    contactSocials.innerHTML += `<a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>`;
  }
  if (profile.socials.hackerrank) {
    contactSocials.innerHTML += `<a href="${profile.socials.hackerrank}" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="HackerRank"><i class="fa-brands fa-hackerrank"></i></a>`;
  }
  contactSocials.innerHTML += `<a href="mailto:${profile.socials.email}" class="social-circle-btn" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>`;
}

// Render 1 to 8 Semester Timeline
function renderTimeline() {
  const timelineContainer = document.getElementById('timeline-steps');
  timelineContainer.innerHTML = '';
  
  const currentSemester = parseInt(portfolioData.profile.currentSemester) || 1;
  
  for (let i = 1; i <= 8; i++) {
    const step = document.createElement('button');
    let stateClass = 'upcoming';
    if (i < currentSemester) {
      stateClass = 'completed';
    } else if (i === currentSemester) {
      stateClass = 'active';
    }
    
    step.className = `timeline-step ${stateClass} ${activeSemesterFilter === i ? 'active' : ''}`;
    step.setAttribute('data-sem', i);
    
    // Icon inside step node: display checkmark for completed, pencil/number for active, lock for upcoming
    let nodeIcon = i;
    if (i < currentSemester) {
      nodeIcon = '<i class="fa-solid fa-check"></i>';
    }
    
    step.innerHTML = `
      <div class="step-node">${nodeIcon}</div>
      <div class="step-lbl">Sem ${i}</div>
    `;
    
    step.addEventListener('click', () => {
      // Toggle semester filter
      if (activeSemesterFilter === i) {
        activeSemesterFilter = null; // reset filter if clicked again
      } else {
        activeSemesterFilter = i;
      }
      
      // Update UI active states
      document.querySelectorAll('.timeline-step').forEach(btn => {
        btn.classList.remove('active');
        // Re-add 'active' class to currentSemester step unless selected filter is different
        const semNum = parseInt(btn.getAttribute('data-sem'));
        if (semNum === currentSemester && activeSemesterFilter === null) {
          btn.classList.add('active');
        }
      });
      
      if (activeSemesterFilter !== null) {
        step.classList.add('active');
        showSemesterDetails(activeSemesterFilter);
      } else {
        showSemesterDetails(currentSemester);
      }
      
      // Refresh achievements list
      renderAchievements();
    });
    
    timelineContainer.appendChild(step);
  }
  
  // Set default description in box matching current semester initially
  if (activeSemesterFilter === null) {
    showSemesterDetails(currentSemester);
  }
}

// Display semester detail information box
function showSemesterDetails(semIndex) {
  const detail = BTECH_SEMESTERS[semIndex];
  if (!detail) return;
  
  document.getElementById('sem-detail-badge').textContent = `Semester ${semIndex}`;
  document.getElementById('sem-detail-title').textContent = detail.title;
  document.getElementById('sem-detail-period').textContent = detail.period;
  document.getElementById('sem-detail-desc').textContent = detail.desc;
  
  // Count achievements in this semester
  const achCount = portfolioData.achievements.filter(ach => parseInt(ach.semester) === semIndex).length;
  document.getElementById('sem-achievements-count').textContent = achCount;
}

// Render Achievements (filtered by active semester filter and category filter)
function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = '';
  
  let achievements = portfolioData.achievements;
  
  // 1. Filter by category
  if (activeCategoryFilter !== 'all') {
    achievements = achievements.filter(ach => ach.category === activeCategoryFilter);
  }
  
  // 2. Filter by semester
  if (activeSemesterFilter !== null) {
    achievements = achievements.filter(ach => parseInt(ach.semester) === activeSemesterFilter);
  }
  
  // Display empty state if no achievements found
  if (achievements.length === 0) {
    grid.innerHTML = `
      <div class="glass-card text-center" style="grid-column: 1 / -1; padding: 40px;">
        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 15px; display: block;"></i>
        <h4 style="margin-bottom: 5px;">No achievements logged yet</h4>
        <p class="text-muted" style="font-size: 0.9rem;">
          ${activeSemesterFilter ? `No achievements found for Semester ${activeSemesterFilter}.` : 'No achievements match this filter.'}
          ${portfolioData.profile.currentSemester >= (activeSemesterFilter || 0) ? 'Toggle "Edit Mode" to log one!' : ''}
        </p>
        ${activeSemesterFilter ? `<button class="btn btn-secondary btn-sm mt-md" onclick="resetSemesterFilter()">Show All Semesters</button>` : ''}
      </div>
    `;
    return;
  }
  
  // Sort achievements by date descending
  achievements.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  achievements.forEach(ach => {
    const card = document.createElement('div');
    card.className = 'glass-card achievement-card';
    
    // Category Icons
    let categoryIcon = '<i class="fa-solid fa-award"></i>';
    if (ach.category === 'academic') categoryIcon = '<i class="fa-solid fa-graduation-cap"></i>';
    if (ach.category === 'technical') categoryIcon = '<i class="fa-solid fa-code"></i>';
    if (ach.category === 'extracurricular') categoryIcon = '<i class="fa-solid fa-user-group"></i>';
    
    // Format Date
    const formattedDate = new Date(ach.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
    
    card.innerHTML = `
      <div class="ach-card-header">
        <div class="ach-meta">
          <span class="ach-badge-sem">Sem ${ach.semester}</span>
          <span class="ach-badge-cat">${categoryIcon} ${ach.category}</span>
        </div>
        <span class="ach-date">${formattedDate}</span>
      </div>
      <h3 class="ach-title">${ach.title}</h3>
      <p class="ach-desc">${ach.description}</p>
      ${ach.link ? `<a href="${ach.link}" target="_blank" rel="noopener noreferrer" class="ach-link">View Details <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
    `;
    
    grid.appendChild(card);
  });
}

// Reset Semester Filter
window.resetSemesterFilter = function() {
  activeSemesterFilter = null;
  renderTimeline();
  renderAchievements();
};

// Render Projects Cards
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';
  
  const projects = portfolioData.projects;
  
  if (projects.length === 0) {
    grid.innerHTML = `
      <div class="glass-card text-center" style="grid-column: 1 / -1;">
        <p class="text-muted">No projects added yet. Click Edit Mode to add some!</p>
      </div>
    `;
    return;
  }
  
  projects.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'glass-card project-card';
    
    const tagsHTML = proj.tech.map(t => `<span class="proj-tag">${t}</span>`).join('');
    
    card.innerHTML = `
      <div class="proj-icon-box">
        <i class="fa-solid fa-cubes"></i>
      </div>
      <h3 class="proj-title">${proj.title}</h3>
      <p class="proj-desc">${proj.description}</p>
      <div class="proj-tech-row">
        ${tagsHTML}
      </div>
      <div class="proj-footer">
        <span class="proj-sem-tag">Semester ${proj.semester}</span>
        ${proj.link ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="ach-link">Code / Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Render Skills section dynamically grouped by category
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = '';
  
  const skills = portfolioData.skills;
  
  if (skills.length === 0) {
    grid.innerHTML = `<p class="text-muted text-center" style="grid-column: 1 / -1;">No skills added yet.</p>`;
    return;
  }
  
  skills.forEach(skillGroup => {
    const card = document.createElement('div');
    card.className = 'glass-card skills-group-card';
    
    const tagsHTML = skillGroup.items.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    
    card.innerHTML = `
      <h3>${skillGroup.category}</h3>
      <div class="skills-tags-wrapper">
        ${tagsHTML}
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation active links during scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    // 1. Header background scroll effect
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // 2. Active nav link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Navigation toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  
  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpened = navMenu.classList.contains('open');
    mobileMenuBtn.innerHTML = isOpened ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  
  // Close menu on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // Achievement Category Filter click handlers
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategoryFilter = btn.getAttribute('data-filter');
      renderAchievements();
    });
  });

  // Contact form submission mock handling
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    alert(`Thank you, ${name}! Your mock message has been sent successfully.`);
    contactForm.reset();
  });
  
  // Set current year in footer
  document.getElementById('footer-year').textContent = new Date().getFullYear();
}

// Global hook to reload page changes from admin editor
window.refreshMainPortfolioView = function() {
  portfolioData = JSON.parse(localStorage.getItem('mohan_portfolio_data'));
  renderPortfolio();
};
