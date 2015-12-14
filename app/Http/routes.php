<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * Here is where all the application routes are registered. There are global patterns for some
 * route parameters defined in App\Providers\RouteServiceProvider.
 */


/**
 * API routes.
 */
Route::group(['middleware' => 'auth', 'prefix' => 'api/v1'], function()
{
    // Profile endpoints.
    Route::post('profile/{id}/avatar', 'ProfileController@saveAvatar');
    Route::delete('profile/{id}/avatar', 'ProfileController@destroyAvatar');
    Route::resource('profile', 'ProfileController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    // Folder endpoints.
    Route::resource('profile.folder', 'FolderController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    // Movement endpoints.
    Route::resource('movement', 'MovementController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    // Group endpoints.
    Route::post('group/{id}/avatar', 'GroupController@saveAvatar');
    Route::delete('group/{id}/avatar', 'GroupController@destroyAvatar');
    Route::resource('group', 'GroupController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    // Screening endpoints.
    Route::resource('screening', 'ScreeningController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);
    Route::resource('screening.test', 'ScreeningTestController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    // User endpoints.
    Route::post('user/{id}/avatar', 'UserController@saveAvatar');
    Route::delete('user/{id}/avatar', 'UserController@destroyAvatar');
    Route::resource('user', 'UserController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    // Tag endpoints.
    Route::resource('tag', 'TagController', [
        'only' => ['index', 'store']
    ]);

    //
    // Deprecated.
    //

	// Route::resource('teams', 'TeamController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
    // Route::post('/teams/{id}/photo', 'TeamController@uploadPhoto');
    //
	// Route::resource('teams.athletes', 'TeamAthleteController', ['only' => ['index', 'show', 'store', 'update', 'destroy']]);
    // Route::post('/teams/{groupId}/athletes/{profileId}/photo', 'TeamAthleteController@uploadPhoto');
    //
	// Route::resource('athletes.fmsforms', 'AthleteFMSFormController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
	// Route::resource('athletes.movements', 'AthleteMovementController', ['only' => ['index', 'show', 'store']]);
    //
	// Route::resource('sports', 'SportsController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
	// Route::resource('sports.sportmovements', 'SportSportMovementController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
});

/**
 * Authentication, registration and password recovery routes.
 */
Route::get('login', 'Auth\AuthController@getLogin')->name('auth.login');
Route::post('login', 'Auth\AuthController@postLogin')->name('auth.login.post');
Route::get('logout', 'Auth\AuthController@getLogout')->name('auth.logout');

Route::get('register', 'Auth\AuthController@getRegister')->name('auth.register');
Route::post('register', 'Auth\AuthController@postRegister')->name('auth.register.post');

Route::get('reset', 'Auth\PasswordController@getEmail')->name('auth.password');
Route::post('reset/email', 'Auth\PasswordController@postEmail')->name('auth.password.post');
Route::get('reset/{token}', 'Auth\PasswordController@getReset')->name('auth.reset');
Route::post('reset', 'Auth\PasswordController@postReset')->name('auth.reset.post');

/**
 * General Angular app routes.
 */
Route::get('/', ['middleware' => 'auth', function()
{
    // Coaching dashboard.
	if (Entrust::hasRole('manager') || Entrust::hasRole('admin'))
    {
		return view('layouts.angular');
	}

	// Unauthorized access.
    return 'Unauthorized.';

}])->name('home');

/**
 * Other static pages.
 */
Route::get('privacy', function() {
    return view('static.privacy');
});
Route::get('terms', function() {
    return view('static.terms');
});

/**
 * Redirects.
 */
Route::get('home', function() {
    return redirect(route('home'));
});
Route::get('auth/login', function() {
    return redirect(route('auth.login'));
});
Route::get('auth/logout', function() {
    return redirect(route('auth.logout'));
});
Route::get('auth/register', function() {
    return redirect(route('auth.register'));
});



//@todo: lock this file down env file), wrt filesystem/web server config/perms (.htaccess)
//@todo: remove readme files (etc.). dont share more than you need to.
//@todo database table can only readonly and insert. or maybe only read views.
//@todo: must keep laravel up-to-date, get on mailing list for laravel
//@todo: ssl? GAE
//@todo: sessionid/token to ensure current user belongs to current sessions (laravel equiv.)
