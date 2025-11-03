class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    padding: 1.5rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 50;
                   
                    backdrop-filter: blur(2px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-family: 'Clash Display', sans-serif;
                }
                
               
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                }
                
                .nav-links a {
                    text-decoration: none;
                    color: #000000;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.3s;
                    position: relative;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #00b67f;
                    transition: width 0.3s;
                }
                
                .nav-links a:hover {
                    color: #00b67f;
                }
                
                .nav-links a:hover::after {
                    width: 100%;
                }
                
                .mobile-menu-button {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                
                .mobile-menu {
                    display: none;
                    position: fixed;
                    top: 5rem;
                    left: 0;
                    right: 0;
                    background: white;
                    padding: 1rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    z-index: 40;
                }
                
                .mobile-menu a {
                    display: block;
                    padding: 0.75rem 1rem;
                    text-decoration: none;
                    color: #000000;
                    transition: all 0.3s;
                }
                
                .mobile-menu a:hover {
                    color: #00b67f;
                    background: rgba(0, 182, 127, 0.05);
                }
                
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    
                    .mobile-menu-button {
                        display: block;
                    }
                }
            </style>
            <nav>
                <a  class="logo">
                    Sewna
                </a>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="about.html">About</a>
                    <a href="#">Designers</a>
                    <a href="contact.html">Contact</a>
                </div>
                <button class="mobile-menu-button" onclick="this.parentElement.toggleMobileMenu()">
                    <i data-feather="menu"></i>
                </button>
            </nav>
            
            <div class="mobile-menu hidden" id="mobile-menu">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="#">Designers</a>
                <a href="contact.html">Contact</a>
            </div>
        `;
        
        // Replace feather icons
        setTimeout(() => {
            if (this.shadowRoot.querySelector('[data-feather]')) {
                feather.replace(this.shadowRoot);
            }
        }, 100);
    }
    
    toggleMobileMenu() {
        const menu = this.shadowRoot.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    }
}

customElements.define('custom-navbar', CustomNavbar);
