<?php
/**
 * Copyright Heddoko(TM) 2016, all rights reserved.
 *
 * @brief   Handles username-related http requests.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    February 2016
 */
namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Mail\Mailer;

class UsernameController extends Controller
{
    /**
     * Creates a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Apply the "guest" middleware.
        $this->middleware('guest');
    }

    /**
     *
     */
    public function getUsername()
    {
        return view('auth.username');
    }

    /**
     *
     */
    public function postUsername(Request $request, Mailer $mailer)
    {
        // Validate the email.
        $this->validate($request, ['email' => 'required|email|exists:users,email']);

        // Retrieve user details.
        if (!$user = User::where('email', $request->input('email'))->first()) {
            abort(404, 'User Not Found.');
        }

        // Send username by email.
        $mailer->send('emails.username', compact('user'), function($message) use($user) {
            $message->to($user->email);
        });

        return redirect()->back()->with('status', 'Your username has been sent to you by email.');
    }
}
