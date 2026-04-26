const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

// Load API Key from .env manually since we are in a script
const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
const apiKey = envContent.match(/RESEND_API_KEY=(.*)/)[1].trim();

const resend = new Resend(apiKey);

async function sendTestEmail() {
  console.log('Attempting to send follow-up email to tidjaniayinla@gmail.com...');
  
  try {
    const data = await resend.emails.send({
      from: 'Prof Academy <info@prof.tedmarkdigital.com>',
      to: 'romaricromaric99@gmail.com',
      subject: 'Checking in: How is your E-business journey so far?',
      html: `
        <div style="font-family: 'Inter', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #FF8C00; padding: 40px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Prof Academy</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #FF8C00;">Hi Tidjani,</h2>
            <p style="font-size: 16px;">It's been an hour since you joined the academy! I wanted to check in and see if you've had a chance to open your e-book.</p>
            
            <p style="font-size: 16px;">The first module on <b>"The Entrepreneur Mindset"</b> is a game-changer. I highly recommend starting there—it sets the foundation for everything else we'll build together.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #FF8C00;">
              <p style="margin: 0; font-style: italic;">"Success is the sum of small efforts, repeated day in and day out."</p>
            </div>

            <p style="font-size: 16px;">If you have any quick questions while going through the first few pages, just reply to this email. I'm here to support you!</p>

            <div style="text-align: center; margin: 40px 0;">
              <a href="https://docs.google.com/presentation/d/1E2it3mhYeAbWnuE4tjbpeRZS5zIT9NAY/edit?usp=sharing" 
                 style="background-color: #FF8C00; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; display: inline-block;">
                Back to my Ebook
              </a>
            </div>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0;" />

            <p style="margin-top: 40px; font-size: 14px; text-align: center; color: #999;">
              Thank you for choosing Prof Academy.<br/>
              Ghana Office: Bluecrest College, Accra.
            </p>
          </div>
        </div>
      `
    });
    console.log('Email sent successfully!', data);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

sendTestEmail();
