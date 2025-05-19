import React from "react"
function Footer()
{
    return(
        
<footer className="footer">
    <div className="footer-sections">
       
        <div className="section">
            <h4>About Us</h4>
            <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </div>

        
       

       
        <div className="section">
            <h4>Help</h4>
            <ul>
                <li><a href="#">Customer Support</a></li>
                <li><a href="#">Shipping Info</a></li>
                <li><a href="#">Return Policy</a></li>
                <li><a href="#">FAQs</a></li>
            </ul>
        </div>

        
        <div className="section">
            <h4>Follow Us</h4>
            <div className="social-icons">
                <a href="#" aria-label="Facebook">&#x1F4F7;</a>
                <a href="#" aria-label="Twitter">&#x1F426;</a>
                <a href="#" aria-label="Instagram">&#x1F33C;</a>
                <a href="#" aria-label="LinkedIn">&#x1F465;</a>
            </div>
        </div>

       
        <div className="section newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for latest updates and offers:</p>
            <input type="email" placeholder="Enter your email"/>
            <button>Subscribe</button>
        </div>
    </div>

    <div className="copyright">
        &copy; 2024 Second-Hand Book Bazaar. All rights reserved.
    </div>
</footer>

    )
}

export default Footer