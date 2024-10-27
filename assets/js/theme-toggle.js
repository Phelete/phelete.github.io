document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark", currentTheme === "dark");

  const themeToggleButton = document.getElementById("theme-toggle");
  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });
});
