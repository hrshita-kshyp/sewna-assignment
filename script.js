// Global functions for the application
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
});

// Form handling for design requests
function submitDesignRequest(formData) {
    console.log('Design request submitted:', formData);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1500);
    });
}
// Form handling for designer applications
function submitDesignerApplication(formData) {
    console.log('Designer application submitted:', formData);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1500);
    });
}

// Search functionality
function handleSearch(query) {
    // Implement search functionality
    console.log('Searching for:', query);
    // Would typically make an API call here
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ results: [] });
        }, 1000);
    });
}

// Initialize search
document.addEventListener('DOMContentLoaded', function() {
    const searchElements = document.querySelectorAll('custom-search');
    searchElements.forEach(search => {
        search.shadowRoot.querySelector('.search-button').addEventListener('click', () => {
            const query = search.shadowRoot.querySelector('.search-input').value;
            handleSearch(query);
        });
        
        search.shadowRoot.querySelector('.search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = search.shadowRoot.querySelector('.search-input').value;
                handleSearch(query);
            }
        });
    });
});