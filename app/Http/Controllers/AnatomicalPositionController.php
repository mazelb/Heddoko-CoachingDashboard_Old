<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for anatomical positions.
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
namespace App\Http\Controllers;

use Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\AnatomicalPosition;


class AnatomicalPositionController extends Controller
{
	/**
	 * Display a listing of anatomical positions.
	 *
	 * @return Response
	 */
	public function index()
	{
        // Build the database query.
        $query = AnatomicalPosition::orderBy('id', 'desc');

        // Filter by search term.
        $search_term = strip_tags(trim(Request::input('search_term')));
        if (strlen($search_term))
        {
            $query->where('name', 'LIKE', '%'. $search_term .'%');
        }

        // Retrieve search parameters.
        $total = $query->count('id');
        $page = (int) Request::input('page', 1);
        $perPage = (int) Request::input('per_page', 100);
        $perPage = max(1, min(100, $perPage));
        $offset = ($page - 1) * $perPage;
        $results = $query->skip($offset)->take($perPage)->get();

		// Add an "updated_id" attribute, so we can modify it later if needed.
		// We need to do this because the ID attribute is non-incrementing and user editable,
		// which means we need some way to reference this model while updating it other than
		// by ID.
		if (count($results)) {
			foreach ($results as $anatomical_position) {
				$anatomical_position['updated_id'] = $anatomical_position['id'];
			}
		}

        return [
            'total' => $total,
            'page' => $page,
            'per_page' => $perPage,
            'results' => $results
        ];
	}

	/**
	 * Store a newly created material type in storage.
	 *
	 * @return Response: The updated list of material types
	 */
	public function store()
	{
		AnatomicalPosition::create(Request::input('new_anatomical_position_data', array()));

		return $this->index();
	}

	/**
	 * Update the specified anatomical position in storage.
	 *
	 * @param  int  $id
	 * @return Response: The updated list of anatomical positions
	 */
	public function update($id)
	{
		// Retrieve the anatomical position model.
		$model = AnatomicalPosition::find($id);

		// Retrieve the updated data for this model.
		$updated_model = Request::input('updated_anatomical_position', []);

		// Update the ID.
		if (isset($updated_model['updated_id'])) {
			$updated_model['id'] = $updated_model['updated_id'];
		}

		// Update the model.
		$model->fill(array_except($updated_model, ['updated_id']));
		$model->save();

		return $this->index();
	}

	/**
	 * Remove the specified anatomical position from storage.
	 *
	 * @param  int  $id
	 * @return Response: The updated list of anatomical positions.
	 */
	public function destroy($id)
	{
		// Delete the anatomical position.
		$model = AnatomicalPosition::findOrFail($id);
		$model->delete($id);

        return $this->index();
	}
}
