<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Models\Athlete;
use App\Models\Coach;
use App\Models\Frame;
use App\Models\FMSForm;
use App\Models\FMSFormSubmission;
use App\Models\Movement;
use App\Models\MovementSubmission;
use App\Models\NodContainer;
use App\Models\NodJoint;
use App\Models\NodSensor;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Sport;
use App\Models\SportMovement;
use App\Models\StretchContainer;
use App\Models\StretchSensor;
use App\Models\StretchJoint;
use App\Models\Team;
use App\Models\User;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		$this->command->info('Seeding started.');
		$this->call('DBSeeder');
		$this->command->info('Seeding finished.');
	}

}

class DBSeeder extends Seeder {

	public function run(){

		$this->command->info('deleting entries from table before beginning seed');

		DB::table('nodsensors')->delete();
		DB::table('stretchsensors')->delete();
		DB::table('nodjoints')->delete();
		DB::table('stretchjoints')->delete();
		DB::table('stretchcontainers')->delete();
		DB::table('nodcontainers')->delete();
		DB::table('frames')->delete();
		DB::table('movementrawentries')->delete();
		DB::table('movements')->delete();
		DB::table('sportmovements')->delete();
		DB::table('fmsformsubmissions')->delete();
		DB::table('fmsforms')->delete();
		DB::table('movementsubmissions')->delete();
		DB::table('athletes')->delete();
		DB::table('teams')->delete();
		DB::table('sports')->delete();
		DB::table('coaches')->delete();
		DB::table('users')->delete();

		// DB::table('migrations')->delete();
		DB::table('roles')->delete();
		DB::table('permissions')->delete();

		$this->command->info('tables cleared successfully');

		$admin = new Role();
		$admin->name         = 'admin';
		$admin->display_name = 'System Administrator'; // optional
		$admin->description  = 'Admins have all privileges'; // optional
		$admin->save();

		$coach = new Role();
		$coach->name         = 'coach';
		$coach->display_name = 'Sports Coach'; // optional
		$coach->description  = 'Coaches administer Teams'; // optional
		$coach->save();

		$newCoachUser = User::create([
			'email' => 'fake@fake.ca',
			'username' => 'awesomecoach111',
			'password' => bcrypt('password'),
			'city' => 'Montreal',
			'dob' => '02/02/02',
			'sex' => 'unspecified',
			'mobile' => '11231234',
		]);

		$newCoachUser->attachRole($coach);

		$deleteFMS = new Permission();
		$deleteFMS->name         = 'delete-fms-forms';
		$deleteFMS->display_name = 'Delete FMS'; // optional
		// Allow a user to...
		$deleteFMS->description  = 'delete FMS Forms'; // optional
		$deleteFMS->save();

		$coach->attachPermission($deleteFMS);

		$dummyCoach = Coach::create([	'first_name' => 'Joe',
										'last_name' => 'Blow',
										'user_id' => $newCoachUser->id]);

		$sport = Sport::create(['name' => 'Hockey']);
		$sport = Sport::create(['name' => 'Soccer']);
		$sport = Sport::create(['name' => 'Football']);
		$sport = Sport::create(['name' => 'Volleyball']);
		$sport = Sport::create(['name' => 'Basketball']);
		$sport = Sport::create(['name' => 'Tennis']);
		$sport = Sport::create(['name' => 'Golf']);
		$sport = Sport::create(['name' => 'Spinning']);
		$sport = Sport::create(['name' => 'Crossfit']);

		$sport = Sport::create(['name' => 'Strength and Conditioning']);

		$sportmovement = SportMovement::create(['name' => 'Back Squat', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'Deadlift', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'Bench Press', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'Push-up', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'Pull-up', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'Horizontal Jump', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'Vertical Jump', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'Plank', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'Lunge', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'Treadmill', 'sport_id' => $sport->id]);

		$sport = Sport::create(['name' => 'Yoga']);

		$sportmovement = SportMovement::create(['name' => 'YogaFakeMvmnt', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'YogaFakeMvmnt1', 'sport_id' => $sport->id]);
		$sportmovement = SportMovement::create(['name' => 'YogaFakeMvmnt3', 'sport_id' => $sport->id]);

		$dummyTeam = Team::create(['name' => 'Dummy Team', 'coach_id' => $dummyCoach->id, 'sport_id' => $sport->id]);
		$dummyTeam = Team::create(['name' => 'Chargers', 'coach_id' => $dummyCoach->id, 'sport_id' => $sport->id]);
		$dummyTeam = Team::create(['name' => 'Falcons', 'coach_id' => $dummyCoach->id, 'sport_id' => $sport->id]);
		$dummyTeam = Team::create(['name' => 'Stampeders', 'coach_id' => $dummyCoach->id, 'sport_id' => $sport->id]);
		$dummyTeam = Team::create(['name' => 'Vikings', 'coach_id' => $dummyCoach->id, 'sport_id' => $sport->id]);

		$newAthleteUser = User::create([
			'email' => 'fake2@fake.ca',
			'username' => 'awesomeathlete111',
			'password' => bcrypt('password'),
			'city' => 'Montreal',
			'dob' => '02/02/02',
			'sex' => 'male',
			'mobile' => '11231234',
		]);

		$athlete = new Role();
		$athlete->name         = 'athlete';
		$athlete->display_name = 'Sports Athlete'; // optional
		$athlete->description  = 'Athletes have very limited permissions'; // optional
		$athlete->save();

		$newAthleteUser->attachRole($athlete);

		$dummyAthlete = Athlete::create([	'first_name' => 'Jim',
											'last_name' => 'Bob',
											'team_id' => $dummyTeam->id,
											'user_id' => $newAthleteUser->id,
											'age' => 25,
											'height_cm' => 193,
											'weight_cm' => 90,
											'primary_sport' => 'Soccer',
											'primary_position' => 'Midfielder',
											'hand_leg_dominance' => 'Right',
											'previous_injuries' => 'none',
											'underlying_medical' => '',
											'notes' => '',
											]);

		$this->command->info('creating a movementSubmission');

		$newMovementSubmission = MovementSubmission::create(['coach_id' => $dummyCoach->id, 'athlete_id' => $dummyAthlete->id, 'comment' => 'needs improvement']);

		$this->command->info('creating a FMS From');

		$newFMSForm = FMSForm::create([
			'deepsquat' => 3,
			'deepsquatcomments' => '',
			'Lhurdle' => 3,
			'Rhurdle' => 3,
			'hurdlecomments' => '',
			'Llunge' => 3,
			'Rlunge' => 3,
			'lungecomments' => '',
			'Lshoulder' => 3,
			'Rshoulder' => 3,
			'shouldercomments' => '',
			'Limpingement' => 3,
			'Rimpingement' => 3,
			'impingementcomments' => '',
			'Lactive' => 3,
			'Ractive' => 3,
			'activecomments' => '',
			'trunk' => 3,
			'trunkcomments' => '',
			'press' => 3,
			'presscomments' => '',
			'Lrotary' => 3,
			'Rrotary' => 3,
			'rotarycomments' => '',
			'posterior' => 3,
			'posteriorcomments' => '',
			'totalscore' => 3,
		]);


		$this->command->info('creating a FMS FromSubmission');

		$newFMSFormSubmission = FMSFormSubmission::create(['coach_id' => $dummyCoach->id, 'athlete_id' => $dummyAthlete->id, 'fmsform_id' => $newFMSForm->id, 'comment' => 'not bad']);


		$this->command->info('creating movement 1');

		$movementPartOfFMS= Movement::create(['name' => 'Elbow Flex', 'sportmovement_id' => $sportmovement->id, 'movementsub_id' => null, 'fmsformsub_id' => $newFMSFormSubmission->id]);

		$frame1 = Frame::create(['movement_id' => $movementPartOfFMS->id]);

		$stretchContainer1 = StretchContainer::create(['frame_id' => $frame1->id]);

		$stretchJoint1a = StretchJoint::create(['curJointRotE1' => 34, 'curJointRotE2' => 43, 'curJointRotE3' => 66, 'stretch_container_id' => $stretchContainer1->id]);
		$this->command->info('stage1a');
		$stretchSensor1aa = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1a->id]);
		$stretchSensor1ab = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1a->id]);
		$stretchSensor1ac = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1a->id]);
		$stretchSensor1ad = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1a->id]);
		$stretchSensor1ae = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1a->id]);
		$this->command->info('stage1b');
		$stretchJoint1b = StretchJoint::create(['curJointRotE1' => 34, 'curJointRotE2' => 43, 'curJointRotE3' => 66, 'stretch_container_id' => $stretchContainer1->id]);
		$this->command->info('stage1c');
		$stretchSensor1ba = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1b->id]);
		$stretchSensor1bb = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1b->id]);
		$stretchSensor1bc = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1b->id]);
		$stretchSensor1bd = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1b->id]);
		$stretchSensor1be = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1b->id]);
		$this->command->info('stage1d');
		$stretchJoint1c = StretchJoint::create(['curJointRotE1' => 34, 'curJointRotE2' => 43, 'curJointRotE3' => 66, 'stretch_container_id' => $stretchContainer1->id]);
		$this->command->info('stage1e');
		$stretchSensor1ca = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1c->id]);
		$stretchSensor1cb = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1c->id]);
		$stretchSensor1cc = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1c->id]);
		$stretchSensor1cd = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1c->id]);
		$stretchSensor1ce = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1c->id]);

		$this->command->info('stage2');

		$NodContainer1 = NodContainer::create(['frame_id' => $frame1->id]);

		$nodJoint1a = NodJoint::create(['iInitRot1' => 34, 'iInitRot2' => 43, 'iInitRot3' => 66, 'iInitRot4' => 77, 'nod_container_id' => $NodContainer1->id]);

		$nodSensor1aa = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1a->id]);
		$nodSensor1ab = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1a->id]);
		$nodSensor1ac = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1a->id]);
		$nodSensor1ad = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1a->id]);
		$nodSensor1ae = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1a->id]);

		$nodJoint1b = NodJoint::create(['iInitRot1' => 34, 'iInitRot2' => 43, 'iInitRot3' => 66, 'iInitRot4' => 77, 'nod_container_id' => $NodContainer1->id]);

		$nodSensor1ba = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1b->id]);
		$nodSensor1bb = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1b->id]);
		$nodSensor1bc = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1b->id]);
		$nodSensor1bd = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1b->id]);
		$nodSensor1be = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1b->id]);

		$nodJoint1c = NodJoint::create(['iInitRot1' => 34, 'iInitRot2' => 43, 'iInitRot3' => 66, 'iInitRot4' => 77, 'nod_container_id' => $NodContainer1->id]);

		$nodSensor1ca = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1c->id]);
		$nodSensor1cb = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1c->id]);
		$nodSensor1cc = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1c->id]);
		$nodSensor1cd = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1c->id]);
		$nodSensor1ce = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1c->id]);

		//create a movement and attach it to a movementsubmission entry

		$this->command->info('creating movement 1');

		$movementPartOfMovementSub= Movement::create(['name' => 'Elbow Flex', 'sportmovement_id' => $sportmovement->id, 'movementsub_id' => $newMovementSubmission->id, 'fmsformsub_id' => null]);

		$frame1 = Frame::create(['movement_id' => $movementPartOfMovementSub->id]);

		$stretchContainer1 = StretchContainer::create(['frame_id' => $frame1->id]);

		$stretchJoint1a = StretchJoint::create(['curJointRotE1' => 34, 'curJointRotE2' => 43, 'curJointRotE3' => 66, 'stretch_container_id' => $stretchContainer1->id]);
		$this->command->info('stage1a');
		$stretchSensor1aa = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1a->id]);
		$stretchSensor1ab = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1a->id]);
		$stretchSensor1ac = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1a->id]);
		$stretchSensor1ad = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1a->id]);
		$stretchSensor1ae = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1a->id]);
		$this->command->info('stage1b');
		$stretchJoint1b = StretchJoint::create(['curJointRotE1' => 34, 'curJointRotE2' => 43, 'curJointRotE3' => 66, 'stretch_container_id' => $stretchContainer1->id]);
		$this->command->info('stage1c');
		$stretchSensor1ba = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1b->id]);
		$stretchSensor1bb = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1b->id]);
		$stretchSensor1bc = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1b->id]);
		$stretchSensor1bd = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1b->id]);
		$stretchSensor1be = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1b->id]);
		$this->command->info('stage1d');
		$stretchJoint1c = StretchJoint::create(['curJointRotE1' => 34, 'curJointRotE2' => 43, 'curJointRotE3' => 66, 'stretch_container_id' => $stretchContainer1->id]);
		$this->command->info('stage1e');
		$stretchSensor1ca = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1c->id]);
		$stretchSensor1cb = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1c->id]);
		$stretchSensor1cc = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1c->id]);
		$stretchSensor1cd = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1c->id]);
		$stretchSensor1ce = StretchSensor::create(['CSValue1' => 32, 'CSValue2' => 44, 'CSValue3' => 65, 'CSValue4' => 76, 'CSValue5' => 1, 'stretch_joint_id' => $stretchJoint1c->id]);

		$this->command->info('stage2');

		$NodContainer1 = NodContainer::create(['frame_id' => $frame1->id]);

		$nodJoint1a = NodJoint::create(['iInitRot1' => 34, 'iInitRot2' => 43, 'iInitRot3' => 66, 'iInitRot4' => 77, 'nod_container_id' => $NodContainer1->id]);

		$nodSensor1aa = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1a->id]);
		$nodSensor1ab = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1a->id]);
		$nodSensor1ac = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1a->id]);
		$nodSensor1ad = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1a->id]);
		$nodSensor1ae = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1a->id]);

		$nodJoint1b = NodJoint::create(['iInitRot1' => 34, 'iInitRot2' => 43, 'iInitRot3' => 66, 'iInitRot4' => 77, 'nod_container_id' => $NodContainer1->id]);

		$nodSensor1ba = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1b->id]);
		$nodSensor1bb = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1b->id]);
		$nodSensor1bc = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1b->id]);
		$nodSensor1bd = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1b->id]);
		$nodSensor1be = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1b->id]);

		$nodJoint1c = NodJoint::create(['iInitRot1' => 34, 'iInitRot2' => 43, 'iInitRot3' => 66, 'iInitRot4' => 77, 'nod_container_id' => $NodContainer1->id]);

		$nodSensor1ca = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1c->id]);
		$nodSensor1cb = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1c->id]);
		$nodSensor1cc = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1c->id]);
		$nodSensor1cd = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1c->id]);
		$nodSensor1ce = NodSensor::create(['InitRot1' => 34, 'InitRot2' => 34, 'InitRot3' => 34, 'InitRot4' => 34, 'CurRot1' => 34, 'CurRot2' => 34, 'CurRot3' => 34, 'CurRot4' => 34, 'CurRotEuler1' => 34, 'CurRotEuler2' => 34, 'CurRotEuler3' => 34, 'CurRotEuler4' => 34, 'nod_joint_id' => $nodJoint1c->id]);

	}

}
