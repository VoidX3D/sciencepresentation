// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const footerLinks = document.querySelectorAll('.footer-link');
const copyButtons = document.querySelectorAll('.copy-link');
const generateQRBtn = document.querySelector('.generate-qr');
const notification = document.getElementById('notification');

// Page Navigation
function navigateToPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(`${pageId}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Initialize navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        navigateToPage(pageId);
        
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Footer navigation
footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        navigateToPage(pageId);
        
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Copy link to clipboard
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const link = button.getAttribute('data-link');
        
        // Use modern clipboard API
        navigator.clipboard.writeText(link).then(() => {
            // Show notification
            notification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
            
            // Change button text temporarily
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled = false;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = link;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            } catch (err) {
                alert('Failed to copy link. Please copy manually.');
            }
            
            document.body.removeChild(textArea);
        });
    });
});

// Generate QR Code (placeholder functionality)
generateQRBtn?.addEventListener('click', () => {
    const qrPlaceholder = document.querySelector('.qr-placeholder');
    const originalContent = qrPlaceholder.innerHTML;
    
    // Show loading state
    qrPlaceholder.innerHTML = '<i class="fas fa-spinner fa-spin"></i><p>Generating QR...</p>';
    qrPlaceholder.style.border = '2px solid #3b82f6';
    
    // Simulate QR generation
    setTimeout(() => {
        // In a real implementation, this would generate an actual QR code
        // For now, we'll show a mock QR code
        qrPlaceholder.innerHTML = `
            <div style="width: 100px; height: 100px; background: repeating-linear-gradient(0deg, #000, #000 2px, #fff 2px, #fff 4px), 
                        repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px); 
                        background-blend-mode: multiply; margin-bottom: 10px;">
            </div>
            <p>Scan for Presentation</p>
        `;
        qrPlaceholder.style.border = '2px solid #10b981';
        
        // Change button text
        generateQRBtn.innerHTML = '<i class="fas fa-check"></i> QR Generated';
        generateQRBtn.disabled = true;
        
        // Revert after 5 seconds
        setTimeout(() => {
            qrPlaceholder.innerHTML = originalContent;
            qrPlaceholder.style.border = '2px dashed #cbd5e1';
            generateQRBtn.innerHTML = '<i class="fas fa-qrcode"></i> Generate QR';
            generateQRBtn.disabled = false;
        }, 5000);
    }, 1500);
});

// Highlight current schedule item
function highlightCurrentScheduleItem() {
    const scheduleItems = document.querySelectorAll('.schedule-item');
    const now = new Date();
    const currentHour = now.getHours();
    
    // Simple logic to highlight "Presentation" during typical business hours
    // In a real app, you'd use actual presentation timing
    scheduleItems.forEach(item => {
        item.classList.remove('current');
    });
    
    // Mark "Presentation" as current during 9AM-5PM
    if (currentHour >= 9 && currentHour < 17) {
        scheduleItems[1]?.classList.add('current');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start on home page
    navigateToPage('home');
    
    // Highlight current schedule item
    highlightCurrentScheduleItem();
    
    // Update schedule highlight every minute
    setInterval(highlightCurrentScheduleItem, 60000);
    
    // Add click animation to feature cards
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('click', () => {
            feature.style.transform = 'scale(0.98)';
            setTimeout(() => {
                feature.style.transform = '';
            }, 200);
        });
    });
    
    // Add hover effect to detail cards
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
            card.style.transform = '';
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt+1 for Home
    if (e.altKey && e.key === '1') {
        e.preventDefault();
        navigateToPage('home');
    }
    
    // Alt+2 for Links
    if (e.altKey && e.key === '2') {
        e.preventDefault();
        navigateToPage('links');
    }
    
    // Alt+3 for Details
    if (e.altKey && e.key === '3') {
        e.preventDefault();
        navigateToPage('details');
    }
    
    // Escape to close notification
    if (e.key === 'Escape') {
        notification.classList.remove('show');
    }
});
