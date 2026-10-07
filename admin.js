/* ==========================================================================
   PORTFOLIO ADMIN DASHBOARD - VISUAL EDITOR & DATA MANAGEMENT
   ========================================================================== */

const CORRECT_PASSCODE = 'reva2025';

// Admin State
let currentEditingData = null;

document.addEventListener('DOMContentLoaded', () => {
  setupAdminControls();
});

// Setup admin panel controls, event hooks, and modals
function setupAdminControls() {
  const adminToggleBtn = document.getElementById('admin-toggle-btn');
  const authModal = document.getElementById('auth-modal');
  const authClose = document.getElementById('auth-modal-close');
  const authCancel = document.getElementById('auth-cancel-btn');
  const authSubmit = document.getElementById('auth-submit-btn');
  const authInput = document.getElementById('admin-passcode');
  const authError = document.getElementById('auth-error-msg');
  
  const adminModal = document.getElementById('admin-modal');
  const adminClose = document.getElementById('admin-modal-close');
  
  // 1. Auth triggers
  adminToggleBtn.addEventListener('click', () => {
    // If already verified in session, skip passcode screen
    if (sessionStorage.getItem('portfolio_admin_auth') === 'true') {
      openAdminModal();
    } else {
      authInput.value = '';
      authError.style.display = 'none';
      authModal.classList.add('open');
      authInput.focus();
    }
  });
  
  authClose.addEventListener('click', () => authModal.classList.remove('open'));
  authCancel.addEventListener('click', () => authModal.classList.remove('open'));
  
  authSubmit.addEventListener('click', verifyPasscode);
  authInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') verifyPasscode();
  });
  
  function verifyPasscode() {
    if (authInput.value === CORRECT_PASSCODE) {
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      authModal.classList.remove('open');
      openAdminModal();
    } else {
      authError.style.display = 'block';
      authInput.focus();
    }
  }
  
  // 2. Admin Modal actions
  adminClose.addEventListener('click', () => {
    adminModal.classList.remove('open');
  });
  
  // Tab navigation in Admin Panel
  const tabButtons = document.querySelectorAll('.admin-tab-btn');
  const tabContents = document.querySelectorAll('.admin-tab-content');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      document.getElementById(`tab-${targetTab}`).classList.add('active');
      
      // Load respective tab managers
      if (targetTab === 'export') {
        renderJSONExport();
      }
    });
  });
  
  // 3. Attach forms events
  setupProfileForm();
  setupAchievementsForm();
  setupProjectsForm();
  setupSkillsForm();
  setupExportActions();
}

// Open the administrator visual editor dashboard
function openAdminModal() {
  // Pull current active dataset
  currentEditingData = JSON.parse(localStorage.getItem('mohan_portfolio_data'));
  
  // Prepopulate forms
  populateProfileForm();
  populateAchievementsTable();
  populateProjectsTable();
  populateSkillsManager();
  
  document.getElementById('admin-modal').classList.add('open');
}

// PROFILE TAB LOGIC
function setupProfileForm() {
  const form = document.getElementById('admin-profile-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    currentEditingData.profile.name = document.getElementById('edit-name').value;
    currentEditingData.profile.title = document.getElementById('edit-title').value;
    currentEditingData.profile.university = document.getElementById('edit-university').value;
    currentEditingData.profile.department = document.getElementById('edit-dept').value;
    currentEditingData.profile.currentYear = document.getElementById('edit-year').value;
    currentEditingData.profile.currentSemester = parseInt(document.getElementById('edit-semester').value);
    currentEditingData.profile.bio = document.getElementById('edit-bio').value;
    currentEditingData.profile.socials.github = document.getElementById('edit-github').value;
    currentEditingData.profile.socials.linkedin = document.getElementById('edit-linkedin').value;
    currentEditingData.profile.socials.hackerrank = document.getElementById('edit-hackerrank').value;
    currentEditingData.profile.socials.email = document.getElementById('edit-email').value;
    
    saveWorkspaceData();
    alert('Profile information updated in drafts!');
  });
}

function populateProfileForm() {
  const profile = currentEditingData.profile;
  document.getElementById('edit-name').value = profile.name;
  document.getElementById('edit-title').value = profile.title;
  document.getElementById('edit-university').value = profile.university;
  document.getElementById('edit-dept').value = profile.department;
  document.getElementById('edit-year').value = profile.currentYear;
  document.getElementById('edit-semester').value = profile.currentSemester;
  document.getElementById('edit-bio').value = profile.bio;
  document.getElementById('edit-github').value = profile.socials.github || '';
  document.getElementById('edit-linkedin').value = profile.socials.linkedin || '';
  document.getElementById('edit-hackerrank').value = profile.socials.hackerrank || '';
  document.getElementById('edit-email').value = profile.socials.email;
}

