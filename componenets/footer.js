class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background: #000000;
                    color: #ffffff;
                    padding: 4rem 2rem;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                }
                
                .footer-logo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                    font-family: 'Clash Display', sans-serif;
                }
                
                .footer-about {
                    max-width: 300px;
                    color: #a0a0a0;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                
                .footer-links h3 {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    color: white;
                }
                
                .footer-links ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .footer-links li {
                    margin-bottom: 0.75rem;
                }
                
                .footer-links a {
                    color: #a0a0a0;
                    text-decoration: none;
                    transition: color 0.3s;
                }
                
                .footer-links a:hover {
                    color: #00b67f;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                
                
                .copyright {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 2rem;
                    margin-top: 3rem;
                    text-align: center;
                    color: #a0a0a0;
                    font-size: 0.875rem;
                }
                
                @media (max-width: 768px) {
                    .footer-container {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            <footer>
                <div class="footer-container">
                    <div class="footer-about">
                        <div class="footer-logo">
                            <div class="footer-logo-dot"></div>
                            Sewna
                        </div>
                        <p class="footer-about">
                            Sewna connects fashion lovers with top independent designers worldwide for custom creations.
</p>
                       
                    </div>
                    
                    <div class="footer-links">
                        <h3>For Clients</h3>
                        <ul>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">Browse Designers</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links">
                        <h3>For Designers</h3>
                        <ul>
                            <li><a href="#">Designer Benefits</a></li>
                            <li><a href="#">Apply to Join</a></li>
                            <li><a href="#">Designer Resources</a></li>
                            <li><a href="#">Community</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links">
                        <h3>Company</h3>
                        <ul>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="copyright">
                    <p>&copy; ${new Date().getFullYear()} Sewna. All rights reserved.</p>
                </div>
            </footer>
        `;
        
        // Replace feather icons
        setTimeout(() => {
            if (this.shadowRoot.querySelector('[data-feather]')) {
                feather.replace(this.shadowRoot);
            }
        }, 100);
    }
}

customElements.define('custom-footer', CustomFooter);
