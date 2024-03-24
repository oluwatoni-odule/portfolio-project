// SMOOTH SCROLLING
document.addEventListener("DOMContentLoaded", event=> {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      anchorLinks.forEach(link => {
        link.classList.remove("active-menu");
      });

      this.classList.add("active-menu");

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    })
  })
})

const contactBtn = document.querySelector('.contact-btn');

contactBtn.addEventListener('click', event => {
  const contactSection = document.querySelector('.contact');

  contactSection.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
})

// MENU OPEN & CLOSE 
const hamburger = document.querySelector('.hamburger');
const menuCard = document.querySelector('.menu-card .menu-content');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('.menu-card header svg');

hamburger.addEventListener('click', event=> {
  menuCard.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.querySelector('#menu-card').style.width = '60vw';
})

overlay.addEventListener('click', event => {
  menuCard.classList.add('hidden');
  overlay.classList.add('hidden');
  document.querySelector('#menu-card').style.width = '0';
});

closeIcon.addEventListener('click', event => {
  menuCard.classList.add('hidden');
  overlay.classList.add('hidden');
  document.querySelector('#menu-card').style.width = '0';
})


// CHANGE THEME
const themeIcon = document.querySelector('.icon-container');

themeIcon.addEventListener('click', event=> {
  const navbar = document.querySelector('.navbar');

  if (navbar.classList.contains('bg-black-opacity')) {
    navbar.classList.remove('bg-black-opacity');
    navbar.classList.add('bg-white');
    const logo = navbar.querySelector('.logo svg text');
    console.log(logo);
    const links = navbar.querySelectorAll('a');

    logo.setAttribute('fill', 'black');
    links.forEach(link => {
      link.style.color = 'black';
    })

    const body = document.querySelector('main');
    const svgs = body.querySelectorAll('svg');
    const sassIcon = body.querySelector('#sass path');
    const contactInputs = body.querySelectorAll('.contact input, .contact textarea');
    const hamburgerSvg = document.querySelector('.hamburger svg');
  

    body.classList.remove('bg-black');
    body.classList.add('bg-white');
    const whiteTexts = body.querySelectorAll('.white');

    whiteTexts.forEach(text => {
      text.classList.remove('white');
      text.classList.add('black');
    });

    svgs.forEach(svg => {
      svg.classList.remove('dark-theme-svg');
      svg.classList.add('light-theme-svg');
    })
    sassIcon.setAttribute('fill', 'black');

    contactInputs.forEach(input => {
      input.style.border = '1px black solid';
    })

    hamburgerSvg.setAttribute('fill', 'black');
  } else {
    navbar.classList.remove('bg-white');
    navbar.classList.add('bg-black-opacity');
    const logo = navbar.querySelector('.logo svg text');
    console.log(logo);
    const links = navbar.querySelectorAll('a');

    logo.setAttribute('fill', 'white');
    links.forEach(link => {
      link.style.color = 'white';
    })

    const body = document.querySelector('main');
    const svgs = body.querySelectorAll('svg');
    const sassIcon = body.querySelector('#sass path');
    const contactInputs = body.querySelectorAll('.contact input, .contact textarea');
    const hamburgerSvg = document.querySelector('.hamburger svg');
  

    body.classList.remove('bg-white');
    body.classList.add('bg-black');
    const whiteTexts = body.querySelectorAll('.black');

    whiteTexts.forEach(text => {
      text.classList.remove('black');
      text.classList.add('white');
    });

    svgs.forEach(svg => {
      svg.classList.remove('light-theme-svg');
      svg.classList.add('dark-theme-svg');
    })
    sassIcon.setAttribute('fill', 'white');

    contactInputs.forEach(input => {
      input.style.border = 'none';
    })

    hamburgerSvg.setAttribute('fill', 'white');
  }
})

//DRAK THEME BACKGROUND
particlesJS('particles-js', {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#ffffff', // Set the color of the particles (white)
    },
    shape: {
      type: 'circle', // Shape of the particles (circle)
    },
    opacity: {
      value: 0.6,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff', // Set the color of the lines connecting the particles (white)
      opacity: 0.4,
      width: 1,
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
    },
  },
});

//ANIMATED TEXT
document.addEventListener('DOMContentLoaded', function() {
  const messages = ['Frontend Web Developer', 'Puzzle Enthusiast', 'Serene Maestro'];
  let currentIndex = 0;

  function typeMessage(message, index, callback) {
    if (index < message.length) {
      
      document.getElementById('message-area').textContent += message.charAt(index);

      setTimeout(function() {
        typeMessage(message, index + 1, callback);
      }, 100);
    } else {
      
      callback();
    }
  }

  function animateMessage() {
    const currentMessage = messages[currentIndex];
    const prevMessage = messages[(currentIndex + messages.length - 1) % messages.length];

    anime({
      targets: '#message-area',
      opacity: 1,
      duration: 1000,
      easing: 'easeInOutQuad',
      complete: function() {
       
        document.getElementById('message-area').textContent = '';

        
        typeMessage(currentMessage, 0, function() {
         
          currentIndex = (currentIndex + 1) % messages.length;

          setTimeout(animateMessage, 2000);
        });
      }
    });
  }

  animateMessage();
});


// SCROLL REVEAL ANIMATION
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  reset: true
});

sr.reveal(`.home__title, .popular__container, .subscribe__container, .footer__container`);
sr.reveal(`.home__description, .footer__info`, {delay: 500});
sr.reveal(`.home__search`, {delay: 600});
sr.reveal(`.home__images`, {delay: 800, origin: 'bottom'});
sr.reveal(`.logos__img`, {interval: 100});
sr.reveal(`.value__images, .contact__content`, {origin: 'left'});
sr.reveal(`.value__content, .contact__images`, {origin: 'right'});