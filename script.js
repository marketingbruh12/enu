document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const applyBtn = document.getElementById('applyBtn');
    const contactApplyBtn = document.getElementById('contactApplyBtn');
    
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
});
