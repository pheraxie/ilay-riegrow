// Gestion des boutons de sauvegarde
document.querySelectorAll('.save-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Image/Vidéo sauvegardée!');
        // Logique optionnelle pour gérer les sauvegardes
    });
});

// Gestion du changement de thème
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIconSun = document.getElementById("theme-icon-sun");
    const themeIconMoon = document.getElementById("theme-icon-moon");

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        const isDarkTheme = document.body.classList.contains("dark-theme");
        themeIconSun.classList.toggle("hidden", isDarkTheme);
        themeIconMoon.classList.toggle("hidden", !isDarkTheme);

        localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeIconSun.classList.add("hidden");
        themeIconMoon.classList.remove("hidden");
    }
});

// Gestion du diaporama
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    function changeSlide(step) {
        currentIndex = (currentIndex + step + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function currentSlide(index) {
        currentIndex = index - 1;
        showSlide(currentIndex);
    }

    setInterval(() => {
        changeSlide(1);
    }, 5000);

    window.changeSlide = changeSlide;
    window.currentSlide = currentSlide;

    showSlide(currentIndex);
});

// Gestion des liens de navigation actifs
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname.split("/").pop().toLowerCase();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop().toLowerCase();
        if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
            link.classList.add("active");
        }
    });
});

// Gestion des icônes de sauvegarde
document.querySelectorAll('.save-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        icon.classList.toggle('saved');
    });
});

// Mélange des conteneurs et disposition maçonnerie
document.addEventListener("DOMContentLoaded", () => {
    const shuffleItems = (containerSelector) => {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const items = Array.from(container.children);

        const shuffledItems = items.sort(() => Math.random() - 0.5);
        shuffledItems.forEach(item => container.appendChild(item));
    };

    const masonryLayout = (containerSelector, itemSelector) => {
        const container = document.querySelector(containerSelector);
        const items = Array.from(document.querySelectorAll(itemSelector));

        const getColumnCount = () => {
            const containerWidth = container.clientWidth;
            if (containerWidth > 1200) return 7;
            if (containerWidth < 768) return 2;
            return 3;
        };

        const layout = () => {
            const columnCount = getColumnCount();
            const columnHeights = new Array(columnCount).fill(0);
            const columnWidth = container.clientWidth / columnCount;

            items.forEach(item => {
                const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
                const top = columnHeights[shortestColumnIndex];
                const left = shortestColumnIndex * columnWidth;

                item.style.position = 'absolute';
                item.style.top = `${top}px`;
                item.style.left = `${left}px`;
                item.style.width = `${columnWidth - 10}px`;

                columnHeights[shortestColumnIndex] += item.offsetHeight + 10;
            });

            container.style.position = 'relative';
            container.style.height = `${Math.max(...columnHeights)}px`;
        };

        layout();
        window.addEventListener('resize', layout);
    };

    const initializeShuffleIcon = () => {
        const shuffleIcon = document.getElementById('shuffle-icon');
        if (shuffleIcon) {
            shuffleIcon.replaceWith(shuffleIcon.cloneNode(true));
            const newShuffleIcon = document.getElementById('shuffle-icon');
            newShuffleIcon.addEventListener('click', () => {
                shuffleItems('#gallery-container');
                masonryLayout('#gallery-container', '.gallery-item');
            });
        }
    };

    shuffleItems('#gallery-container'); // Mélange dès le chargement
    masonryLayout('#gallery-container', '.gallery-item');
    initializeShuffleIcon();
});

// Téléchargement de fichiers
async function downloadFile(url, filename) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Erreur lors du téléchargement :', error);
        alert('Téléchargement échoué. Veuillez réessayer.');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const overlay = document.getElementById("myNav");
    const closeBtn = document.querySelector(".closebtn");

    // Ouvrir l'overlay
    menuToggle.addEventListener("click", () => {
        overlay.classList.add("open");
    });

    // Fermer l'overlay
    closeBtn.addEventListener("click", () => {
        overlay.classList.remove("open");
    });

    // Optionnel : Fermer en cliquant en dehors du menu
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.classList.remove("open");
        }
    });
});
