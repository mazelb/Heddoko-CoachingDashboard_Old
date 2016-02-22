<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for equipment.
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
namespace App\Http\Controllers;

use Request;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\Status;


class EquipmentController extends Controller {

	/**
	 * Display a listing of equipment.
	 *
	 * @return Response
	 */
	public function index()
	{
        // Build the database query.
        $query = Equipment::with('status', 'material')->orderBy('id', 'desc');

		// Filter by status ID.
		$status_id = (int) Request::input('status_id', 0);
		switch ($status_id)
		{
			case 0:
				// Retrieve all equipment.
				break;

			default:
				$query->where('status_id', $status_id);
		}

        // Filter by search term.
        $search_term = strip_tags(trim(Request::input('search_term')));
        if (strlen($search_term))
        {
            $query->where('serial_no', 'LIKE', '%'. $search_term .'%')
                    ->orWhere('physical_location', 'LIKE', '%'. $search_term .'%');
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
	 * Store a newly created suit-equipment in storage.
	 *
	 * @return Response: The updated list of suit-equipments
	 */
	public function store()
	{
		Equipment::create(Request::input('new_equipment_data', array()));

		return $this->index();
	}

	/**
	 * Update the specified equipment in storage.
	 *
	 * @param  int  $id
	 * @return Response: The updated list of suits
	 */
	public function update($id)
	{
		// Retrieve the equipment model.
		$model = Equipment::find($id);

		// Retrieve the updated data for this model.
		$updated_model = Request::input('updated_equipment', []);

		// Update the model.
		$model->fill(array_except($updated_model, ['id', 'suits_equipment_id']));
		$model->save();

		return $this->index();
	}

	/**
	 * Remove the specified equipment from storage.
	 *
	 * @param  int  $id
	 * @return Response: The updated list of equipment.
	 */
	public function destroy($id)
	{
		// Delete the equipment.
		$model = Equipment::findOrFail($id);
		$model->delete($id);

        return $this->index();
	}
}
