Hello {{ $user->firstName }},

Click here to reset your password: {{ route('auth.reset', ['token' => $token]) }}

Looking forward to seeing you again!

- The Heddoko Team
