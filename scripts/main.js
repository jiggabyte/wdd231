// Display the current year in the footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Display the last modified date
document.getElementById("lastModified").textContent = "Last Update: " + document.lastModified;

// Course list array
const courses = [
    { id: 1, name: 'CSE 110', title: 'Intro to Programming', credits: 3, completed: false },
    { id: 2, name: 'CSE 210', title: 'Programming with Classes', credits: 3, completed: true },
    { id: 3, name: 'WDD 130', title: 'Web Frontend Development', credits: 3, completed: false },
    { id: 4, name: 'WDD 230', title: 'Advanced Web Development', credits: 3, completed: true }
];

// Render course cards dynamically
function displayCourses(filter = '') {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';
    courses.forEach(course => {
        if (!filter || course.name.startsWith(filter)) {
            const courseDiv = document.createElement('div');
            courseDiv.textContent = `${course.name} - ${course.title}`;
            if (course.completed) {
                courseDiv.classList.add('completed');
            }
            courseList.appendChild(courseDiv);
        }
    });
}

document.getElementById('show-all').addEventListener('click', () => displayCourses());
document.getElementById('show-cse').addEventListener('click', () => displayCourses('CSE'));
document.getElementById('show-wdd').addEventListener('click', () => displayCourses('WDD'));

// Initial rendering of all courses
displayCourses();

// Toggle mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
