async function loadComponent(elementId, filePath) {
  const target = document.getElementById(elementId);

  if (!target) {
    console.error(`Missing element: #${elementId}`);
    return;
  }

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(
        `Failed to load ${filePath}. HTTP status: ${response.status}`
      );
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    target.innerHTML = `
      <p style="padding: 1rem; color: white;">
        Could not load ${filePath}
      </p>
    `;
  }
}

function initialiseDropdowns() {
  const dropdown = document.querySelector(".lore-dropdown");

  if (!dropdown) {
    console.warn("Lore dropdown was not found after loading the header.");
    return;
  }

  let hideTimeout;

  dropdown.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    dropdown.classList.add("show");
  });

  dropdown.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      dropdown.classList.remove("show");
    }, 150);
  });
}

async function initialiseLayout() {
  await loadComponent("site-header", "header.html");

  initialiseDropdowns();

  await loadComponent("site-footer", "footer.html");
}

document.addEventListener("DOMContentLoaded", initialiseLayout);