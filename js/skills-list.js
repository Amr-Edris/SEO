const skills = [
  "Flutter",
  "Dart",
  "Android Development",
  "iOS Development",
  "Web Development",
  "Firebase",
  "REST API",
  "Riverpod",
  "Django",
  "MySQL",
  "HTML",
  "CSS",
  "JavaScript",
  "Tailwind CSS",
  "React",
  "TypeScript",
  "Python",
  "C++",
  "Problem Solving",
  "Git",
  "GitHub",
  "GitLab",
  "SEO",
  "Networking",
  "Project Management",
  "Windows Apps"
];
document.getElementById("skillsList").innerHTML =
skills.map(skill =>
 `<div class="skill-chip">${skill}</div>`
).join("");