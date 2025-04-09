<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            width: 100%;
        }

        .container {
            max-width: 500px;
            margin: 0 auto;
            padding: 16px;
        }

        .card {
            background-color: white;
            border-radius: 16px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            border-top: 4px solid #8b5cf6;
        }

        .card-inner {
            padding: 40px 32px;
            text-align: center;
        }

        .logo-container {
            display: flex;
            justify-content: center;
            margin-bottom: 36px;
            text-align: center;
        }

        .logo-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }

        .logo-icon {
            height: 90px;
            width: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .logo-image {
            max-width: 100%;
            max-height: 100%;
            display: block;
        }

        .logo-text {
            font-size: 28px;
            font-weight: 700;
            color: #1f2937;
            text-align: center;
            letter-spacing: 0.5px;
        }

        .logo-fallback {
            font-size: 28px;
            font-weight: 700;
            color: #8b5cf6;
            text-align: center;
            margin-bottom: 8px;
        }

        .content {
            text-align: center;
            margin-bottom: 32px;
        }

        .title {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 20px;
            letter-spacing: 0.5px;
        }

        .description {
            color: #4b5563;
            margin-bottom: 24px;
            line-height: 1.5;
        }

        .otp-container {
            background-color: #f9fafb;
            border-radius: 12px;
            padding: 28px;
            margin-bottom: 28px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .otp-code {
            letter-spacing: 0.15em;
            font-size: 36px;
            font-weight: 700;
            color: #1f2937;
        }

        .disclaimer {
            color: #6b7280;
            font-size: 14px;
        }

        .disclaimer-bold {
            font-weight: 500;
        }

        .divider {
            border-top: 1px solid #e5e7eb;
            margin: 32px 0;
        }

        .footer {
            text-align: center;
        }

        .tagline {
            color: #4b5563;
            margin-bottom: 24px;
            font-size: 15px;
        }

        .social-icons {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin-bottom: 24px;
        }

        .social-icon {
            color: #9ca3af;
            transition: color 0.2s ease;
        }

        .social-icon:hover {
            color: #4b5563;
        }

        .copyright {
            color: #9ca3af;
            font-size: 14px;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="card-inner">
                <!-- Logo -->
                <div class="logo-container" style="text-align: center; display: flex; justify-content: center; align-items: center;">
                    <div class="logo-wrapper" style="margin: 0 auto;">
                        <div class="logo-icon" style="display: flex; justify-content: center;">
                            <!--[if mso]>
                            <img src="{{ $message->embedData(file_get_contents(public_path('Assets/image/MMI.png')), 'logo.png') }}" alt="MMI Ticket Logo" class="logo-image" width="90" height="90" style="margin: 0 auto;">
                            <![endif]-->

                            <!--[if !mso]><!-->
                            <img src="{{ $message->embedData(file_get_contents(public_path('Assets/image/MMI.png')), 'logo.png') }}" alt="MMI Ticket Logo" class="logo-image" width="90" height="90" style="margin: 0 auto;">
                            <!--<![endif]-->

                            <div class="logo-fallback" style="display:none;">MMI</div>
                        </div>
                        {{-- <span class="logo-text">MMI_Ticket</span> --}}
                    </div>
                </div>

                <!-- Content -->
                <div class="content">
                    <h1 class="title">Verify your One Time Password (OTP)</h1>
                    <p class="description">
                        We have received a sign-in attempt with the following code. Please enter it in the browser window where you started signing in for MMI-Ticket System.
                    </p>

                    <!-- OTP Code -->
                    <div class="otp-container">
                        <div class="otp-code">{{ $otp }}</div>
                    </div>

                    <p class="disclaimer">
                        If you did not attempt to sign up but received this email, please disregard it.
                        <span class="disclaimer-bold">The code will remain active for 10 minutes.</span>
                    </p>
                </div>

                <!-- Divider -->
                <div class="divider"></div>

                <!-- Footer -->
                <div class="footer">
                    <p class="tagline">MMI_Ticket, an effortless ticketing solution with all the features you need.</p>

                    <!-- Social Icons -->
                    <div class="social-icons">
                        <a href="#" class="social-icon">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                            </svg>
                        </a>
                        <a href="#" class="social-icon">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" class="social-icon">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a href="#" class="social-icon">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </a>
                    </div>

                    <p class="copyright">© 2025 Wiron. All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
