document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // --- Back to Top Button ---
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        btn.addEventListener('click', () => {
            // Close others
            faqItems.forEach(otherItem => {
                if(otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // --- Copy IP Functionality ---
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-clipboard');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const icon = btn.querySelector('i');
                icon.classList.replace('fa-copy', 'fa-check');
                btn.style.color = '#2ecc71';
                setTimeout(() => {
                    icon.classList.replace('fa-check', 'fa-copy');
                    btn.style.color = '#fff';
                }, 2000);
            });
        });
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / 200;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Check if element is in viewport
            const rect = counter.getBoundingClientRect();
            if(rect.top < window.innerHeight && counter.innerText == '0') {
                updateCount();
            }
        });
    };
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check

    // --- Countdown Timer ---
    const countDownDate = new Date();
    // Set to next Sunday
    countDownDate.setDate(countDownDate.getDate() + (7 - countDownDate.getDay()) % 7);
    countDownDate.setHours(20, 0, 0, 0); // 8 PM
    
    // If it's already past 8 PM on Sunday, set to next Sunday
    if (new Date().getTime() > countDownDate.getTime()) {
        countDownDate.setDate(countDownDate.getDate() + 7);
    }

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("mins").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("secs").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("event-countdown").innerHTML = "<h3>EVENT STARTED</h3>";
        }
    }, 1000);

    // --- Minecraft Server Status API ---
    // Using a public API for demo purposes. 
    // In production, use the actual server IP.
    const SERVER_IP = 'play.hypixel.net'; // Example IP, replace with 'play.pgcmc.fun'
    
    fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`)
        .then(response => response.json())
        .then(data => {
            const stateEl = document.getElementById('server-state');
            const pulseDot = document.querySelector('.pulse-dot');
            const countEl = document.getElementById('player-count');
            const maxEl = document.getElementById('max-players');
            
            if (data.online) {
                stateEl.innerText = 'Online';
                stateEl.style.color = '#2ecc71';
                pulseDot.classList.add('green');
                pulseDot.classList.remove('red');
                countEl.innerText = data.players.online;
                maxEl.innerText = data.players.max;
            } else {
                stateEl.innerText = 'Offline';
                stateEl.style.color = '#e74c3c';
                pulseDot.classList.add('red');
                pulseDot.classList.remove('green');
            }
        })
        .catch(err => {
            document.getElementById('server-state').innerText = 'Status Unavailable';
        });

    // --- Particles Initialization ---
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            preset: "stars",
            background: {
                color: { value: "transparent" }
            },
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: ["#ffffff", "#00e1ff", "#0070f3"] },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
});
