document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. Typewriter Effect (Enhanced)
    // ==========================================
    const phrases = ["AWS CI/CD", "Networking", "JAVA"];
    let i = 0, j = 0, currentPhrase = [], isDeleting = false;
    const typewriter = document.querySelector(".typewriter");

    function typeLoop() {
        typewriter.innerHTML = currentPhrase.join('');

        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]);
            j++;
        } else if (isDeleting && j > 0) {
            currentPhrase.pop();
            j--;
        }

        if (j === phrases[i].length) {
            isDeleting = true;
            setTimeout(typeLoop, 1500);
            return;
        }

        if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % phrases.length;
        }

        setTimeout(typeLoop, isDeleting ? 50 : 100);
    }

    if (typewriter) typeLoop();

    // ==========================================
    // 2. Cursor Blink Effect
    // ==========================================
    const cursor = document.querySelector(".cursor");
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
        }, 500);
    }

    // ==========================================
    // 3. View Resume Function
    // ==========================================
    window.viewResume = () => {
        window.open("resume.html", "_blank");
    };

    // ==========================================
    // 4. Navbar ScrollSpy & Active States
    // ==========================================
    const navbar = document.getElementById("navbar");
    if (navbar) {
        const navLinks = navbar.querySelectorAll(".nav-link");
        const sections = document.querySelectorAll("section[id]");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                    });
                }
            });
        }, { threshold: 0.3, rootMargin: "-100px 0px -20% 0px" });

        sections.forEach(section => observer.observe(section));

        // Multi-page active nav (for about/resume)
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        navLinks.forEach(link => {
            if (link.href.includes(currentPage.replace(".html", "")) || 
                (currentPage === "index.html" && link.getAttribute("href") === "#home")) {
                link.classList.add("active");
            }
        });
    }

    // ==========================================
    // 5. Reveal on Scroll
    // ==========================================
    const reveals = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 6. Tilt Card Effect (for profile card)
    // ==========================================
    const tiltCards = document.querySelectorAll(".tilt-card");
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
        });
    });

    // ==========================================
    // 7. Dynamic Year in Footer
    // ==========================================
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ==========================================
    // 8. Smooth Scrolling for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
});