// ACHIEVEMENTS TAB LOGIC
function setupAchievementsForm() {
  const showAddBtn = document.getElementById('btn-show-add-ach');
  const achForm = document.getElementById('ach-form');
  const cancelBtn = document.getElementById('btn-cancel-ach');
  
  showAddBtn.addEventListener('click', () => {
    achForm.reset();
    document.getElementById('ach-edit-id').value = '';
    document.getElementById('ach-form-title').textContent = 'Add Achievement';
    achForm.classList.remove('hidden-form');
  });
  
  cancelBtn.addEventListener('click', () => {
    achForm.classList.add('hidden-form');
    achForm.reset();
  });
  
  achForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const editId = document.getElementById('ach-edit-id').value;
    const title = document.getElementById('ach-input-title').value;
    const category = document.getElementById('ach-input-category').value;
    const semester = parseInt(document.getElementById('ach-input-semester').value);
    const date = document.getElementById('ach-input-date').value;
    const link = document.getElementById('ach-input-link').value;
    const description = document.getElementById('ach-input-desc').value;
    
    if (editId) {
      // Edit mode
      const index = currentEditingData.achievements.findIndex(a => a.id === editId);
      if (index !== -1) {
        currentEditingData.achievements[index] = { id: editId, title, category, semester, date, description, link };
      }
    } else {
      // Create mode
      const newAch = {
        id: `ach-${Date.now()}`,
        title,
        category,
        semester,
        date,
        description,
        link
      };
      currentEditingData.achievements.push(newAch);
    }
    
    saveWorkspaceData();
    populateAchievementsTable();
    achForm.classList.add('hidden-form');
    achForm.reset();
    alert('Achievement saved!');
  });
}

function populateAchievementsTable() {
  const tbody = document.getElementById('admin-achievements-list');
  tbody.innerHTML = '';
  
  const achievements = currentEditingData.achievements;
  
  // Sort achievements by semester, then date
  achievements.sort((a, b) => parseInt(a.semester) - parseInt(b.semester));
  
  achievements.forEach(ach => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>Sem ${ach.semester}</td>
      <td><strong>${ach.title}</strong></td>
      <td style="text-transform: capitalize;">${ach.category}</td>
      <td>
        <button class="action-btn btn-edit" title="Edit" onclick="editAchievement('${ach.id}')">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="action-btn btn-delete" title="Delete" onclick="deleteAchievement('${ach.id}')">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Global functions for list triggers
window.editAchievement = function(id) {
  const ach = currentEditingData.achievements.find(a => a.id === id);
  if (!ach) return;
  
  document.getElementById('ach-edit-id').value = ach.id;
  document.getElementById('ach-input-title').value = ach.title;
  document.getElementById('ach-input-category').value = ach.category;
  document.getElementById('ach-input-semester').value = ach.semester;
  document.getElementById('ach-input-date').value = ach.date;
  document.getElementById('ach-input-link').value = ach.link || '';
  document.getElementById('ach-input-desc').value = ach.description;
  
  document.getElementById('ach-form-title').textContent = 'Edit Achievement';
  document.getElementById('ach-form').classList.remove('hidden-form');
  document.getElementById('ach-form').scrollIntoView({ behavior: 'smooth' });
};

window.deleteAchievement = function(id) {
  if (confirm('Are you sure you want to delete this achievement?')) {
    currentEditingData.achievements = currentEditingData.achievements.filter(a => a.id !== id);
    saveWorkspaceData();
    populateAchievementsTable();
  }
};

// PROJECTS TAB LOGIC
function setupProjectsForm() {
  const showAddBtn = document.getElementById('btn-show-add-proj');
  const projForm = document.getElementById('proj-form');
  const cancelBtn = document.getElementById('btn-cancel-proj');
  
  showAddBtn.addEventListener('click', () => {
    projForm.reset();
    document.getElementById('proj-edit-id').value = '';
    document.getElementById('proj-form-title').textContent = 'Add Project';
    projForm.classList.remove('hidden-form');
  });
  
  cancelBtn.addEventListener('click', () => {
    projForm.classList.add('hidden-form');
    projForm.reset();
  });
  
  projForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const editId = document.getElementById('proj-edit-id').value;
    const title = document.getElementById('proj-input-title').value;
    const semester = parseInt(document.getElementById('proj-input-semester').value);
    const link = document.getElementById('proj-input-link').value;
    const description = document.getElementById('proj-input-desc').value;
    
    // Parse comma separated tech tags
    const tech = document.getElementById('proj-input-tech').value
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
      
    if (editId) {
      const index = currentEditingData.projects.findIndex(p => p.id === editId);
      if (index !== -1) {
        currentEditingData.projects[index] = { id: editId, title, semester, description, tech, link };
      }
    } else {
      const newProj = {
        id: `proj-${Date.now()}`,
        title,
        semester,
        description,
        tech,
        link
      };
      currentEditingData.projects.push(newProj);
    }
    
    saveWorkspaceData();
    populateProjectsTable();
    projForm.classList.add('hidden-form');
    projForm.reset();
    alert('Project saved!');
  });
}

