<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public $otp;

    public function __construct($otp)
    {
        $this->otp = $otp;
        // Log that the mail object is being constructed
        Log::info('SendOtpMail constructed with OTP', ['otp' => $otp]);
    }

    public function build()
    {
        Log::info('Building OTP email');

        try {
            return $this->subject('Your OTP Code')
                ->view('emails.send-otp');
        } catch (\Exception $e) {
            Log::error('Error building OTP email', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e; // Re-throw the exception to be caught in the controller
        }
    }
}
