document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open', menu.classList.contains('active'));
        hamburger.classList.toggle('open', menu.classList.contains('active'));
    });

    const navLinks = document.querySelectorAll('.menu li a');
    const sections = {
        home: document.getElementById('home'),
        about: document.getElementById('about'),
        contacts: document.getElementById('contacts')
    };
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            Object.keys(sections).forEach(key => {
                if (link.textContent.trim().includes('Головна') && key === 'home')
                    sections[key].style.display = '';
                else if (link.textContent.trim().includes('Про нас') && key === 'about')
                    sections[key].style.display = '';
                else if (link.textContent.trim().includes('Контакти') && key === 'contacts')
                    sections[key].style.display = '';
                else
                    sections[key].style.display = 'none';
            });

            if (window.innerWidth < 768) {
                menu.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.classList.remove('open');
            }
        });
    });
    navLinks[0].classList.add('active');

    const carousel = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentSlide = 0;
    const slideCount = slides.length;

    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }, 5000);

    menu.addEventListener('mouseleave', () => {
        if (window.innerWidth < 768 && menu.classList.contains('active')) {
            menu.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.classList.remove('open');
        }
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && menu.classList.contains('active')) {
            const isMenu = menu.contains(e.target);
            const isHamburger = hamburger.contains(e.target);
            if (!isMenu && !isHamburger) {
                menu.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.classList.remove('open');
            }
        }
    });
}); 
