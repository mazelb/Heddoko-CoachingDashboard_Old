<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', ['middleware' => 'auth', function()
{
    // Coaches dashboard.
	if (Entrust::hasRole('manager') || Entrust::hasRole('coach'))
    {
		return view('layouts.angular');
	}

	else if (Entrust::hasRole('admin')){
		return 'you\'re an admin!';
	}

	else if (Entrust::hasRole('athlete')){
		return 'you\'re an athlete!';
	}

	else return 'fatal error';

}]);

//Entrust::routeNeedsRole('api*', 'owner', Redirect::to('/home'));

Route::group(['middleware' => 'auth', 'prefix' => 'api'], function()
{
    // Profile endpoints.
    Route::post('profile/{id}/avatar', 'ProfileController@saveAvatar');
    Route::delete('profile/{id}/avatar', 'ProfileController@destroyAvatar');
    Route::resource('profile', 'ProfileController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    // Group endpoints.
    Route::post('group/{id}/avatar', 'GroupController@saveAvatar');
    Route::delete('group/{id}/avatar', 'GroupController@destroyAvatar');
    Route::resource('group', 'GroupController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    // Tag endpoints.
    Route::resource('tag', 'TagController', [
        'only' => ['index', 'store']
    ]);

    // Movement data endpoints.
    Route::resource('profile.movement', 'MovementDataController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    // FMS endpoints.
    Route::resource('fms', 'FMSController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);
    Route::resource('fms.test', 'FMSTestController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    //
    // Deprecated.
    //

	Route::resource('teams', 'TeamController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
    Route::post('/teams/{id}/photo', 'TeamController@uploadPhoto');

    // Replaced by "profiles"
	Route::resource('teams.athletes', 'TeamAthleteController', ['only' => ['index', 'show', 'store', 'update', 'destroy']]);
    Route::post('/teams/{groupId}/athletes/{profileId}/photo', 'TeamAthleteController@uploadPhoto');

	Route::resource('athletes.fmsforms', 'AthleteFMSFormController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
	Route::resource('athletes.movements', 'AthleteMovementController', ['only' => ['index', 'show', 'store']]);

	Route::resource('sports', 'SportsController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
	Route::resource('sports.sportmovements', 'SportSportMovementController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);

});

// Authentication routes.
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

// Static pages.
Route::get('privacy', function() {
    return view('static.privacy');
});
Route::get('terms', function() {
    return view('static.terms');
});

// Redirects.
Route::get('home', function() {
    return redirect('/');
});

//@todo: lock this file down env file), wrt filesystem/web server config/perms (.htaccess)
//@todo: remove readme files (etc.). dont share more than you need to.
//@todo database table can only readonly and insert. or maybe only read views.
//@todo: must keep laravel up-to-date, get on mailing list for laravel
//@todo: ssl? GAE
//@todo: sessionid/token to ensure current user belongs to current sessions (laravel equiv.)
