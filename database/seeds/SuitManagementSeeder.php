<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Seeds the database with sample data.
 * @author  Maxwell (max@heddoko.com) & Francis Amankrah (frank@heddoko.com)
 */
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Models\AnatomicalPosition;
use App\Models\Equipment;
use App\Models\Material;
use App\Models\MaterialType;
use App\Models\Status;
use App\Models\ComplexEquipment;

class SuitManagementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('Seeding Suit Management sample data');

        DB::table('equipment')->delete();
        DB::table('statuses')->delete();
        DB::table('materials')->delete();
        DB::table('material_types')->delete();
        DB::table('complex_equipment')->delete();
        DB::table('anatomical_positions')->delete();

        $this->command->info('Entries successfully deleted. Beginning seed.');

        // Create statuses.
        $status_unavailable = Status::create(['name' => 'unavailable']);
        $status_available = Status::create(['name' => 'available']);
        $status_loan = Status::create(['name' => 'on loan']);
        $status_transit = Status::create(['name' => 'in transit']);

        // Create anatomical positions.
        AnatomicalPosition::create(['name' => 'Upper spin',		 'id' => 0]);
        AnatomicalPosition::create(['name' => 'Right upper arm', 'id' => 1]);
        AnatomicalPosition::create(['name' => 'Right forearm',   'id' => 2]);
        AnatomicalPosition::create(['name' => 'Left upper arm',  'id' => 3]);
        AnatomicalPosition::create(['name' => 'Left forearm', 	 'id' => 4]);
        AnatomicalPosition::create(['name' => 'Right thigh', 	 'id' => 5]);
        AnatomicalPosition::create(['name' => 'Right tibia', 	 'id' => 6]);
        AnatomicalPosition::create(['name' => 'Left thigh',		 'id' => 7]);
        $left_tibia_pos = AnatomicalPosition::create(['name' => 'Left tibia', 	 'id' => 8]);

        // Create material types.
        $material_type_sensor = MaterialType::create(['identifier' => 'Sensor']);
        $material_type_battery = MaterialType::create(['identifier' => 'Battery']);

        // Create materials.
        $material_nod = Material::create(['material_type_id' => $material_type_sensor->id, 'name' => 'Sample Nod', 'part_no' => 12345]);
        $material_ss = Material::create(['material_type_id' => $material_type_sensor->id, 'name' => 'Sample StretchSense sensor', 'part_no' => 12345]);
        $material_battery = Material::create(['material_type_id' => $material_type_battery->id, 'name' => 'Sample Battery Pack', 'part_no' => 12345]);

//        for ($x = 0; $x <= rand(100, 200); $x++) {
//            Material::create(['material_type_id' => $new_material_type->id, 'name' => 'StretchSensor', 'part_no' => 274321]);
//        }

        // Create ComplexEquipment.
        $materials = [$material_nod->id, $material_ss->id, $material_battery->id];
        for ($x = 0; $x <= rand(15, 30); $x++)
        {
            // Generate a random MAC address.
            $mac_address = [];
            $hex = str_shuffle(md5(microtime() . $x));
            for ($y = 0; $y <= 12; $y++) {
                $mac_address[] = substr($hex, $y++, 2);
            }

            // Create a new ComplexEquipment.
            $suit_equipment = ComplexEquipment::create([
                'mac_address' => implode(':', $mac_address),
                'serial_no' => substr(str_shuffle('abcdefghijklmnopqrstuvwxyz1234567890'), 0, 10),
                'physical_location' => 'Warehouse',
                'status_id' => $status_unavailable->id
            ]);

            // Attach some equipment.
            for ($z = 0; $z <= rand(1, 4); $z++)
            {
                Equipment::create([
                    'complex_equipment_id' => $suit_equipment->id,
                    'material_id' => $materials[rand(0, 1)],
                    'serial_no' => substr(str_shuffle('abcdefghijklmnopqrstuvwxyz1234567890'), 0, 10),
                    'physical_location' => 'Box 2',
                    'status_id' => $status_unavailable->id,
                    'anatomical_position_id' => $left_tibia_pos->id
                ]);
            }

            // Attach a battery pack
            Equipment::create([
                'complex_equipment_id' => $suit_equipment->id,
                'material_id' => $material_battery->id,
                'serial_no' => substr(str_shuffle('abcdefghijklmnopqrstuvwxyz1234567890'), 0, 10),
                'physical_location' => 'Box 2',
                'status_id' => $status_unavailable->id]
            );
        }

        // Create other sample equipment.
        for ($x = 0; $x <= rand(200, 300); $x++)
        {
            Equipment::create([
                'material_id' => $materials[rand(0, 2)],
                'serial_no' => substr(str_shuffle('abcdefghijklmnopqrstuvwxyz1234567890'), 0, 10),
                'physical_location' => 'Box 2',
                'status_id' => $status_available->id]
            );
        }
    }
}
