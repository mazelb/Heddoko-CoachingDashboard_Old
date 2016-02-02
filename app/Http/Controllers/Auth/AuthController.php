<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles authentication-related http requests.
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
namespace App\Http\Controllers\Auth;

use Validator;

use App\Models\User;
use App\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    use AuthenticatesAndRegistersUsers;

	protected $username = 'username';

    /**
     * Creates a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Apply the "guest" middleware.
        $this->middleware('guest', ['except' => 'getLogout']);

        // Update the authentication paths.
        $this->loginPath = route('auth.login');
        $this->redirectPath = route('home');
    }

    /**
     * Gets a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
		return Validator::make($data, [
			'firstName' => 'required|max:100',
			'lastName' => 'required|max:100',
			'email' => 'required|email|max:255',
			'username' => 'required|max:255|unique:users',
			'password' => 'required|confirmed|min:6|max:60',
		]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        // Create new user.
		$user = User::create([
			'email' => $data['email'],
			'username' => $data['username'],
			'password' => bcrypt($data['password']),
			'first_name' => $data['firstName'],
			'last_name' => @$data['lastName'],
			'phone' => @$data['phone'],
			'country' => isset($data['country']) ? $data['country'] : 'US',
		]);

        // Attach role to user.
        // TODO: replace Zizaco/Entrust with Laravel Authorization.
        switch ($data['role'])
        {
            case 'admin':
                if ($role = Role::where('name', 'admin')->first()) {
                    $user->attachRole($role->id);
                }
                break;

            case 'manager':
                if ($role = Role::where('name', 'manager')->first()) {
                    $user->attachRole($role->id);
                }
                break;
        }

		return $user;
    }
}
