const BASE_PATH = "/SEO";

const params = new URLSearchParams(window.location.search);

const urlTheme = params.get("theme");
const savedTheme = localStorage.getItem("theme");

const theme = urlTheme || savedTheme || "light";

document.documentElement.classList.remove("dark", "light");
document.documentElement.classList.add(theme);

localStorage.setItem("theme", theme);

function goHome() {
    const params = new URLSearchParams(window.location.search);

    const theme = params.get("theme") || localStorage.getItem("theme") || "light";
    const lang = params.get("lang") || localStorage.getItem("lang") || "ar";

    window.location.href = `${BASE_PATH}${lang}/?theme=${theme}`;
}
