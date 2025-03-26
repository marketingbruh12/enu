document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const applyBtn = document.getElementById('applyBtn');
    const contactApplyBtn = document.getElementById('contactApplyBtn');
    const typeformModal = document.getElementById('typeformModal');
    const closeTypeform = document.getElementById('closeTypeform');
    const typeformNext = document.getElementById('typeformNext');
    const typeformBack = document.getElementById('typeformBack');
    const typeformSubmit = document.getElementById('typeformSubmit');
    const typeformProgress = document.querySelector('.typeform-progress');
    const typeformSteps = document.querySelectorAll('.typeform-step');
    
    // Variables
    let currentStep = 1;
    const totalSteps = typeformSteps.length;
    
    // Functions
    function openTypeform() {
        typeformModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        updateTypeformProgress();
        
        // Reset to first step when opening
        goToStep(1);
    }
    
    function closeTypeformModal() {
        typeformModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function updateTypeformProgress() {
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        typeformProgress.style.width = `${progressPercentage}%`;
    }
    
    function goToStep(step) {
        // Hide all steps
        typeformSteps.forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        // Show current step
        document.querySelector(`.typeform-step[data-step="${step}"]`).classList.add('active');
        
        // Update current step variable
        currentStep = step;
        
        // Update progress bar
        updateTypeformProgress();
        
        // Update buttons
        updateButtons();
    }
    
    function updateButtons() {
        // Back button visibility
        if (currentStep === 1) {
            typeformBack.style.display = 'none';
        } else {
            typeformBack.style.display = 'block';
        }
        
        // Next/Submit button
        if (currentStep === totalSteps - 1) {
            typeformNext.style.display = 'none';
            typeformSubmit.style.display = 'block';
        } else {
            typeformNext.style.display = 'block';
            typeformSubmit.style.display = 'none';
        }
    }
    
    function validateCurrentStep() {
        const currentStepElement = document.querySelector(`.typeform-step[data-step="${currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input, select, textarea');
        
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    // Event Listeners
    applyBtn.addEventListener('click', openTypeform);
    contactApplyBtn.addEventListener('click', openTypeform);
    
    closeTypeform.addEventListener('click', closeTypeformModal);
    
    // Close modal when clicking outside the form
    typeformModal.addEventListener('click', function(e) {
        if (e.target === typeformModal) {
            closeTypeformModal();
        }
    });
    
    typeformNext.addEventListener('click', function() {
        if (validateCurrentStep()) {
            goToStep(currentStep + 1);
        }
    });
    
    typeformBack.addEventListener('click', function() {
        goToStep(currentStep - 1);
    });
    
    // UPDATED: Submit handler with Formspree integration
    typeformSubmit.addEventListener('click', function() {
        if (validateCurrentStep()) {
            // Collect form data
            const name = document.querySelector('.typeform-step[data-step="1"] input').value;
            const email = document.querySelector('.typeform-step[data-step="2"] input').value;
            const website = document.querySelector('.typeform-step[data-step="3"] input').value;
            const revenue = document.querySelector('.typeform-step[data-step="4"] select').value;
            const budget = document.querySelector('.typeform-step[data-step="5"] select').value;
            const source = document.querySelector('.typeform-step[data-step="6"] select').value;
            const additionalInfo = document.querySelector('.typeform-step[data-step="7"] textarea').value;
            
            // Create form data object for submission
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('website', website);
            formData.append('revenue', revenue);
            formData.append('budget', budget);
            formData.append('source', source);
            formData.append('additionalInfo', additionalInfo);
            formData.append('_replyto', email); // This ensures replies go to the applicant
            formData.append('_subject', 'New Application from ' + name); // Custom email subject
            
            // Send to Formspree
            fetch('https://formspree.io/f/mdkedwzv', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Show success step
                goToStep(totalSteps);
                
                // Hide navigation buttons on success screen
                typeformBack.style.display = 'none';
                typeformSubmit.style.display = 'none';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again.');
            });
        }
    });
    
    // Handle input events
    document.querySelectorAll('.typeform-input, .typeform-select, .typeform-textarea').forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && currentStep < totalSteps - 1) {
                e.preventDefault();
                if (validateCurrentStep()) {
                    goToStep(currentStep + 1);
                }
            }
        });
    });
    
    // Custom cursor effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', function() {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('active');
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .stat, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize the form
    updateButtons();
});