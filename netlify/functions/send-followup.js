import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event, context) => {
  // Only allow POST requests (usually from QStash)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email, name } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
    }

    // Send the "Beautiful" Follow-up Email
    await resend.emails.send({
      from: 'Prof Academy <info@prof.tedmarkdigital.com>',
      to: email,
      subject: 'Checking in: How is your E-business journey so far?',
      html: `
        <div style="font-family: 'Inter', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #FF8C00; padding: 40px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Prof Academy</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #FF8C00;">Hi ${name || 'Future Expert'},</h2>
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

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Follow-up email sent' })
    };
  } catch (error) {
    console.error('Error in follow-up:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send follow-up' })
    };
  }
};
