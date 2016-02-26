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
     *
     */
    const SEARCH_LIMIT = 100;

    /**
     *
     */
    const ORDER_DIR = 'asc';

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

        $offset = max(0, $this->request->get('offset', 0));
        $limit = min(static::SEARCH_LIMIT, $this->request->get('limit', 20));
        $orderDir = $this->request->get('orderDir', static::ORDER_DIR);
        $orderDir = in_array($orderDir, ['asc', 'desc']) ? $orderDir : static::ORDER_DIR;

        // Return available tags.
        return $builder->orderBy('title', $orderDir)->skip($offset)->limit($limit)->get();
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
        if ($tag = Tag::find($id)) {
            return $tag;
        }

        return response('Tag Not Found.', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        // Performance check.
        if (!$tag = Tag::find($id)) {
            return response('Tag Not Found.', 404);
        }

        // Make sure we have a valid title.
        $title = trim($this->request->input('title'));
        if (strlen($title) < 1) {
            return response('Tag Title Too Short.', 400);
        }

        $tag->title = $title;

        if (!$tag->save()) {
            return response('Could not save tag.', 500);
        }

        return $tag;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Tag::destroy($id) ? response('', 200) : response('', 500);
    }
}
