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

hamburger.addEventListener('click', event=> {
  
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
  }
})

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


//RECAPTCHA
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve your HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submissions
app.post('/submit', async (req, res) => {
  const { recaptcha, /* other form fields */ } = req.body;

  // Verify reCAPTCHA
  const recaptchaSecretKey = 'YOUR_RECAPTCHA_SECRET_KEY'; // Replace with your Secret Key
  const recaptchaVerificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptcha}`;

  try {
    const response = await axios.post(recaptchaVerificationURL);
    const { success } = response.data;

    if (success) {
      // reCAPTCHA verification passed
      // Process other form data
      res.send('Form submitted successfully!');
    } else {
      // reCAPTCHA verification failed
      res.status(400).send('reCAPTCHA verification failed.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


//CONTACT FORM
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve your HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submissions
app.post('/submit', async (req, res) => {
  const { email, message } = req.body;

  // Verify reCAPTCHA (if you have reCAPTCHA implemented)

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'odulenulerm6@gmail.com', // Replace with your Gmail address
      pass: 'oluwatoni16' // Replace with your Gmail password or generate an app password
    }
  });

  // Define email options
  const mailOptions = {
    from: email, // Set the 'from' field dynamically based on user input
    to: 'odulenulerm6@gmail.com', // Replace with your recipient email address
    subject: 'New Message from Contact Form',
    text: `Email: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send('Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Success');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
