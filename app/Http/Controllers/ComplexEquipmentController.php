<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Handles http requests for complex equipment.
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\ComplexEquipment;
use App\Models\Status;

use DB;
use Request;

class ComplexEquipmentController extends Controller {

	/**
	 * Display a listing of the suit-equipments.
	 *
	 * @return Response: The updated list of suits
	 */
	public function index()
	{
        // Retrieve search parameters.
        $page = (int) Request::input('page', 1);
        $perPage = (int) Request::input('per_page', 5);
        $perPage = max(1, min(100, $perPage));

        // Build the database query.
        $query = DB::table('complex_equipment')
            ->select('complex_equipment.id')
            ->leftJoin('equipment', 'complex_equipment.id', '=', 'equipment.complex_equipment_id')
            ->orderBy('complex_equipment.id', 'desc')
            ->distinct();

        // Filter by search term.
        $search_term = strip_tags(trim(Request::input('search_term')));
        if (strlen($search_term))
        {
            $query->where('equipment.serial_no', 'LIKE', '%'. $search_term .'%')
                ->orWhere('equipment.physical_location', 'LIKE', '%'. $search_term .'%');
        }

        // Retrieve suits by page.
        $total = $query->count('complex_equipment.id');
        $offset = ($page - 1) * $perPage;
        $ids = $query->skip($offset)->take($perPage)->lists('id');
        $results = ComplexEquipment::with('equipment.material')->whereIn('id', $ids)->orderBy('id', 'desc')->get();

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
        $data = Request::input('new_suit_equipment');

		$new_suit_equipment = ComplexEquipment::create(array_only($data, [
            'serial_no',
            'mac_address',
            'physical_location',
            'notes',
            'status_id'
        ]));

		$new_suit_equipment_list = $data['equipment'];

		foreach ($new_suit_equipment_list as $new_suit_equipment_item)
		{
			$equipment_model = Equipment::findOrFail($new_suit_equipment_item['id']);
			$equipment_model->complex_equipment_id = $new_suit_equipment->id;
			$equipment_model->status_id = Status::getByName('unavailable')->id;
			$equipment_model->save();
		}

		return $this->index();
	}

	/**
	 * Update the specified suit in storage.
	 *
	 * @param  int  $suit_id
	 * @return Response: The updated list of suits
	 */
	public function update($suit_equipment_id)
	{
        // Retrieve the suit model.
		$suit_equipment_of_interest = ComplexEquipment::findOrFail($suit_equipment_id);

        // Retrieve data sent with the request.
        $data = Request::input('updated_suit');

        // Update the ComplexEquipment.
        $suit_equipment_of_interest->fill(array_only($data, ['mac_address', 'physical_location']));
        $suit_equipment_of_interest->save();

        // Unlink each piece of equipment from the suit.
		foreach ($suit_equipment_of_interest->equipment as $existing_equipment)
		{
			$existing_equipment->status_id = Status::getByName('available')->id;
			$existing_equipment->complex_equipment_id = null;
			$existing_equipment->save();
		}

        // Retrieve the updated list of equipment that belongs to the suit.
        $new_equipment = $data['equipment'];

        // Attach each updated piece of equipment to the suit.
		foreach ($new_equipment as $new_equipment_unit)
		{
			$existing_equipment = Equipment::findOrFail($new_equipment_unit['id']);
			$existing_equipment->complex_equipment_id = $suit_equipment_of_interest->id;
			$existing_equipment->status_id = Status::getByName('unavailable')->id;
			$existing_equipment->save();
		}

		return $this->index();
	}

	/**
	 * Remove the specified suit from storage.
	 *
	 * @param  int  $suit_id
	 * @return Response: The updated list of suits
	 */
	public function destroy($suit_equipment_id)
	{
		$suit_equipment_of_interest = ComplexEquipment::find($suit_equipment_id);

		foreach ($suit_equipment_of_interest->equipment as $suit_equipment)
		{
			$suit_equipment->complex_equipment_id = null;
			$suit_equipment->status_id = Status::getByName('available')->id;
			$suit_equipment->save();
		}

		$suit_equipment_of_interest->delete();

        return $this->index();
	}
}
