<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles user actions.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Http\Controllers;

use Auth;
use Image;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        // Create new user.
        $user = User::create($this->request->only([
            'username',
            'password',
            'first_name',
            'last_name',
            'phone',
            'email',
            'config'
        ]));

        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        if (!$user = $this->getUser($id)) {
            return response('User Not Found.', 404);
        }

        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        if (!$user = $this->getUser($id)) {
            return response('User Not Found.', 404);
        }

        // We update the user details one at a time, to allow updating single fields.
        $attrs = ['username', 'firstName', 'lastName', 'phone', 'email'];
        foreach ($attrs as $attr)
        {
            if ($this->request->has($attr)) {
                $user->{snake_case($attr)} = $this->request->input($attr);
            }
        }

        // Update user config.
        // ...

        // Update user password.
        // ...

        // Save profile.
        $user->save();

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        if (!$user = $this->getUser($id)) {
            return response('User Not Found.', 404);
        }

        // Delete avatar.
        if ($user->avatar) {
            $user->avatar->delete();
        }

        // Delete user.
        $user->delete();

        // Return status code "204 No Content"
        return response('User Successfully Deleted.', 204);
    }

    /**
     * Saves the avatar for a user.
     *
     * @param int $id
     */
    public function saveAvatar($id)
    {
        if (!$user = $this->getUser($id)) {
            return response('User Not Found.', 404);
        }

        // Check image.
        if (!$original = $this->request->file('image')) {
            return response('No File Received.', 400);
        } elseif (!preg_match('#^(image/[a-z]+)$#', $original->getMimeType())) {
            return response('Invalid MIME type.', 400);
        }

        // Delete previous avatar.
        if ($user->avatar) {
            $user->avatar->delete();
        }

        // Save avatar data.
        $avatar = $user->avatar()->create([
            'data_uri' => base64_encode(file_get_contents($original->getRealPath())),
            'mime_type' => $original->getMimeType()
        ]);

        return [
            'user' => $user,
            'avatar' => $avatar,
            'avatar_src' => $avatar->src
        ];
    }

    /**
     * Removes the user's avatar
     */
    public function destroyAvatar($id)
    {
        if (!$user = $this->getUser($id)) {
            return response('User Not Found.', 404);
        }

        // Delete avatar.
        $user->avatar()->delete();

        return $user;
    }

    /**
     * Shortcut to retrieve user object.
     *
     * @param int|string $id    Either an integer identifying the user or an MD5 hash of the ID.
     * @param array $embed      List of relations to embed with the user object.
     * @return \App\Models\User|null
     */
    private function getUser($id, array $embed = ['avatar'])
    {
        // If the ID is a hash, assume we're trying to retrieve data for the currently
        // authenticated user.
        if (!is_numeric($id) && $id == md5(Auth::id())) {
            $id = Auth::id();
        }

        // Else, find the user by ID.
        return User::with($embed)->find($id);
    }
}
