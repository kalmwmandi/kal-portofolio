/*=============== SHOW MENU ===============*/
const navMenu =document.getElementById('nav-menu'),
            navToggle = document.getElementById('nav-toggle'),
            navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header')
    // Use window.scrollY instead of this.scrollY
    window.scrollY >= 50 ? header.classList.add('blur-header')
                        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
            contactMessage = document.getElementById('contact-message')

            const sendEmail = (e) => {
                e.preventDefault()
            
                // Add loading state
                contactMessage.textContent = 'Sending message...'
            
                emailjs.sendForm('service_lg3tcn9','template_lyipwwd','#contact-form','nApPojeRopCgpihFv')
                    .then(() => {
                        contactMessage.textContent = 'Message sent successfully ✅'
            
                        setTimeout(() => {
                            contactMessage.textContent = ''
                        }, 5000)
            
                        contactForm.reset()
                    })
                    .catch((error) => {
                        console.error('EmailJS Error:', error)
                        contactMessage.textContent = 'Message not sent (service error) ❌'
                    })
            }

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // Use window.scrollY instead of this.scrollY
    window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                         : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// Change querySelector to querySelectorAll to select all sections
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              // Fix selector syntax and remove extra space
              sectionsClass = document.querySelector('.nav__menu a[href*="' + sectionId + '"]')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass?.classList.add('active-link')
        }else{
            sectionsClass?.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal('.home__data, .experience, .skills, .contact__container')
sr.reveal('.home__img', {delay: 600})
sr.reveal('.home__scroll', {delay: 800})
sr.reveal('.work__card, .services__card', {interval: 100})
sr.reveal('.about__content', {origin: 'right'})
sr.reveal('.about__img', {origin: 'left'})

// Add this to your main.js file
document.addEventListener('DOMContentLoaded', function() {
    // Skill descriptions and proficiency levels
    const skillsInfo = {
        "Python": {
            description: "Experienced in building web applications, data analysis, and automation scripts using Python.",
            proficiency: 85,
            experience: "5+ months of experience"
        },
        "DJango": {
            description: "Proficient in creating robust web applications with Django's MVT architecture, forms, and ORM.",
            proficiency: 80,
            experience: "5+ months of experience"
        },
        "Flask": {
            description: "Skilled in developing lightweight web applications and RESTful APIs with Flask.",
            proficiency: 80,
            experience: "1 month of experience"
        },
        "Vue": {
            description: "Experienced in building reactive single-page applications with Vue.js framework and Vuex state management.",
            proficiency: 85,
            experience: "2 years of experience"
        },
        "JavaScript": {
            description: "Strong knowledge of ES6+, DOM manipulation, asynchronous programming, and modern JS frameworks.",
            proficiency: 80,
            experience: "3 years of experience"
        },
        "GitHub": {
            description: "Proficient in version control, collaborative development, CI/CD workflows, and project management with GitHub.",
            proficiency: 60,
            experience: "1 year of experience"
        },
        "Tailwind CSS": {
            description: "Skilled in creating custom, responsive designs using Tailwind's utility-first approach.",
            proficiency: 80,
            experience: "1 year of experience"
        },
        "Dart": {
            description: "Competent in developing cross-platform mobile applications with Dart and Flutter framework.",
            proficiency: 65,
            experience: "1 month of experience"
        },
        "Figma": {
            description: "Proficient in UI/UX design, prototyping, and collaboration using Figma design tools.",
            proficiency: 85,
            experience: "2 years of experience"
        }
    };

    // Create modal container if it doesn't exist
    if (!document.getElementById('skill-modal')) {
        const modalHTML = `
            <div id="skill-modal" class="skill-modal">
                <div class="skill-modal-content">
                    <span class="skill-modal-close">&times;</span>
                    <h3 id="skill-modal-title" class="skill-modal-title"></h3>
                    <div class="skill-modal-info">
                        <p id="skill-modal-description"></p>
                        <div class="skill-progress-container">
                            <div class="skill-progress-label">
                                <span>Proficiency:</span>
                                <span id="skill-modal-percentage">0%</span>
                            </div>
                            <div class="skill-progress-bar">
                                <div id="skill-modal-progress" class="skill-progress"></div>
                            </div>
                        </div>
                        <p id="skill-modal-experience" class="skill-experience"></p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Get modal elements
    const modal = document.getElementById('skill-modal');
    const modalTitle = document.getElementById('skill-modal-title');
    const modalDescription = document.getElementById('skill-modal-description');
    const modalProgress = document.getElementById('skill-modal-progress');
    const modalPercentage = document.getElementById('skill-modal-percentage');
    const modalExperience = document.getElementById('skill-modal-experience');
    const closeBtn = document.querySelector('.skill-modal-close');

    // Add click event to all skill boxes
    const skillBoxes = document.querySelectorAll('.skills__box');
    skillBoxes.forEach(box => {
        box.style.cursor = 'pointer';
        box.addEventListener('click', function() {
            const skillName = this.querySelector('.skills__name').textContent;
            const skill = skillsInfo[skillName];
            
            if (skill) {
                modalTitle.textContent = skillName;
                modalDescription.textContent = skill.description;
                modalProgress.style.width = skill.proficiency + '%';
                modalPercentage.textContent = skill.proficiency + '%';
                modalExperience.textContent = skill.experience;
                
                // Show modal with fade-in effect
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show-modal');
                }, 10);
            }
        });
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show-modal');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show-modal');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
});