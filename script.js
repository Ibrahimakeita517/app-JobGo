function showForm(type) {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.add("hidden");

    if (type === "login") {
        document.getElementById("login-form").classList.remove("hidden");
    } else {
        document.getElementById("register-form").classList.remove("hidden");
    }
}

function login(event) {
    event.preventDefault();
    let username = document.getElementById("login-username").value;
    document.getElementById("profile-name").innerText = username;
    document.getElementById("auth-container").classList.add("hidden");
    document.getElementById("site-container").classList.remove("hidden");
}

function register(event) {
    event.preventDefault();
    let nom = document.getElementById("register-nom").value;
    let prenom = document.getElementById("register-prenom").value;
    document.getElementById("profile-name").innerText = nom + " " + prenom;
    document.getElementById("auth-container").classList.add("hidden");
    document.getElementById("site-container").classList.remove("hidden");
}

function toggleProfile() {
    document.getElementById("profile-panel").classList.toggle("hidden");
}



console.log('script.js chargé');

let currentRating = 0;
function submitRating() {
    if (currentRating === 0) {
        alert("Veuillez sélectionner une note");
        return;
    }
    let comment = document.getElementById('comment').value;
    let ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
    ratings.push({rating: currentRating, comment});
    localStorage.setItem('ratings', JSON.stringify(ratings));
    alert("Note envoyée !");
    document.getElementById('comment').value = "";
    setRating(0);
}

const state = {
    currentView: 'main-menu',
    jobs: JSON.parse(localStorage.getItem('jobs')) || []
};

function showMainMenu() {
    state.currentView = 'main-menu';
    document.getElementById('app-content').innerHTML = `
        <div class="main-menu">
            <div class="menu-card big-card" onclick="showJobForm()">
                <i class="fas fa-briefcase"></i>
                <h2>Je propose un job</h2>
                <p>Publiez une offre d'emploi pour trouver le candidat idéal</p>
                <button class="btn btn-primary">Publier une offre</button>
            </div>
            
            <div class="menu-card small-card" onclick="showJobList()">
                <i class="fas fa-search"></i>
                <h2>Je cherche un job</h2>
                <p>Parcourez les offres disponibles et contactez les recruteurs</p>
                <button class="btn btn-success">Voir les offres</button>
            </div>
        </div>
    `;
}

function showJobForm() {
    state.currentView = 'job-form';
    document.getElementById('app-content').innerHTML = `
        <div class="form-container">
            <button class="btn back-btn" onclick="showMainMenu()">
                <i class="fas fa-arrow-left"></i> Retour
            </button>
            <h2 class="form-title">Publier une offre d'emploi</h2>
            
            <form id="job-form" onsubmit="handleJobSubmit(event)">
                <div class="form-group">
                    <label for="job-type" class="required">Type de travail</label>
                    <select id="job-type" required>
                     <option value="">Sélectionnez un type</option>
                    <option value="Accessoires-Téléphones">Accessoires-Téléphones</option>
                    <option value="Animation-musicale">Animation-musicale</option>
                    <option value="Coiffure-Tressage">Coiffure-Tressage</option>
                    <option value="Couture">Couture</option>
                    <option value="Électricité">Électricité</option>
                    <option value="Gardiennage">Gardiennage</option>
                    <option value="Infographie">Infographie</option>
                    <option value="Livraison">Livraison</option>
                    <option value="Menuiserie-bois">Menuiserie-bois</option>
                    <option value="Mécanique-auto">Mécanique-auto</option>
                    <option value="Mécanique-moto">Mécanique-moto</option>
                    <option value="Moto-taxi">Moto-taxi</option>
                    <option value="Nettoyage">Nettoyage</option>
                    <option value="Peinture">Peinture</option>
                    <option value="Photographie">Photographie</option>
                    <option value="Plomberie">Plomberie</option>
                    <option value="Réparation-Téléphone">Réparation-Téléphone</option>
                    <option value="Soudure">Soudure</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="location" class="required">Lieu</label>
                    <input type="text" id="location" placeholder="Quartier" required>
                </div>
                
                <div class="form-group">
                    <label for="salary" class="required">Salaire</label>
                    <input type="text" id="salary" placeholder="" required>
                </div>
                
                <div class="form-group">
                    <label for="phone" class="required">Numéro de téléphone</label>
                    <input type="tel" id="phone" placeholder="" required>
                </div>
                
                <div class="form-group">
                    <label for="description">Description (facultatif)</label>
                    <textarea id="description" placeholder="Décrivez le poste, les compétences requises..."></textarea>
                </div>
                
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">
                        <i class="fas fa-paper-plane"></i> Publier l'offre
                    </button>
                </div>
            </form>
        </div>
    `;
}

