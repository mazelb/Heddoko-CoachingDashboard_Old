<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for material types.
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
namespace App\Http\Controllers;

use Request;

use App\Http\Requests;
use App\Models\MaterialType;
use App\Http\Controllers\Controller;


class MaterialTypeController extends Controller
{
	/**
	 * Display a listing of the material types.
	 *
	 * @return Response
	 */
	public function index()
	{
		$material_types = MaterialType::orderBy('id', 'desc')->get();

		return [
			'total' => count($material_types),
            'page' => 1,
            'per_page' => count($material_types),
            'results' => $material_types
		];
	}

	/**
	 * Store a newly created material type in storage.
	 *
	 * @return Response: The updated list of material types
	 */
	public function store()
	{
		MaterialType::create(Request::input('new_material_type_data', array()));

		return $this->index();
	}

	/**
	 * Update the specified material type in storage.
	 *
	 * @param  int  $id
	 * @return Response: The updated list of material types
	 */
	public function update($id)
	{
		// Retrieve the material model.
		$model = MaterialType::find($id);

		// Retrieve the updated data for this model.
		$updated_model = Request::input('updated_material_type', []);

		// Update the model.
		$model->fill(array_except($updated_model, ['id']));
		$model->save();

		return $this->index();
	}

	/**
	 * Remove the specified material type from storage.
	 *
	 * @param  int  $id
	 * @return Response: The updated list of material types.
	 */
	public function destroy($id)
	{
		// Delete the material type.
		$model = MaterialType::findOrFail($id);
		$model->delete($id);

        return $this->index();
	}
}