function populateProjectsTable() {
  const tbody = document.getElementById('admin-projects-list');
  tbody.innerHTML = '';
  
  const projects = currentEditingData.projects;
  projects.sort((a, b) => parseInt(a.semester) - parseInt(b.semester));
  
  projects.forEach(proj => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>Sem ${proj.semester}</td>
      <td><strong>${proj.title}</strong></td>
      <td>${proj.tech.slice(0, 3).join(', ')}${proj.tech.length > 3 ? '...' : ''}</td>
      <td>
        <button class="action-btn btn-edit" title="Edit" onclick="editProject('${proj.id}')">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="action-btn btn-delete" title="Delete" onclick="deleteProject('${proj.id}')">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.editProject = function(id) {
  const proj = currentEditingData.projects.find(p => p.id === id);
  if (!proj) return;
  
  document.getElementById('proj-edit-id').value = proj.id;
  document.getElementById('proj-input-title').value = proj.title;
  document.getElementById('proj-input-semester').value = proj.semester;
  document.getElementById('proj-input-link').value = proj.link || '';
  document.getElementById('proj-input-tech').value = proj.tech.join(', ');
  document.getElementById('proj-input-desc').value = proj.description;
  
  document.getElementById('proj-form-title').textContent = 'Edit Project';
  document.getElementById('proj-form').classList.remove('hidden-form');
  document.getElementById('proj-form').scrollIntoView({ behavior: 'smooth' });
};

window.deleteProject = function(id) {
  if (confirm('Are you sure you want to delete this project?')) {
    currentEditingData.projects = currentEditingData.projects.filter(p => p.id !== id);
    saveWorkspaceData();
    populateProjectsTable();
  }
};

// SKILLS TAB LOGIC
function setupSkillsForm() {
  const groupForm = document.getElementById('skill-group-form');
  
  groupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const categoryName = document.getElementById('skill-input-group').value;
    const skillName = document.getElementById('skill-input-name').value.trim();
    
    if (!skillName) return;
    
    const categoryObj = currentEditingData.skills.find(s => s.category === categoryName);
    if (categoryObj) {
      if (!categoryObj.items.includes(skillName)) {
        categoryObj.items.push(skillName);
        saveWorkspaceData();
        populateSkillsManager();
        document.getElementById('skill-input-name').value = '';
      } else {
        alert('Skill already exists in this category!');
      }
    }
  });
}

function populateSkillsManager() {
  const container = document.getElementById('admin-skills-list-container');
  const categorySelect = document.getElementById('skill-input-group');
  
  container.innerHTML = '';
  categorySelect.innerHTML = '';
  
  const skills = currentEditingData.skills;
  
  skills.forEach(skillGroup => {
    // 1. Populate category dropdown
    const option = document.createElement('option');
    option.value = skillGroup.category;
    option.textContent = skillGroup.category;
    categorySelect.appendChild(option);
    
    // 2. Render skill group editor block
    const box = document.createElement('div');
    box.className = 'admin-skill-category-box';
    
    const badgesHTML = skillGroup.items.map(item => `
      <span class="admin-skill-badge">
        ${item}
        <button type="button" class="delete-skill-badge-btn" onclick="deleteSkillTag('${skillGroup.category}', '${item}')">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </span>
    `).join('');
    
    box.innerHTML = `
      <h5>${skillGroup.category}</h5>
      <div class="admin-skills-flex">
        ${badgesHTML || '<p class="text-muted" style="font-size: 0.8rem;">No skill tags inside this category.</p>'}
      </div>
    `;
    
    container.appendChild(box);
  });
}

window.deleteSkillTag = function(categoryName, itemName) {
  const categoryObj = currentEditingData.skills.find(s => s.category === categoryName);
  if (categoryObj) {
    categoryObj.items = categoryObj.items.filter(item => item !== itemName);
    saveWorkspaceData();
    populateSkillsManager();
  }
};

// SYNC & EXPORT TAB LOGIC
function setupExportActions() {
  const downloadBtn = document.getElementById('btn-download-json');
  const copyBtn = document.getElementById('btn-copy-json');
  const resetBtn = document.getElementById('btn-reset-data');
  
  downloadBtn.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentEditingData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "portfolio-data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });
  
  copyBtn.addEventListener('click', () => {
    const jsonText = JSON.stringify(currentEditingData, null, 2);
    navigator.clipboard.writeText(jsonText).then(() => {
      alert('JSON copied to clipboard! You can paste it into portfolio-data.json.');
    }).catch(err => {
      console.error('Copy failed:', err);
    });
  });
  
  resetBtn.addEventListener('click', () => {
    if (confirm('This will wipe all local edits and reload the default code file configuration. Proceed?')) {
      localStorage.removeItem('mohan_portfolio_data');
      location.reload();
    }
  });
}

function renderJSONExport() {
  const preview = document.getElementById('json-preview-area');
  preview.textContent = JSON.stringify(currentEditingData, null, 2);
}

// CORE DB SAVE HELPERS
function saveWorkspaceData() {
  localStorage.setItem('mohan_portfolio_data', JSON.stringify(currentEditingData));
  // Call main viewer reload
  if (typeof window.refreshMainPortfolioView === 'function') {
    window.refreshMainPortfolioView();
  }
}