function showJobList() {
    state.currentView = 'job-list';
    const appContent = document.getElementById('app-content');
    
    if (state.jobs.length === 0) {
        appContent.innerHTML = `
            <div>
                <button class="btn back-btn" onclick="showMainMenu()">
                    <i class="fas fa-arrow-left"></i> Retour
                </button>
                
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h2>Aucune offre disponible</h2>
                    <p>Il n'y a actuellement aucune offre d'emploi publiée.</p>
                    <button class="btn btn-primary" onclick="showJobForm()">
                        <i class="fas fa-plus"></i> Publier une offre
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    let jobsHTML = `
        <div>
            <button class="btn back-btn" onclick="showMainMenu()">
                <i class="fas fa-arrow-left"></i> Retour
            </button>
            
            <h2 class="form-title">Offres disponibles (${state.jobs.length})</h2>
            
            <div class="jobs-container">
    `;
    
    state.jobs.forEach(job => {
        jobsHTML += `
            <div class="job-card" id="job-${job.id}">
                <div class="job-header">
                    <h3 class="job-title">${job.type}</h3>
                    <div class="job-salary">${job.salary}</div>
                </div>
                
                <div class="job-details">
                    <div class="job-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${job.location}</span>
                    </div>
                    <div class="job-detail">
                        <i class="fas fa-clock"></i>
                        <span>Publié le ${new Date(job.timestamp).toLocaleDateString()}</span>
                    </div>
                </div>
                
                ${job.description ? `<div class="job-description">${job.description}</div>` : ''}
                
                <button class="btn btn-success" onclick="showContact(${job.id})">
                    <i class="fas fa-phone-alt"></i> Contacter
                </button>
                
                <div class="contact-section" id="contact-${job.id}">
                    <div class="contact-info">
                        <i class="fas fa-phone"></i>
                        <span>${job.phone}</span>
                    </div>
                    
                    <div class="contact-actions">
                        <a href="tel:${job.phone}" class="btn btn-success">
                            <i class="fas fa-phone-alt"></i> Appeler
                        </a>
                        <a href="https://wa.me/${job.phone.replace(/[^0-9]/g, '')}" target="_blank" class="btn" style="background: #1942caff; color: white;">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    
    jobsHTML += `
                    </div>
                </div>
            `;
    
    appContent.innerHTML = jobsHTML;
}

function handleJobSubmit(event) {
    event.preventDefault();
    
    const jobType = document.getElementById('job-type').value;
    const location = document.getElementById('location').value;
    const salary = document.getElementById('salaire').value;
    const phone = document.getElementById('phone').value;
    const description = document.getElementById('description').value;
    
    if (!jobType || !location || !salaire || !phone) {
        showMessage('error', 'Veuillez remplir tous les champs obligatoires');
        return;
    }
    
    const newJob = {
        id: Date.now(),
        type: jobType,
        location: location,
        salary: salaire,
        phone: phone,
        description: description,
        timestamp: Date.now()
    };
    
    state.jobs.unshift(newJob);
    localStorage.setItem('jobs', JSON.stringify(state.jobs));
    showMessage('success', 'Offre publiée avec succès !');
    document.getElementById('job-form').reset();
    
    setTimeout(() => {
        showMainMenu();
    }, 2000);
}

function showContact(jobId) {
    document.querySelectorAll('.contact-section').forEach(el => {
        el.style.display = 'none';
    });
    
    const contactSection = document.getElementById(`contact-${jobId}`);
    if (contactSection) {
        contactSection.style.display = 'block';
        document.getElementById(`job-${jobId}`).scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

function showMessage(type, text) {
    const appContent = document.getElementById('app-content');
    appContent.insertAdjacentHTML('afterbegin', `
        <div class="message message-${type}">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <div>${text}</div>
        </div>
    `);
    
    setTimeout(() => {
        const message = document.querySelector('.message');
        if (message) message.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    showMainMenu();
});

