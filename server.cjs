const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/send-ebook', async (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Prof Academy <info@prof.tedmarkdigital.com>', 
      to: email,
      subject: 'Welcome to Prof Academy! Your E-business Journey Starts Here',
      html: `
        <div style="font-family: 'Inter', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #FF8C00; padding: 40px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Prof Academy</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #FF8C00;">Hi ${name || 'Future Expert'},</h2>
            <p style="font-size: 16px;">Congratulations on taking the first step towards mastering the digital economy! Your purchase of <b>"E-Business for Bluecrest Students"</b> by Prof Tidjani has been confirmed.</p>
            
            <p style="font-size: 16px;">You can now download your ebook and start learning immediately by clicking the button below:</p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://docs.google.com/presentation/d/1E2it3mhYeAbWnuE4tjbpeRZS5zIT9NAY/edit?usp=sharing&ouid=109105146863875197838&rtpof=true&sd=true" 
                 style="background-color: #FF8C00; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; display: inline-block;">
                Download My Ebook
              </a>
            </div>

            <p style="font-size: 14px; color: #666;">If the button above doesn't work, copy and paste this link into your browser: <br/> 
            https://docs.google.com/presentation/d/1E2it3mhYeAbWnuE4tjbpeRZS5zIT9NAY/edit?usp=sharing</p>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0;" />

            <div style="background-color: #FFF5E6; padding: 20px; border-radius: 8px;">
              <h3 style="color: #FF8C00; margin-top: 0;">🚀 Ready for more?</h3>
              <p style="margin-bottom: 20px;">Ready to go from beginner to pro? Enroll in our <b>3-month Professional Course</b> at Bluecrest College and get certified!</p>
              <a href="https://www.bluecrest.edu.gh" style="color: #FF8C00; font-weight: bold; text-decoration: underline;">Explore Professional Courses →</a>
            </div>

            <p style="margin-top: 40px; font-size: 14px; text-align: center; color: #999;">
              Thank you for choosing Prof Academy.<br/>
              Ghana Office: Bluecrest College, Accra.
            </p>
          </div>
        </div>
      `
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
