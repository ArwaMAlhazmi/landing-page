/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: in-view 0.6.1 - Get notified when a DOM element enters or exits the viewport. https://camwiegert.github.io/in-view
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Add class 'active' to section
function toggleActive(el){
	el.classList.toggle('your-active-class');
	document.querySelector(`#${el.id}`).classList.toggle('your-active-class');
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
//build page sections
function createSections(){
	//create a section element for each sevice in the sevices array 
	services.forEach( service => {
		const section = document.createElement('section');
		section.id = `${service.id}`;
		section.setAttribute("data-nav",`${service.title}`);
		section.innerHTML = `
		<div class="landing__container">
			<div class="img-col">
				<img src='${service.image}'>
			</div>
			<div class="text-col">
				<h2>${service.title}</h2>
	        	<p>${service.description}</p>
        	</div>
        </div>`;
        // append the created section to the DOM/ services_container Div
        const container = document.querySelector('#services_container');
        container.appendChild(section);
	});
};

// build the nav
function populateNav(sections){
	const navBarList = document.querySelector('#navbar__list');
	//For each section element create a list element and populate it with the section id 
	sections.forEach(section =>{
		const navElement = document.createElement('li');
		navElement.innerHTML = `<a id='${section.id}' href='#' class="menu__link"> ${section.dataset.nav} </a>`;
		navBarList.appendChild(navElement);
	});
};

// Make section active when near top of viewport
function monitorSection(sections){
	// handeled by inView
	//Set how much of the element should be inside the view
	inView.threshold(0.75)
	//Add class active on section entering the view and remove it on exiting the view
	sections.forEach(section => {
		inView(`#${section.id}`)
	    .on('enter', toggleActive)
	    .on('exit', toggleActive)
	});
};

// Scroll to anchor ID using scrollTO event
function smoothScroll(evt){
	const sections = document.querySelectorAll('section');
	evt.preventDefault();
	sections.forEach(section =>{
		if(section.id === evt.target.id){
			window.scrollTo({
				top: document.querySelector(`section#${evt.target.id}`).offsetTop,
				behavior: 'smooth'
			});
		};

	});
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.addEventListener('load', () => {
	// On Window load 
	//1. Create the services elements from the data.js file
	createSections();
	//2. Populate the navbar 
	const sections = document.querySelectorAll('section');
	populateNav(sections);
	//3. Watch in view section
	monitorSection(sections);
	
});

// Scroll to section on nav click
document.querySelector('nav').addEventListener('click', smoothScroll);