/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Build the navigation menu dynamically based on the sections
 */
const buildNav = () => {
    const fragment = document.createDocumentFragment();

    sections.forEach(section => {
        const sectionID = section.getAttribute("id");
        const sectionDataNav = section.getAttribute("data-nav");

        // Create li and a elements
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.classList.add("menu__link");
        link.href = `#${sectionID}`;
        link.textContent = sectionDataNav;

        // Append to list item and fragment
        listItem.appendChild(link);
        fragment.appendChild(listItem);
    });

    // Append all list items to the nav list in one go for better performance
    navList.appendChild(fragment);
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * Add active class to the section in the viewport
 */
const setActiveSection = () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const link = document.querySelector(`a[href="#${section.id}"]`);

        if (rect.top >= -150 && rect.top <= 150) {
            section.classList.add("your-active-class");
            link.classList.add("active"); // Add active class to nav link
        } else {
            section.classList.remove("your-active-class");
            link.classList.remove("active"); // Remove active class from nav link
        }
    });
};

/**
 * Smooth scroll to section on navigation link click
 */
const scrollToSection = event => {
    if (event.target.nodeName === "A") {
        event.preventDefault();
        const targetSection = document.querySelector(event.target.getAttribute("href"));
        targetSection.scrollIntoView({ behavior: "smooth" });
    }
};


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build navigation menu when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", buildNav);

// Set the active section when scrolling
document.addEventListener("scroll", setActiveSection);

// Scroll to section on navigation link click
navList.addEventListener("click", scrollToSection);
