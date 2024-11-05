const HTML_TEMPLATE_VERIFY_EMAIL = (text: string) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            background-color: #4CAF50;
            padding: 10px;
            color: white;
            border-radius: 8px 8px 0 0;
        }
        .email-body {
            padding: 20px;
            text-align: center;
        }
        .email-body h1 {
            font-size: 24px;
            color: #333;
        }
        .email-body p {
            font-size: 16px;
            color: #666;
        }
        .verification-code {
            display: inline-block;
            margin: 20px 0;
            padding: 15px;
            background-color: #eaeaea;
            font-size: 20px;
            letter-spacing: 4px;
            font-weight: bold;
            color: #333;
            border-radius: 5px;
        }
        .email-footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h2>Email Verification</h2>
        </div>
        <div class="email-body">
            <h1>Your Verification Code</h1>
            <p>Please use the following verification code to complete your email verification process:</p>
            <div class="verification-code">${text}</div>
            <p>Enter this code on the verification page to confirm your email address.</p>
        </div>
        <div class="email-footer">
            <p>If you didn’t request this, you can ignore this email.</p>
        </div>
    </div>
</body>
</html>
  `;
};

export default HTML_TEMPLATE_VERIFY_EMAIL;
