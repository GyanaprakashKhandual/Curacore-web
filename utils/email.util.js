const nodemailer = require('nodemailer');


const sendOTPEmail = async (email, otp) => {

    try {
        
        const transporter = nodemailer.createTransport({

            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });

        const mailOptions = {
    from: `"Caffetest" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP for Registration',
    text: `Your OTP is: ${otp}`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 40px; max-height: 80vh">
        <div style="
            max-width: 520px;
            margin: auto;
            padding: 35px;
            border-radius: 15px;
            box-shadow: 0px 6px 18px rgba(0,0,0,0.1);
            background: radial-gradient(circle at top left, rgba(173, 216, 230, 0.6), transparent 40%),
                        radial-gradient(circle at bottom right, rgba(144, 238, 144, 0.6), transparent 40%),
                        linear-gradient(135deg, #f8fbff, #e0f7fa, #e8f5e9);
        ">
            
            <h2 style="text-align: center; color: #2e7d32; margin-bottom: 10px;">Caffetest</h2>
            <p style="font-size: 16px; color: #333; text-align: center;">We’ve received your request for registration. Use the OTP below to verify your account:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <span style="
                    font-size: 28px;
                    font-weight: bold;
                    color: #2e7d32;
                    padding: 14px 28px;
                    background: rgba(46, 125, 50, 0.1);
                    border: 2px dashed #2e7d32;
                    border-radius: 10px;
                    display: inline-block;
                ">${otp}</span>
            </div>
            
            <p style="font-size: 14px; color: #555; text-align: center; margin-top: 20px;">
                This OTP will expire in <strong>5 minutes</strong>. Please do not share it with anyone.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">
            <p style="font-size: 12px; text-align: center; color: #777;">© ${new Date().getFullYear()} Caffetest. All rights reserved.</p>
        </div>
    </div>
    `
};

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error('Error while sending mail: ', error);
        throw error;
    }
};

module.exports = { sendOTPEmail };
