import { Resend } from 'resend';

// Safe Variable (Managed in Netlify Settings)
const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email, name } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
    }

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
            <p style="font-size: 16px;">Congratulations on mastering the digital economy! Your purchase of <b>"E-Business for Bluecrest Students"</b> by Prof Tidjani has been confirmed.</p>
            
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

    // 2. Schedule the "Beautiful" Follow-up Email (1 hour later) via QStash
    if (process.env.QSTASH_TOKEN) {
      try {
        // Use the site's URL (either provided by Netlify or your custom domain)
        const siteUrl = process.env.URL || 'https://prof.tedmarkdigital.com';
        
        await fetch(`https://qstash.upstash.io/v1/publish/${siteUrl}/.netlify/functions/send-followup`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.QSTASH_TOKEN}`,
            'Content-Type': 'application/json',
            'Upstash-Delay': '1h' // This tells QStash to wait 1 hour
          },
          body: JSON.stringify({ email, name })
        });
        console.log('Follow-up scheduled successfully');
      } catch (scheduleError) {
        console.error('Failed to schedule follow-up:', scheduleError);
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, data })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
