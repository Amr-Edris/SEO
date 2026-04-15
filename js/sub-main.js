const BASE_PATH = "SEO/";

const params = new URLSearchParams(window.location.search);

const urlTheme = params.get("theme");
const savedTheme = localStorage.getItem("theme");

const theme = urlTheme || savedTheme || "light";

document.documentElement.classList.remove("dark", "light");
document.documentElement.classList.add(theme);

localStorage.setItem("theme", theme);

function isFlutterApp() {
    const params = new URLSearchParams(window.location.search);
    return params.get("source") === "flutter";
}

function goHome() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang") || localStorage.getItem("lang") || "ar";

    if (isFlutterApp() && window.FlutterChannel) {
        window.FlutterChannel.postMessage("back");
        return;
    }
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // fallback (direct visit case)
        window.location.href = `${BASE_PATH}/${lang}/?theme=${theme}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (isFlutterApp()) {
        const btn = document.querySelector(".back-btn");

        if (btn) {
            const params = new URLSearchParams(window.location.search);
      const isArabicPage = window.location.pathname.includes("/ar/");

            if (isArabicPage) {
                // Arabic → right-to-left, back arrow points right
                btn.textContent = "رجوع";
            } else {
                // English → left-to-right
                btn.textContent = "Back";
            }

            // Optional: add label instead of only arrow
            // btn.textContent = lang === "ar" ? "رجوع →" : "← Back";
        }
    }
});
