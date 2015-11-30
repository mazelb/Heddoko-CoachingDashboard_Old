<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\Role;
use App\Models\Admin;
use App\Models\Coach;
use App\Models\Athlete;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers;

	protected $username = 'username';

	protected $redirectPath = '/';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'getLogout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {

		return Validator::make($data, [
			'first_name' => 'required|max:100',
			'last_name' => 'required|max:100',
			'email' => 'required|email|max:255',
			'username' => 'required|max:255|unique:users',
			'password' => 'required|confirmed|min:6',
			// 'city' => 'required',
			// 'dob' => 'required',
			// 'sex' => 'required|in:unspecified,male,female',
			// 'mobile' => 'numeric',
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

		$new_user = User::create([

			'email' => $data['email'],
			'username' => $data['username'],
			'password' => bcrypt($data['password']),
			// 'city' => $data['city'],
			// 'dob' => $data['dob'],
			// 'sex' => $data['sex'],
			'phone' => $data['phone'],
		]);

		switch ($data['newAccountType'])
		{

			case 'athlete':

				$new_user->attachRole(Role::where('name', 'athlete')->firstOrFail()->id);

				// Athlete::create([
				// 				'first_name' => $data['first_name'],
				// 				'last_name' => $data['last_name'],
				// 				'user_id' => $new_user->id
				// ]);

				break;

			case 'coach':

				$new_user->attachRole(Role::where('name', 'coach')->firstOrFail()->id);

				// Coach::create([
				// 				'first_name' => $data['first_name'],
				// 				'last_name' => $data['last_name'],
				// 				'user_id' => $new_user->id
				// ]);

				break;

			case 'admin':

				$new_user->attachRole(Role::where('name', 'admin')->firstOrFail()->id);

				// Admin::create([
				// 				'first_name' => $data['first_name'],
				// 				'last_name' => $data['last_name'],
				// 				'user_id' => $new_user->id
				// ]);

				break;

			default:

		}

		return $new_user;
    }
}
