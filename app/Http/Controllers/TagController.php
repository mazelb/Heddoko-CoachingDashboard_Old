<?php
/**
 * @brief   Controller for tags.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Tag;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class TagController extends Controller
{
    /**
     * Constructor.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Retrieve a query builder.
        $builder = Tag::query();

        // Filter by search term.
        if ($this->request->has('query')) {
            $builder->where('title', 'like', '%'. $this->request->get('query') .'%');
        }

        // Limit to 200 results or lower.
        $limit = min(200, $this->request->get('limit', 50));

        // Return available tags.
        return $builder->limit($limit)->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return response('Not Implemented.', 501);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        // Make sure we have a valid title.
        $title = trim($this->request->input('title'));
        if (strlen($title) < 1) {
            return response('Tag Title Too Short.', 400);
        }

        // Make sure tag doesn't already exist.
        if ($exists = Tag::where('title', '=', $title)->first()) {
            return response('Tag Already Exists.', 204);
        }

        // Create new tag.
        $tag = Tag::create(['title' => $title]);

        return $tag;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response('Not Implemented.', 501);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return response('Not Implemented.', 501);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return response('Not Implemented.', 501);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response('Not Implemented.', 501);
    }
}
