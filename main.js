document.addEventListener("DOMContentLoaded", function() {
    const progressBars = document.querySelectorAll('.progress-bar');

    if (progressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width');
                    if (targetWidth) {
                        bar.style.width = targetWidth;
                        bar.style.transition = 'width 1.5s ease-in-out';
                       
                        observer.unobserve(bar);
                    }
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    }

    const contactForm = document.getElementById('contactForm');

  
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get user input
            const nameInput = document.getElementById('inputName');
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            // 1. Change button to "Loading" state
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // 2. Simulate a delay (like sending to a server)
            setTimeout(() => {
                // Success Action
                alert(`Thanks ${nameInput.value}! Your message has been sent successfully.`);
                
                // Change button to Success state
                btn.innerText = 'Message Sent!';
                btn.classList.replace('btn-primary', 'btn-success');
                
                // Clear the form
                contactForm.reset();

                // 3. Reset button back to normal after 3 seconds
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.classList.replace('btn-success', 'btn-primary');
                }, 3000);

            }, 1500); // 1.5 second delay
        });
    }
});