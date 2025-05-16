
        // Mobile Navigation Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });

        // Add Animation on Scroll
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.learn-item, .feature-item, .testimonial-card').forEach(item => {
            observer.observe(item);
        });

        // Countdown Timer for Limited Offer
        function startCountdown() {
            const countdownDate = new Date();
            countdownDate.setDate(countdownDate.getDate() + 3); // 3 days from now
            
            const timerElement = document.createElement('div');
            timerElement.className = 'countdown-timer';
            timerElement.style.margin = '20px 0';
            timerElement.style.fontWeight = 'bold';
            timerElement.style.fontSize = '1.1rem';
            
            const pricingBox = document.querySelector('.pricing-box');
            pricingBox.insertBefore(timerElement, pricingBox.querySelector('.btn'));
            
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = countdownDate - now;
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                timerElement.innerHTML = `Offer Ends In: ${days}d ${hours}h ${minutes}m ${seconds}s`;
                
                if (distance < 0) {
                    clearInterval(interval);
                    timerElement.innerHTML = "Offer Expired";
                }
            }, 1000);
        }
        
        startCountdown();

        // Form Validation
        const enrollButtons = document.querySelectorAll('.btn');
        
        enrollButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.textContent.includes('ENROLL') || this.textContent.includes('JOIN')) {
                    e.preventDefault();
                    
                    // Create a modal for enrollment
                    const modal = document.createElement('div');
                    modal.style.position = 'fixed';
                    modal.style.top = '0';
                    modal.style.left = '0';
                    modal.style.width = '100%';
                    modal.style.height = '100%';
                    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
                    modal.style.display = 'flex';
                    modal.style.justifyContent = 'center';
                    modal.style.alignItems = 'center';
                    modal.style.zIndex = '2000';
                    
                    const modalContent = document.createElement('div');
                    modalContent.style.backgroundColor = 'white';
                    modalContent.style.padding = '30px';
                    modalContent.style.borderRadius = '10px';
                    modalContent.style.maxWidth = '500px';
                    modalContent.style.width = '90%';
                    
                    modalContent.innerHTML = `
                        <h2 style="color: #0d2b5c; margin-bottom: 20px;">Enroll Now</h2>
                        <form id="enrollForm">
                            <div style="margin-bottom: 15px;">
                                <label for="name" style="display: block; margin-bottom: 5px;">Full Name</label>
                                <input type="text" id="name" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="email" style="display: block; margin-bottom: 5px;">Email Address</label>
                                <input type="email" id="email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="phone" style="display: block; margin-bottom: 5px;">Phone Number</label>
                                <input type="tel" id="phone" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                            </div>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 10px;">Your Experience Level</label>
                                <label style="margin-right: 10px;">
                                    <input type="radio" name="experience" value="beginner"> Beginner
                                </label>
                                <label style="margin-right: 10px;">
                                    <input type="radio" name="experience" value="intermediate"> Intermediate
                                </label>
                                <label>
                                    <input type="radio" name="experience" value="advanced"> Advanced
                                </label>
                            </div>
                            <button type="submit" style="width: 100%; padding: 12px; background-color: #ff7b00; color: white; border: none; border-radius: 30px; font-weight: bold; cursor: pointer;">Complete Enrollment</button>
                            <p style="text-align: center; margin-top: 15px; font-size: 0.9rem; color: #666;">By enrolling, you agree to our Terms & Conditions</p>
                        </form>
                    `;
                    
                    modal.appendChild(modalContent);
                    document.body.appendChild(modal);
                    
                    // Close modal when clicking outside
                    modal.addEventListener('click', function(e) {
                        if (e.target === modal) {
                            document.body.removeChild(modal);
                        }
                    });
                    
                    // Handle form submission
                    const enrollForm = document.getElementById('enrollForm');
                    enrollForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const phone = document.getElementById('phone').value;
                        
                        if (!name || !email || !phone) {
                            alert('Please fill all required fields');
                            return;
                        }
                        
                        // Here you would typically send the data to a server
                        // For now, we'll just show a success message
                        modalContent.innerHTML = `
                            <h2 style="color: #0d2b5c; margin-bottom: 20px;">Enrollment Successful!</h2>
                            <p style="margin-bottom: 20px;">Thank you, ${name}! Your enrollment in the 7-Day Digital Marketing Crash Course is confirmed.</p>
                            <p style="margin-bottom: 20px;">We've sent the course details to your email: ${email}</p>
                            <p style="margin-bottom: 30px;">Our team will contact you soon on your phone: ${phone}</p>
                            <button id="closeModal" style="width: 100%; padding: 12px; background-color: #ff7b00; color: white; border: none; border-radius: 30px; font-weight: bold; cursor: pointer;">Close</button>
                        `;
                        
                        document.getElementById('closeModal').addEventListener('click', function() {
                            document.body.removeChild(modal);
                        });
                    });
                }
            });
        });

        // Add Some Animation Styles
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .learn-item, .feature-item, .testimonial-card {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }
                
                .learn-item.animate, .feature-item.animate, .testimonial-card.animate {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                /* Staggered animation for items */
                .learn-item:nth-child(1), .feature-item:nth-child(1), .testimonial-card:nth-child(1) {
                    transition-delay: 0.1s;
                }
                
                .learn-item:nth-child(2), .feature-item:nth-child(2), .testimonial-card:nth-child(2) {
                    transition-delay: 0.2s;
                }
                
                .learn-item:nth-child(3), .feature-item:nth-child(3) {
                    transition-delay: 0.3s;
                }
                
                .learn-item:nth-child(4), .feature-item:nth-child(4) {
                    transition-delay: 0.4s;
                }
                
                .learn-item:nth-child(5), .feature-item:nth-child(5) {
                    transition-delay: 0.5s;
                }
                
                .learn-item:nth-child(6), .feature-item:nth-child(6) {
                    transition-delay: 0.6s;
                }
                
                /* Pulse animation for CTA buttons */
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        box-shadow: 0 5px 15px rgba(255, 123, 0, 0.3);
                    }
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 5px 20px rgba(255, 123, 0, 0.5);
                    }
                    100% {
                        transform: scale(1);
                        box-shadow: 0 5px 15px rgba(255, 123, 0, 0.3);
                    }
                }
                
                .pricing-section .btn {
                    animation: pulse 2s infinite;
                }
                
                /* Who Can Join Section */
                .who-can-join {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    margin-top: 40px;
                }
                
                .who-item {
                    text-align: center;
                    margin: 0 15px 30px;
                    min-width: 150px;
                }
                
                .who-icon {
                    background-color: #e6eeff;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 15px;
                }
                
                .who-icon i {
                    font-size: 1.8rem;
                    color: #0d2b5c;
                }
                
                .who-text {
                    font-weight: 500;
                }
                
                /* FAQ Section */
                .faq-item {
                    margin-bottom: 15px;
                    border-radius: 8px;
                    overflow: hidden;
                    background-color: white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }
                
                .faq-question {
                    padding: 15px 20px;
                    background-color: #f1f7ff;
                    font-weight: 500;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .faq-question::after {
                    content: '+';
                    font-size: 1.5rem;
                }
                
                .faq-item.active .faq-question::after {
                    content: '-';
                }
                
                .faq-answer {
                    padding: 0;
                    max-height: 0;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                .faq-item.active .faq-answer {
                    padding: 15px 20px;
                    max-height: 1000px;
                }
            </style>
        `);

        // Add Who Can Join Section after features
        const featuresSection = document.querySelector('.features-section');
        const whoCanJoinSection = document.createElement('section');
        whoCanJoinSection.className = 'learn-section';
        whoCanJoinSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">Who Can Join?</h2>
                <div class="who-can-join">
                    <div class="who-item">
                        <div class="who-icon">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <div class="who-text">Freshers</div>
                    </div>
                    <div class="who-item">
                        <div class="who-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="who-text">Working Professionals</div>
                    </div>
                    <div class="who-item">
                        <div class="who-icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="who-text">Students</div>
                    </div>
                    <div class="who-item">
                        <div class="who-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="who-text">Business Owners</div>
                    </div>
                    <div class="who-item">
                        <div class="who-icon">
                            <i class="fas fa-laptop-house"></i>
                        </div>
                        <div class="who-text">Freelancers</div>
                    </div>
                </div>
            </div>
        `;
        featuresSection.parentNode.insertBefore(whoCanJoinSection, featuresSection.nextSibling);

        // Add FAQ Section before testimonials
        const testimonialsSection = document.querySelector('.testimonials-section');
        const faqSection = document.createElement('section');
        faqSection.className = 'features-section';
        faqSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">Frequently Asked Questions</h2>
                <div class="faq-container">
                    <div class="faq-item">
                        <div class="faq-question">Do I need any prior experience in digital marketing?</div>
                        <div class="faq-answer">
                            <p>No prior experience is needed. Our course is designed for absolute beginners. We start with the fundamentals and progressively move to advanced concepts.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">How does the job/freelance guarantee work?</div>
                        <div class="faq-answer">
                            <p>After completing the course, we provide placement assistance through our industry connections. For freelancing, we help you set up profiles on top platforms and guide you to get your first client. If you don't get results within 45 days, we refund your course fee.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">What's the time commitment each day?</div>
                        <div class="faq-answer">
                            <p>You'll need approximately 2-3 hours per day. Live sessions are typically 1 hour, followed by practical assignments that take 1-2 hours to complete.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">Can I access the content after the 7 days?</div>
                        <div class="faq-answer">
                            <p>Yes, you get lifetime access to all course materials, including future updates. You can revisit any topic whenever you need to refresh your knowledge.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">Will I get a certificate after completion?</div>
                        <div class="faq-answer">
                            <p>Yes, upon successful completion of the course and assignments, you'll receive an industry-recognized certificate from Digital Digitizers that you can showcase on your resume and LinkedIn profile.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        testimonialsSection.parentNode.insertBefore(faqSection, testimonialsSection);

        // FAQ Toggle Functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentNode;
                faqItem.classList.toggle('active');
            });
        });
   