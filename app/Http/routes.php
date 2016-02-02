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
Route::group(['prefix' => 'api'], function()
{
    /**
     * API Draft 1.
     *
     * Middleware for these routes are defined in App\Providers\AppAuthenticationProvider
     */
    Route::group(['prefix' => 'v1'], function()
    {
        // Profile endpoints.
        Route::post('profiles/{id}/avatar', 'ProfileController@saveAvatar');
        Route::delete('profiles/{id}/avatar', 'ProfileController@destroyAvatar');
        Route::resource('profiles', 'ProfileController', [
            'only' => ['index', 'store', 'show', 'update', 'destroy']
        ]);

        // Folder endpoints.
        Route::resource('profiles.folders', 'FolderController', [
            'only' => ['index', 'store', 'show', 'update', 'destroy']
        ]);

        // Movement endpoints.
        Route::resource('movements', 'MovementController', [
            'only' => ['index', 'store', 'show', 'update', 'destroy']
        ]);

        // Screening endpoints.
        Route::resource('screenings', 'ScreeningController', [
            'only' => ['index', 'store', 'show', 'update', 'destroy']
        ]);

        // Group endpoints.
        Route::post('groups/{id}/avatar', 'GroupController@saveAvatar');
        Route::delete('groups/{id}/avatar', 'GroupController@destroyAvatar');
        Route::resource('groups', 'GroupController', [
            'only' => ['index', 'store', 'show', 'update', 'destroy']
        ]);

        // User endpoints.
        Route::post('users/{idOrHash}/avatar', 'UserController@saveAvatar');
        Route::delete('users/{idOrHash}/avatar', 'UserController@destroyAvatar');
        Route::resource('users', 'UserController', [
            'only' => ['store', 'show', 'update', 'destroy']
        ]);

        // Tag endpoints.
        Route::resource('tags', 'TagController', [
            'only' => ['index', 'store']
        ]);
    });

    /**
     * OAuth2
     */
    Route::group(['prefix' => 'oauth2'], function()
    {
        Route::post('token', 'Auth\OAuthController@accessToken');
        Route::get('authorize', [
            'as' => 'oauth.authorize.get',
            'use' => 'Auth\OAuthController@showAuthorizationForm',
            'middleware' => ['oauth.authorization', 'auth']
        ]);
        Route::post('authorize', [
            'as' => 'oauth.authorize.post',
            'use' => 'Auth\OAuthController@authorize',
            'middleware' => ['csrf', 'check-authorization-params', 'auth']
        ]);
    });
});

/**
 * Authentication, registration and account recovery routes.
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

Route::get('username', 'Auth\UsernameController@getUsername')->name('auth.username');
Route::post('username', 'Auth\UsernameController@postUsername')->name('auth.username.post');

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
