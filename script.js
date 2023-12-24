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
