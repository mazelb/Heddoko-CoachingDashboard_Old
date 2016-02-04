<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for materials.
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
namespace App\Http\Controllers;

use Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Material;


class MaterialController extends Controller
{
	/**
	 * Display a listing of materials.
	 *
	 * @return Response
	 */
	public function index()
	{
        // Build the database query.
        $query = Material::with('materialType')->orderBy('id', 'desc');

        // Filter by search term.
        $search_term = strip_tags(trim(Request::input('search_term')));
        if (strlen($search_term))
        {
            $query->where(function($query) use ($search_term) {
                $query->where('name', 'LIKE', '%'. $search_term .'%')
                    ->orWhere('part_no', 'LIKE', '%'. $search_term .'%');
            });
        }

        // Retrieve search parameters.
        $total = $query->count('id');
        $page = (int) Request::input('page', 1);
        $perPage = (int) Request::input('per_page', 100);
        $perPage = max(1, min(100, $perPage));
        $offset = ($page - 1) * $perPage;
        $results = $query->skip($offset)->take($perPage)->get();

        return [
            'total' => $total,
            'page' => $page,
            'per_page' => $perPage,
            'results' => $results
        ];
	}

	/**
	 * Store a newly created material in storage.
	 *
	 * @return Response: The updated list of materials
	 */
	public function store()
	{
		Material::create(Request::input('new_material_data', array()));

		return $this->index();
	}

	/**
	 * Update the specified material in storage.
	 *
	 * @param  int  $id
	 * @return Response: The updated list of materials
	 */
	public function update($id)
	{
		// Retrieve the material model.
		$model = Material::find($id);

		// Retrieve the updated data for this model.
		$updated_model = Request::input('updated_material', []);

		// Update the model.
		$model->fill(array_except($updated_model, ['id']));
		$model->save();

		return $this->index();
	}

	/**
	 * Remove the specified material from storage.
	 *
	 * @param  int  $id
	 * @return Response: The updated list of materials.
	 */
	public function destroy($id)
	{
		// Delete the material.
		$model = Material::findOrFail($id);
		$model->delete($id);

        return $this->index();
	}
}
