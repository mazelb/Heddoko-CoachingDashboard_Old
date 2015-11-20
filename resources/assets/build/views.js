angular.module('app.views', ['dashboard.html', 'fmsresults.html', 'fmstest.html', 'header.html', 'movements.html', 'navigation.html', 'placeholder.html', 'settings.html', 'submit-movement-demo.html', 'directive-partials/ui-avatar.html', 'directive-partials/ui-editable-list-container.html', 'directive-partials/ui-editable-list-item.html', 'fms/demo/analysis.html', 'fms/demo/index.html', 'fms/demo/partials/analysis-coronal.html', 'fms/demo/partials/analysis-layout-emphasized.html', 'fms/demo/partials/analysis-sagittal.html', 'fms/demo/partials/analysis-transverse.html', 'fms/demo/partials/summary-content.html', 'fms/demo/partials/summary-layout.html', 'fms/demo/partials/summary-menu.html', 'fms/demo/partials/summary-movement-overview.html', 'fms/demo/partials/summary-overall-scores.html', 'fms/demo/partials/test-coronal.html', 'fms/demo/partials/test-layout-emphasized.html', 'fms/demo/partials/test-sagittal.html', 'fms/demo/partials/test-transverse.html', 'fms/demo/summary.html', 'fms/demo/test.html', 'fms/live/analysis.html', 'fms/live/index.html', 'fms/live/partials/analysis-menu.html', 'fms/live/partials/breadcrumbs.html', 'fms/live/partials/header.html', 'fms/live/partials/iterations.html', 'fms/live/partials/summary-legend.html', 'fms/live/partials/summary-menu.html', 'fms/live/partials/test-menu.html', 'fms/live/partials/test-trials.html', 'fms/live/summary.html', 'fms/live/test.html', 'group/create.html', 'group/edit.html', 'group/list.html', 'group/partials/details.html', 'group/partials/form.html', 'group/partials/upload-photo.html', 'group/view.html', 'partials/breadcrumbs.html', 'profile/create.html', 'profile/edit.html', 'profile/list.html', 'profile/partials/current-fms-plot.html', 'profile/partials/details.html', 'profile/partials/final-fms-plot.html', 'profile/partials/upload-photo.html', 'profile/view.html']);

angular.module("dashboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard.html",
    "<!-- Title -->\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "        <h1 class=\"text-center\">\n" +
    "            Welcome to your dashboard.\n" +
    "        </h1>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Main tasks -->\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-12 col-md-4 text-right\">\n" +
    "        <a ng-click=\"Rover.alert('In Development.')\" href=\"javascript:;\" class=\"btn btn-primary btn-metro text-center\">\n" +
    "            <span>\n" +
    "                Upload/Record <br>\n" +
    "                a Movement\n" +
    "            </span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-12 col-md-4 text-center\">\n" +
    "        <a ng-click=\"Rover.alert('In Development.')\" href=\"javascript:;\" class=\"btn btn-primary btn-metro text-center\">\n" +
    "            <span>\n" +
    "                Analyze <br>\n" +
    "                a Movement\n" +
    "            </span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-12 col-md-4 text-left\">\n" +
    "        <a ng-click=\"Rover.alert('In Development.')\" href=\"javascript:;\" class=\"btn btn-primary btn-metro text-center\">\n" +
    "            <span>\n" +
    "                Compare <br>\n" +
    "                Movements\n" +
    "            </span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Quick actions -->\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-sm-12 text-center\">\n" +
    "        <div class=\"btn-group\">\n" +
    "\n" +
    "            <!-- Profile list -->\n" +
    "            <a href=\"#/profile/list\" class=\"btn btn-default\">\n" +
    "                See my athletes\n" +
    "            </a>\n" +
    "\n" +
    "            <!-- Group list -->\n" +
    "            <a href=\"#/group/list\" class=\"btn btn-default\">\n" +
    "                See my teams\n" +
    "            </a>\n" +
    "\n" +
    "            <!-- Onboarding link -->\n" +
    "            <button ng-click=\"global.onboarding.general()\" class=\"btn btn-primary\">\n" +
    "                Show me around\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fmsresults.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fmsresults.html",
    "<header class=\"page-main-header\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h4>FMS Results</h4>\n" +
    "            <p ng-if=\"global.state.profile.selected\">\n" +
    "                View FMS results for\n" +
    "                <b>\n" +
    "                    {{ global.state.profile.selected.first_name }} {{ global.state.profile.selected.last_name }}\n" +
    "                </b>\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</header>\n" +
    "<div class=\"page page-dashboard\" data-ng-controller=\"FMSFormController\">\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-sm-6\">\n" +
    "			<div class=\"panel panel-default\">\n" +
    "				<div class=\"panel-body\">\n" +
    "					<div class=\"text-left col-sm-6\">\n" +
    "						<h3>\n" +
    "							Athlete's FMS Score History\n" +
    "						</h3>\n" +
    "					</div>\n" +
    "\n" +
    "					<div ng-show=\"global.state.profile.selected.id < 1\">\n" +
    "                        Select an athlete under 'Dashboard' in the sidebar before viewing historical FMS data\n" +
    "                    </div>\n" +
    "\n" +
    "					<div ng-hide=\"global.state.profile.selected.id < 1\" class=\"panel-body ng-scope\">\n" +
    "						<table class=\"table\">\n" +
    "							<thead>\n" +
    "								<tr>\n" +
    "									<th>#</th>\n" +
    "									<th>Date</th>\n" +
    "									<th>Final Score</th>\n" +
    "									<th>Suit no.</th>\n" +
    "									<th>Data</th>\n" +
    "								</tr>\n" +
    "							</thead>\n" +
    "							<tbody>\n" +
    "\n" +
    "								<tr\n" +
    "                                    ng-repeat=\"fmsform in global.state.profile.selected.fms_forms track by fmsform.id\"\n" +
    "                                    ng-click=\"fmsdisplay(fmsform)\">\n" +
    "\n" +
    "									<td>{{$index + 1}}</td>\n" +
    "									<td>{{fmsform.created_at}}</td>\n" +
    "									<td>\n" +
    "										{{fmsform.score}}\n" +
    "									</td>\n" +
    "									<td>1</td>\n" +
    "									<td><!--<span class=\"label label-warning\">Missing</span>--></td>\n" +
    "\n" +
    "\n" +
    "								</tr>\n" +
    "\n" +
    "							</tbody>\n" +
    "						</table>\n" +
    "					</div>\n" +
    "					<div ng-show=\"global.state.profile.selected.fms_forms.length == 0\">0 FMS Forms found</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"col-sm-6\">\n" +
    "			<div class=\"panel panel-default\">\n" +
    "				<div class=\"panel-body\">\n" +
    "					<div class=\"text-left col-sm-6\">\n" +
    "						<h3>\n" +
    "							FMS Details\n" +
    "						</h3>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"panel-body ng-scope\" ng-show=\"data.selected_fms_form == null\">\n" +
    "						select an FMS form on the left to view details\n" +
    "					</div>\n" +
    "\n" +
    "					<label ng-hide=\"data.selected_fms_form == null\" class=\"switch switch-info pull-right\">\n" +
    "                        <input type=\"checkbox\" ng-model=\"data.show_fms_edit\" class=\"ng-untouched ng-valid ng-dirty ng-valid-parse\"><i></i>\n" +
    "                    </label>\n" +
    "\n" +
    "					<div class=\"panel-body ng-scope\" ng-show=\"data.selected_fms_form != null\">\n" +
    "\n" +
    "						</br></br></br>\n" +
    "						<form class=\"form-horizontal ng-pristine ng-valid\">\n" +
    "							<fieldset ng-disabled=\"!data.show_fms_edit\">\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Deep squat</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.deepsquat\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.deepsquat\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.deepsquat\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.deepsquat\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-4\">\n" +
    "											<input type=\"text\" class=\"form-control\" ng-model=\"data.selected_fms_form.deepsquatcomments\">\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Hurdle step L</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Lhurdle\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Lhurdle\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Lhurdle\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Lhurdle\"><span>3</span></label>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Hurdle step R</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Rhurdle\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Rhurdle\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Rhurdle\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Rhurdle\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-4\">\n" +
    "											<input type=\"text\" class=\"form-control\" ng-model=\"data.selected_fms_form.hurdlecomments\">\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Inline lunge step L</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Llunge\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Llunge\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Llunge\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Llunge\"><span>3</span></label>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Inline lunge step R</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Rlunge\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Rlunge\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Rlunge\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Rlunge\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-4\">\n" +
    "											<input type=\"text\" class=\"form-control\" ng-model=\"data.selected_fms_form.lungecomments\">\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Shoulder Mobility L</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Lshoulder\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Lshoulder\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Lshoulder\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Lshoulder\"><span>3</span></label>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Shoulder Mobility R</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Rshoulder\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Rshoulder\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Rshoulder\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Rshoulder\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-4\">\n" +
    "											<input type=\"text\" class=\"form-control\" ng-model=\"data.selected_fms_form.shouldercomments\">\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Impingement clearing test L</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Limpingement\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Limpingement\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Limpingement\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Limpingement\"><span>3</span></label>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Impingement clearing test R</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Rimpingement\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Rimpingement\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Rimpingement\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Rimpingement\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-4\">\n" +
    "											<input type=\"text\" class=\"form-control\" ng-model=\"data.selected_fms_form.impingementcomments\">\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Active straight-leg raise L</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Lactive\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Lactive\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Lactive\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Lactive\"><span>3</span></label>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Active straight-leg raise R</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Ractive\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Ractive\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Ractive\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Ractive\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-4\">\n" +
    "											<input type=\"text\" class=\"form-control\" ng-model=\"data.selected_fms_form.activecomments\">\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Trunk stability pushup</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.trunk\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.trunk\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.trunk\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.trunk\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-4\">\n" +
    "											<input type=\"text\" class=\"form-control\" ng-model=\"data.selected_fms_form.trunkcomments\">\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Press-up clearing test</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.press\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.press\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.press\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.press\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-4\">\n" +
    "											<input type=\"text\" class=\"form-control\" ng-model=\"data.selected_fms_form.presscomments\">\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Rotary stability L</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Lrotary\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Lrotary\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Lrotary\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Lrotary\"><span>3</span></label>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Rotary stability R</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.Rrotary\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.Rrotary\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.Rrotary\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.Rrotary\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-4\">\n" +
    "											<input type=\"text\" class=\"form-control\" ng-model=\"data.selected_fms_form.rotarycomments\">\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"form-group\">\n" +
    "									<label for=\"\" class=\"col-sm-2\">Posterior rocking clearing test</label>\n" +
    "									<div class=\"col-sm-6\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.selected_fms_form.posterior\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.selected_fms_form.posterior\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.selected_fms_form.posterior\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.selected_fms_form.posterior\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-4\">\n" +
    "											<input type=\"text\" class=\"form-control\" ng-model=\"data.selected_fms_form.posteriorcomments\">\n" +
    "									</div>\n" +
    "								</div>\n" +
    "							</fieldset>\n" +
    "\n" +
    "            </form>\n" +
    "\n" +
    "						<div ng-hide=\"!data.show_fms_edit\">\n" +
    "							<button type=\"button\" class=\"btn btn-info btn-sm disabled\" ng-click=\"updateFMS();\">Update this FMS Form</button>\n" +
    "						</div>\n" +
    "\n" +
    "\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("fmstest.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fmstest.html",
    "<header class=\"page-main-header\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h4>Submit FMS Results</h4>\n" +
    "            <p ng-if=\"data.member.selected\">\n" +
    "                Submit FMS results for\n" +
    "                <b>\n" +
    "                    {{ global.state.profile.selected.first_name }} {{ global.state.profile.selected.last_name }}\n" +
    "                </b>\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</header>\n" +
    "\n" +
    "<div class=\"page page-dashboard\" data-ng-controller=\"FMSFormController\">\n" +
    "\n" +
    "	<section>\n" +
    "		<div class=\"row\">\n" +
    "\n" +
    "			<div class=\"col-sm-12\" ng-hide=\"waiting_server_response\">\n" +
    "				<div class=\"panel panel-default\">\n" +
    "					<div class=\"panel-body\">\n" +
    "						<div class=\"text-left col-sm-6\">\n" +
    "							<h3>\n" +
    "								Add FMS Test Scores\n" +
    "							</h3>\n" +
    "						</div>\n" +
    "\n" +
    "						<div class=\"panel-body col-sm-12 ng-scope\">\n" +
    "							<form ng-submit=\"submitFMSForm()\" ng-hide=\"data.member.selected.id < 1\">\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Deep Squat\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.deepsquat\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.deepsquat\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.deepsquat\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.deepsquat\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.deepsquatcomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.ds == null, 'btn-success': files.ds != null}\">\n" +
    "                                            Select Movement File <input type=\"file\" file-model=\"files.ds\">\n" +
    "                                        </span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Hurdle step (L)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.Lhurdle\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.Lhurdle\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.Lhurdle\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.Lhurdle\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "                                        <input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Lhurdlecomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.hsl == null, 'btn-success': files.hsl != null}\">\n" +
    "                                            Select Movement File <input type=\"file\" file-model=\"files.hsl\">\n" +
    "                                        </span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Hurdle step (R)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.Rhurdle\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.Rhurdle\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.Rhurdle\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.Rhurdle\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Rhurdlecomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.hsr == null, 'btn-success': files.hsr != null}\">\n" +
    "                                            Select Movement File <input type=\"file\" file-model=\"files.hsr\">\n" +
    "                                        </span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Inline lunge (L)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.Llunge\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.Llunge\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.Llunge\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.Llunge\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "                                        <input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Llungecomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.ill == null, 'btn-success': files.ill != null}\">\n" +
    "                                            Select Movement File <input type=\"file\" file-model=\"files.ill\">\n" +
    "                                        </span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Inline lunge (R)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.Rlunge\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.Rlunge\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.Rlunge\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.Rlunge\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Rlungecomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.ilr == null, 'btn-success': files.ilr != null}\">\n" +
    "                                            Select Movement File <input type=\"file\" file-model=\"files.ilr\">\n" +
    "                                        </span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Shoulder Mobility (L)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.Lshoulder\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.Lshoulder\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.Lshoulder\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.Lshoulder\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "                                        <input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Lshouldercomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.sml == null, 'btn-success': files.sml != null}\">\n" +
    "    Select Movement File <input type=\"file\" file-model=\"files.sml\">\n" +
    "</span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Shoulder Mobility (R)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.Rshoulder\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.Rshoulder\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.Rshoulder\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.Rshoulder\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Rshouldercomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.smr == null, 'btn-success': files.smr != null}\">\n" +
    "    Select Movement File <input type=\"file\" file-model=\"files.smr\">\n" +
    "</span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Impingement clearing test (L)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-checkbox\"><input ng-model=\"data.fms_form_data.Limpingement\" type=\"checkbox\"><span>pain</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "                                        <input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Limpingementcomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.ictl == null, 'btn-success': files.ictl != null}\">\n" +
    "    Select Movement File <input type=\"file\" file-model=\"files.ictl\">\n" +
    "</span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Impingement clearing test (R)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-checkbox\"><input ng-model=\"data.fms_form_data.Rimpingement\" type=\"checkbox\"><span>pain</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.impingementcomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.ictr == null, 'btn-success': files.ictr != null}\">\n" +
    "    Select Movement File <input type=\"file\" file-model=\"files.ictr\">\n" +
    "</span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Active straight-leg raise (L)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.Lactive\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.Lactive\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.Lactive\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.Lactive\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "                                        <input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Lactivecomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.aslrl == null, 'btn-success': files.aslrl != null}\">\n" +
    "    Select Movement File <input type=\"file\" file-model=\"files.aslrl\">\n" +
    "</span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Active straight-leg raise (R)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.Ractive\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.Ractive\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.Ractive\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.Ractive\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Ractivecomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.aslrr == null, 'btn-success': files.aslrr != null}\">\n" +
    "                                            Select Movement File <input type=\"file\" file-model=\"files.aslrr\">\n" +
    "                                        </span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Trunk stability push-up\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.trunk\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.trunk\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.trunk\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.trunk\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.trunkcomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.tspu == null, 'btn-success': files.tspu != null}\">\n" +
    "                                            Select Movement File <input type=\"file\" file-model=\"files.tspu\">\n" +
    "                                        </span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Press-up clearing test\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-checkbox\"><input ng-model=\"data.fms_form_data.press\" type=\"checkbox\"><span>pain</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.presscomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.puct == null, 'btn-success': files.puct != null}\">\n" +
    "                                            Select Movement File <input type=\"file\" file-model=\"files.puct\">\n" +
    "                                        </span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Rotary stability (L)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.Lrotary\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.Lrotary\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.Lrotary\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.Lrotary\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "                                        <input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Lrotarycomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.rsl == null, 'btn-success': files.rsl != null}\">\n" +
    "                                            Select Movement File <input type=\"file\" file-model=\"files.rsl\">\n" +
    "                                        </span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Rotary stability (R)\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"0\" ng-model=\"data.fms_form_data.Rrotary\"><span>0</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"1\" ng-model=\"data.fms_form_data.Rrotary\"><span>1</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"2\" ng-model=\"data.fms_form_data.Rrotary\"><span>2</span></label>\n" +
    "										<label class=\"ui-radio\"><input type=\"radio\" value=\"3\" ng-model=\"data.fms_form_data.Rrotary\"><span>3</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.Rrotarycomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.rsr == null, 'btn-success': files.rsr != null}\">\n" +
    "    Select Movement File <input type=\"file\" file-model=\"files.rsr\">\n" +
    "</span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										Posterior rocking clearing test\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<label class=\"ui-checkbox\"><input ng-model=\"data.fms_form_data.posterior\" type=\"checkbox\"><span>pain</span></label>\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<input placeholder=\"Comments\" type=\"text\" ng-model=\"data.fms_form_data.posteriorcomments\">\n" +
    "									</div>\n" +
    "									<div class=\"col-sm-3\">\n" +
    "										<span ng-class=\"{btn: true, 'btn-file': true, 'btn-default': files.prct == null, 'btn-success': files.prct != null}\">\n" +
    "                                            Select Movement File <input type=\"file\" file-model=\"files.prct\">\n" +
    "                                        </span>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "								<div class=\"row\">\n" +
    "									<div class=\"col-sm-12\">\n" +
    "										<h3>Other Comments</h3>\n" +
    "										<textarea name=\"\" id=\"\" class=\"form-control\" ng-model=\"data.fms_form_data.comment\"></textarea>\n" +
    "										<br>\n" +
    "\n" +
    "										<div class=\"text-center\">\n" +
    "											<button type=\"submit\" class=\"btn btn-primary\">Submit Results and Movement Files</button>\n" +
    "										</div>\n" +
    "									</div>\n" +
    "								</div>\n" +
    "							</form>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</section>\n" +
    "</div>\n" +
    "");
}]);

angular.module("header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.html",
    "<header class=\"clearfix\">\n" +
    "	<div class=\"top-nav\">\n" +
    "		<ul class=\"nav-left list-unstyled\">\n" +
    "\n" +
    "            <!-- Menu button (shows up in mobile views) -->\n" +
    "			<li>\n" +
    "				<div class=\"menu-button\" toggle-off-canvas>\n" +
    "					<span class=\"icon-bar\"></span>\n" +
    "					<span class=\"icon-bar\"></span>\n" +
    "					<span class=\"icon-bar\"></span>\n" +
    "				</div>\n" +
    "			</li>\n" +
    "\n" +
    "            <!-- Menu button (shows up on desktop views) -->\n" +
    "			<!-- <li>\n" +
    "				<a href=\"#/\" data-toggle-min-nav class=\"toggle-min\">\n" +
    "                    <i class=\"fa fa-bars\"></i>\n" +
    "                </a>\n" +
    "			</li> -->\n" +
    "\n" +
    "            <!-- Spacer, to account for space lost by removing menu button -->\n" +
    "            <li style=\"display: block; width: 20px; height: 1px;\"></li>\n" +
    "\n" +
    "            <!-- Group dropdown -->\n" +
    "			<li\n" +
    "                ng-hide=\"global.state.group.list.length === 0\"\n" +
    "                class=\"onboarding-general\"\n" +
    "                data-step=\"2\"\n" +
    "                data-intro=\"Here is where you can find the groups you manage. The black arrow is a shortcut to view\n" +
    "                            the <strong>{{ global.state.group.selected.name }}</strong>'s details.\">\n" +
    "\n" +
    "                <div class=\"btn-group\">\n" +
    "\n" +
    "                    <!-- Face of dropdown -->\n" +
    "                    <button\n" +
    "                        type=\"button\"\n" +
    "                        class=\"btn btn-default dropdown-toggle\"\n" +
    "                        data-toggle=\"dropdown\"\n" +
    "                        aria-haspopup=\"true\"\n" +
    "                        aria-expanded=\"false\">\n" +
    "\n" +
    "                        {{ global.state.group.selected.name }}\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                    </button>\n" +
    "\n" +
    "                    <!-- Contents of dropdown -->\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li ng-repeat=\"group in global.state.group.list\">\n" +
    "                            <a href=\"javascript:;\" ng-click=\"global.state.group.selected = group\">\n" +
    "                                {{ group.name }}\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "\n" +
    "                    <!-- Link to group page -->\n" +
    "                    <button\n" +
    "                        ng-click=\"Rover.browseTo.group(global.state.group.selected)\"\n" +
    "                        type=\"button\"\n" +
    "                        class=\"btn btn-info\"\n" +
    "                        data-toggle=\"tooltip\"\n" +
    "                        data-placement=\"bottom\"\n" +
    "                        title=\"{{ global.state.group.selected.name }}'s page.\">\n" +
    "\n" +
    "                        <i class=\"fa fa-angle-double-right\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "\n" +
    "            <!-- Profile dropdown -->\n" +
    "			<li\n" +
    "                class=\"onboarding-general\"\n" +
    "                data-step=\"3\"\n" +
    "                data-intro=\"Here is where you can find the profiles you manage. If a group is selected, the\n" +
    "                            profiles listed will be restricted to that group. The black arrow is a\n" +
    "                            shortcut to view <strong>{{ global.state.profile.selected.first_name }}\n" +
    "                            </strong>'s details.\">\n" +
    "\n" +
    "                <div class=\"btn-group\">\n" +
    "\n" +
    "                    <!-- Face of dropdown -->\n" +
    "                    <button\n" +
    "                        ng-hide=\"global.state.profile.list.length === 0\"\n" +
    "                        type=\"button\"\n" +
    "                        class=\"btn btn-default dropdown-toggle\"\n" +
    "                        data-toggle=\"dropdown\"\n" +
    "                        aria-haspopup=\"true\"\n" +
    "                        aria-expanded=\"false\">\n" +
    "\n" +
    "                        {{ global.state.profile.selected.first_name +' '+ global.state.profile.selected.last_name }}\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                    </button>\n" +
    "\n" +
    "                    <!-- Contents of dropdown -->\n" +
    "                    <ul\n" +
    "                        ng-hide=\"global.state.profile.list.length === 0\"\n" +
    "                        class=\"dropdown-menu\">\n" +
    "\n" +
    "                        <li ng-repeat=\"profile in global.state.profile.list\">\n" +
    "                            <a href=\"javascript:;\" ng-click=\"global.state.profile.selected = profile\">\n" +
    "                                {{ profile.first_name +' '+ profile.last_name }}\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "\n" +
    "                    <!-- Link to profile page -->\n" +
    "                    <button\n" +
    "                        ng-hide=\"global.state.profile.list.length === 0\"\n" +
    "                        ng-click=\"Rover.browseTo.profile(global.state.profile.selected)\"\n" +
    "                        type=\"button\"\n" +
    "                        class=\"btn btn-info\"\n" +
    "                        data-toggle=\"tooltip\"\n" +
    "                        data-placement=\"bottom\"\n" +
    "                        title=\"{{ global.state.profile.selected.first_name }}'s page.\">\n" +
    "\n" +
    "                        <i class=\"fa fa-angle-double-right\"></i>\n" +
    "                    </button>\n" +
    "\n" +
    "                    <!-- Create new profile button -->\n" +
    "                    <button\n" +
    "                        ng-show=\"global.state.profile.list.length === 0\"\n" +
    "                        ng-click=\"Rover.browseTo.path('/profile/create')\"\n" +
    "                        type=\"button\"\n" +
    "                        class=\"btn btn-default\">\n" +
    "\n" +
    "                        Create profile\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "			</li>\n" +
    "\n" +
    "            <li ng-show=\"global.isLocal\">\n" +
    "                <div class=\"btn-group\">\n" +
    "\n" +
    "                    <!-- Face of dropdown -->\n" +
    "                    <button\n" +
    "                        type=\"button\"\n" +
    "                        class=\"btn btn-default dropdown-toggle\"\n" +
    "                        data-toggle=\"dropdown\"\n" +
    "                        aria-haspopup=\"true\"\n" +
    "                        aria-expanded=\"false\">\n" +
    "\n" +
    "                        Dev\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                    </button>\n" +
    "\n" +
    "                    <!-- Contents of dropdown -->\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li>\n" +
    "                            <a href=\"javascript:;\">\n" +
    "                                Total groups: {{ global.state.group.list.length }} /\n" +
    "                                Selected: {{ global.state.group.selected.name || 'None' }}\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <a href=\"javascript:;\">\n" +
    "                                Total profiles: {{ global.state.profile.list.length }} /\n" +
    "                                Selected: {{ global.state.profile.selected.first_name || 'None' }}\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "		</ul>\n" +
    "\n" +
    "        <!-- Other shortcuts (pulled to right) -->\n" +
    "		<ul class=\"nav-right-button list-unstyled pull-right\">\n" +
    "            <div class=\"btn-group\">\n" +
    "\n" +
    "                <!-- Settings -->\n" +
    "                <button\n" +
    "                    ng-click=\"Rover.browseTo.config()\"\n" +
    "                    class=\"btn btn-default onboarding-general\"\n" +
    "                    data-step=\"4\"\n" +
    "                    data-intro=\"Click this button to edit your settings\">\n" +
    "\n" +
    "                    <i class=\"fa fa-cog fa-fw\"></i>\n" +
    "                </button>\n" +
    "\n" +
    "                <!-- Onboarding -->\n" +
    "                <button\n" +
    "                    ng-click=\"global.onboarding.general()\"\n" +
    "                    type=\"button\"\n" +
    "                    class=\"btn btn-default onboarding-general\"\n" +
    "                    data-step=\"6\"\n" +
    "                    data-intro=\"Click here whenever you want to see this again\">\n" +
    "\n" +
    "                    <i class=\"fa fa-question fa-fw\"></i>\n" +
    "                </button>\n" +
    "\n" +
    "                <!-- Sign out -->\n" +
    "                <button\n" +
    "                    ng-click=\"Rover.endSession()\"\n" +
    "                    type=\"button\"\n" +
    "                    class=\"btn btn-logout onboarding-general\"\n" +
    "                    data-toggle=\"tooltip\"\n" +
    "                    data-placement=\"bottom\"\n" +
    "                    data-step=\"5\"\n" +
    "                    data-intro=\"Use this button when you're ready to log out\"\n" +
    "                    title=\"Logout\">\n" +
    "\n" +
    "                    <i class=\"fa fa-sign-out fa-fw\"></i>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "</header>\n" +
    "");
}]);

angular.module("movements.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("movements.html",
    "<header class=\"page-main-header\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h4>Movement Screen</h4>\n" +
    "            <p>Start your tests</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</header>\n" +
    "\n" +
    "<div class=\"page page-dashboard movement-pages\" ng-controller=\"MovementScreenController\">\n" +
    "	<div>\n" +
    "		<ol class=\"breadcrumb-movement\">\n" +
    "\n" +
    "            <!-- Movement title -->\n" +
    "			<li>\n" +
    "				<div style=\"text-align:center;\">\n" +
    "					<a>{{ data.current_movement_page.name || \"Choose a movement\" }}</a>\n" +
    "				</div>\n" +
    "			</li>\n" +
    "\n" +
    "            <!-- Movement tabs -->\n" +
    "			<li\n" +
    "                ng-click=\"data.current_movement_page.latest_page = 0\"\n" +
    "                ng-class=\"{'active':data.current_movement_page.latest_page == 0}\">\n" +
    "\n" +
    "                <a>TEST</a>\n" +
    "            </li>\n" +
    "			<li\n" +
    "                ng-click=\"data.current_movement_page.latest_page = 1\"\n" +
    "                ng-class=\"{'active':data.current_movement_page.latest_page == 1}\">\n" +
    "                <a>ANALYSIS</a>\n" +
    "            </li>\n" +
    "			<!-- <li ng-click=\"data.current_movement_page.latest_page = 2\" ng-class=\"{'active':data.current_movement_page.latest_page == 2}\">\n" +
    "                <a>DATA</a>\n" +
    "            </li> -->\n" +
    "			<li\n" +
    "                ng-click=\"data.current_movement_page.latest_page = 3\"\n" +
    "                ng-class=\"{'active':data.current_movement_page.latest_page == 3}\">\n" +
    "\n" +
    "                <a>SUMMARY</a>\n" +
    "            </li>\n" +
    "		</ol>\n" +
    "\n" +
    "        <!-- Selected side -->\n" +
    "		<ol class=\"breadcrumb-movement-sm\" ng-show=\"true\"> <!-- ng-show=\"data.current_movement.left_and_right == true\" -->\n" +
    "			<li\n" +
    "                ng-repeat=\"side in data.current_movement_page.sides\"\n" +
    "                ng-click=\"data.current_movement_page.active_side = side\"\n" +
    "                ng-class=\"{'active': side == data.current_movement_page.active_side}\">\n" +
    "\n" +
    "                <a >{{side.name}}</a>\n" +
    "            </li>\n" +
    "		</ol>\n" +
    "\n" +
    "		<div ng-switch=\"data.current_movement_page.latest_page\">\n" +
    "			<div ng-switch-when=\"0\">\n" +
    "				<div ng-include=\"'movement-partials/0test.html?' + Date.now()\"></div>\n" +
    "			</div>\n" +
    "			<div ng-switch-when=\"1\">\n" +
    "				<div ng-include=\"'movement-partials/1analysis.html?' + Date.now()\"></div>\n" +
    "			</div>\n" +
    "			<div ng-switch-when=\"2\">\n" +
    "				<div ng-include=\"'movement-partials/2data.html?' + Date.now()\"></div>\n" +
    "			</div>\n" +
    "			<div ng-switch-when=\"3\">\n" +
    "				<div ng-include=\"'movement-partials/3summary.html?' + Date.now()\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("navigation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("navigation.html",
    "<div class=\"logo\">\n" +
    "    <div class=\"logo-container\">\n" +
    "        <img src=\"../../images/logo/heddoko_logo_1.svg\" alt=\"Heddoko\" class=\"logo1\">\n" +
    "        <img src=\"../../images/logo/heddoko_logo_2.svg\" alt=\"Heddoko\" class=\"logo2\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"nav-wrapper\">\n" +
    "    <ul id=\"nav\" data-slim-scroll data-collapse-nav data-highlight-active>\n" +
    "\n" +
    "        <!-- Landing page -->\n" +
    "        <li\n" +
    "            class=\"onboarding-general\"\n" +
    "            data-step=\"1\"\n" +
    "            data-intro=\"This is a shortcut to your dashboard.\"\n" +
    "            data-position=\"right\">\n" +
    "            <a href=\"#/dashboard\"><span>dashboard</span></a>\n" +
    "        </li>\n" +
    "\n" +
    "        <!-- List of groups -->\n" +
    "		<li>\n" +
    "            <a href=\"#/group/list\"><span>teams</span></a>\n" +
    "        </li>\n" +
    "\n" +
    "        <!-- Submit movement data form -->\n" +
    "		<li>\n" +
    "            <a href=\"#/submit-movement\"><span>submit movement data</span></a>\n" +
    "        </li>\n" +
    "\n" +
    "        <!-- Submit FMS test form -->\n" +
    "		<li>\n" +
    "            <a href=\"#/fmstest\"><span>submit fms test results</span></a>\n" +
    "        </li>\n" +
    "\n" +
    "        <!-- FMS results page -->\n" +
    "		<li>\n" +
    "            <a href=\"#/fmsresults\"><span>fms results</span></a>\n" +
    "		</li>\n" +
    "\n" +
    "        <!-- Live FMS pages. -->\n" +
    "        <li>\n" +
    "            <!-- TODO: Call this Live FMS? -->\n" +
    "            <a href=\"#/fms/live\">Movement Screen</a>\n" +
    "\n" +
    "            <!-- TODO: Use ng-repeat when ready -->\n" +
    "            <ul style=\"display: block\">\n" +
    "                <li>\n" +
    "                    <a href=\"#/fms/live/ds\"><span>Deep Squat</span></a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/fms/live/hs\"><span>Hurdle Step</span></a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/fms/live/il\"><span>Inline Lunge</span></a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/fms/live/sm\"><span>Shoulder Mobility</span></a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/fms/live/sm\"><span>Impingement (C. Test)</span></a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/fms/demo/aslr\"><span>Active Straight-Leg Raise</span></a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/fms/live/tspu\"><span>Trunk Stability Push-Up</span></a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/fms/live/pu\"><span>Press-Up (C. Test)</span></a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/fms/live/rs\"><span>Rotary Stability</span></a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/fms/live/ps\"><span>Posterior Rocking (C. Test)</span></a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "\n" +
    "        <li style=\"margin: 10px 0 0; text-align: center; font-size: 0.8em;\">\n" +
    "            {{ global.appVersion }}\n" +
    "		</li>\n" +
    "\n" +
    "		<!-- <li ng-controller=\"MovementScreenController\" ng-show=\"Rover.isLocal == true\">\n" +
    "            <a href=\"#/movements\"><span>movement screen</span></a>\n" +
    "			<ul style=\"display: block;\">\n" +
    "                <li ng-repeat=\"movement_page in data.movement_pages\">\n" +
    "					<a\n" +
    "                        href=\"#/movements\"\n" +
    "                        ng-click=\"select_movement(movement_page)\">\n" +
    "\n" +
    "                        <i ng-if=\"movement_page.submitted\" class=\"fa fa-2x fa-check\" style=\"color:white;\"></i>\n" +
    "                        <span>{{movement_page.name}}</span>\n" +
    "                    </a>\n" +
    "				</li>\n" +
    "            </ul>\n" +
    "        </li> -->\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("placeholder.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("placeholder.html",
    "<!-- Temporary page -->\n" +
    "<div class=\"col-sm-12\">\n" +
    "    <h1 style=\"text-align: center; color: #ccc;\">\n" +
    "        In Development\n" +
    "    </h1>\n" +
    "</div>\n" +
    "");
}]);

angular.module("settings.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("settings.html",
    "<header class=\"page-main-header\">\n" +
    "    <div ng-include=\" 'placeholder.html' \"></div>\n" +
    "</header>\n" +
    "");
}]);

angular.module("submit-movement-demo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("submit-movement-demo.html",
    "<header class=\"page-main-header\">\n" +
    "    <div class=\"row\">\n" +
    "		<div class=\"col-sm-6\">\n" +
    "			<h4>Movement Data</h4>\n" +
    "            <p ng-if=\"data.member.selected\">\n" +
    "                Submit movement data for\n" +
    "                <b>\n" +
    "                    {{ data.member.selected.first_name }} {{ data.member.selected.last_name }}\n" +
    "                </b>\n" +
    "            </p>\n" +
    "		</div>\n" +
    "    </div>\n" +
    "</header>\n" +
    "\n" +
    "<div class=\"page page-dashboard\">\n" +
    "\n" +
    "    <!-- Select a sport -->\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    1. Choose a sport.\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"btn-group\">\n" +
    "                        <button\n" +
    "                            type=\"button\"\n" +
    "                            class=\"btn btn-default dropdown-toggle\"\n" +
    "                            data-toggle=\"dropdown\"\n" +
    "                            aria-haspopup=\"true\"\n" +
    "                            aria-expanded=\"false\">\n" +
    "\n" +
    "                            {{ sports.selected.name }}\n" +
    "                            <span class=\"caret\"></span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <ul class=\"dropdown-menu\">\n" +
    "                            <li ng-repeat=\"sport in sports.list\">\n" +
    "                                <a href=\"javascript:;\" ng-click=\"sports.selected = sport\">\n" +
    "                                    {{ sport.name }}\n" +
    "                                </a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Select a movement -->\n" +
    "    <div class=\"row\" ng-hide=\"sports.selected == sports.default\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    2. Select a movement.\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <a\n" +
    "                        href=\"javascript:;\"\n" +
    "                        class=\"btn btn-primary btn-metro\"\n" +
    "                        ng-repeat=\"movement in movements.list\"\n" +
    "                        ng-click=\"movements.selected = movement;\">\n" +
    "                        <span>{{ movement.name }}</span>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Submit data -->\n" +
    "    <div class=\"row\" ng-hide=\"movements.selected == movements.default\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    3. Submit data.\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "\n" +
    "                    <div class=\"row\">\n" +
    "\n" +
    "                        <!-- Summary of data -->\n" +
    "                        <div class=\"col-md-6\">\n" +
    "                            <h3>Summary</h3>\n" +
    "\n" +
    "                            <!-- Name -->\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-sm-4 text-right\">\n" +
    "                                    Athlete\n" +
    "                                </div>\n" +
    "                                <div class=\"col-sm-8\">\n" +
    "                                    <b>{{data.member.selected.first_name}} {{data.member.selected.last_name}}</b>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <!-- Sport -->\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-sm-4 text-right\">\n" +
    "                                    Sport\n" +
    "                                </div>\n" +
    "                                <div class=\"col-sm-8\">\n" +
    "                                    <b>{{sports.selected.name}}</b>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <!-- Movement -->\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-sm-4 text-right\">\n" +
    "                                    Movement\n" +
    "                                </div>\n" +
    "                                <div class=\"col-sm-8\">\n" +
    "                                    <b>{{ movements.selected.name }}</b>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <!-- Suit -->\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-sm-4 text-right\">\n" +
    "                                    Suit No.\n" +
    "                                </div>\n" +
    "                                <div class=\"col-sm-8\">\n" +
    "                                    <b></b>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <!-- Date -->\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-sm-4 text-right\">\n" +
    "                                    Date\n" +
    "                                </div>\n" +
    "                                <div class=\"col-sm-8\">\n" +
    "                                    <b></b>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Form -->\n" +
    "                        <div class=\"col-md-6\">\n" +
    "                            <form accept-charset=\"UTF-8\">\n" +
    "\n" +
    "                                <!-- Upload button -->\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-3\">\n" +
    "                                        <input\n" +
    "                                            type=\"button\"\n" +
    "                                            ng-click=\"Rover.alert('Demo')\"\n" +
    "                                            class=\"btn btn-default\"\n" +
    "                                            value=\"Select a file\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-9\">\n" +
    "                                        (none selected)\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "                                <!-- Comments -->\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-sm-12\">\n" +
    "                                        <textarea class=\"form-control\" placeholder=\"Comments\"></textarea>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <br>\n" +
    "\n" +
    "                                <!-- Submit -->\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-sm-12 text-center\">\n" +
    "                                        <input\n" +
    "                                            type=\"submit\"\n" +
    "                                            ng-click=\"Rover.alert('Demo')\"\n" +
    "                                            class=\"btn btn-primary\"\n" +
    "                                            value=\"Submit\">\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </form>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive-partials/ui-avatar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-avatar.html",
    "<div style=\"position: relative;\">\n" +
    "\n" +
    "    <!-- Upload button -->\n" +
    "    <button\n" +
    "        ngf-select=\"upload($file)\"\n" +
    "        ngf-drop\n" +
    "        accept=\"image/*\"\n" +
    "        ngf-pattern=\"'image/*'\"\n" +
    "        ngf-capture=\"'camera'\"\n" +
    "        ngf-min-height=\"100\"\n" +
    "        ngf-max-size=\"2MB\"\n" +
    "        class=\"btn btn-default\"\n" +
    "        style=\"padding: 0;\">\n" +
    "\n" +
    "        <!-- Avatar -->\n" +
    "        <img\n" +
    "            ng-show=\"avatarSrc && !isUploading\"\n" +
    "            src=\"{{ avatarSrc }}\"\n" +
    "            style=\"width: 100%\">\n" +
    "\n" +
    "        <!-- Avatar placeholder -->\n" +
    "        <i\n" +
    "            ng-hide=\"avatarSrc || isUploading\"\n" +
    "            class=\"fa fa-user\"\n" +
    "            style=\"padding: 30px 40px; font-size: 5em;\"></i>\n" +
    "\n" +
    "        <!-- Uploading notifier -->\n" +
    "        <i\n" +
    "            ng-show=\"isUploading\"\n" +
    "            class=\"fa fa-spin fa-spinner\"\n" +
    "            style=\"padding: 30px 40px; font-size: 5em;\"></i>\n" +
    "    </button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive-partials/ui-editable-list-container.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-editable-list-container.html",
    "<div class=\"panel panel-default ui-editable-list-container\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        {{ heading }}\n" +
    "\n" +
    "        <!-- Action buttons -->\n" +
    "        <div class=\"pull-right\">\n" +
    "            <span ng-click=\"save()\" ng-show=\"state == 'editing'\">\n" +
    "                Save &nbsp; <i class=\"fa fa-toggle-on\"></i>\n" +
    "            </span>\n" +
    "            <span ng-click=\"edit()\" ng-show=\"state == 'idle'\">\n" +
    "                Edit &nbsp; <i class=\"fa fa-toggle-off\"></i>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        <div class=\"row\" ng-switch=\"state\">\n" +
    "\n" +
    "            <!-- Working animation -->\n" +
    "            <div ng-switch-when=\"saving\" class=\"text-center\" style=\"padding: 20px 0;\">\n" +
    "                <i class=\"fa fa-spin fa-4x fa-spinner\"></i>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Model fields -->\n" +
    "            <div ng-switch-default ng-transclude class=\"col-sm-12\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive-partials/ui-editable-list-item.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-editable-list-item.html",
    "<div class=\"row ui-editable-list-item\">\n" +
    "    <div class=\"col-sm-4 text-right\">\n" +
    "        {{ label }} <span ng-show=\"isRequired && state == 'editing'\">*</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-8\" ng-switch=\"inputType\">\n" +
    "\n" +
    "        <!-- Date -->\n" +
    "        <div ng-switch-when=\"date\">\n" +
    "            <b ng-show=\"state != 'editing'\">\n" +
    "                {{ timestamp | date:format }}\n" +
    "            </b>\n" +
    "\n" +
    "            <input\n" +
    "                ng-show=\"state == 'editing'\"\n" +
    "                ng-disabled=\"isDisabled\"\n" +
    "                ng-required=\"isRequired\"\n" +
    "                type=\"datetime\"\n" +
    "                class=\"form-control\">\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Date & time -->\n" +
    "        <div ng-switch-when=\"datetime\">\n" +
    "            <b ng-show=\"state != 'editing'\">\n" +
    "                {{ timestamp | date:format }}\n" +
    "            </b>\n" +
    "\n" +
    "            <input\n" +
    "                ng-show=\"state == 'editing'\"\n" +
    "                ng-disabled=\"isDisabled\"\n" +
    "                ng-required=\"isRequired\"\n" +
    "                type=\"datetime\"\n" +
    "                class=\"form-control\">\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Gender -->\n" +
    "        <div ng-switch-when=\"gender\">\n" +
    "            <b ng-show=\"state != 'editing'\">\n" +
    "                {{ model[key] }}\n" +
    "            </b>\n" +
    "\n" +
    "            <select\n" +
    "                ng-show=\"state == 'editing'\"\n" +
    "                ng-model=\"model[key]\"\n" +
    "                ng-selected=\"model[key]\"\n" +
    "                ng-disabled=\"isDisabled\"\n" +
    "                ng-required=\"isRequired\"\n" +
    "                class=\"form-control\">\n" +
    "\n" +
    "                <option value=\"female\">Female</option>\n" +
    "                <option value=\"male\">Male</option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Default -->\n" +
    "        <div ng-switch-default>\n" +
    "            <b ng-show=\"state != 'editing'\">\n" +
    "                {{ display || model[key] }}\n" +
    "            </b>\n" +
    "\n" +
    "            <input\n" +
    "                ng-show=\"state == 'editing'\"\n" +
    "                ng-model=\"model[key]\"\n" +
    "                ng-disabled=\"isDisabled\"\n" +
    "                ng-required=\"isRequired\"\n" +
    "                type=\"text\"\n" +
    "                class=\"form-control\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/analysis.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/analysis.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<div class=\"page page-dashboard movement-pages\">\n" +
    "	<div>\n" +
    "\n" +
    "        <!-- Breadcrumbs -->\n" +
    "        <div ng-include src=\"'fms/live/partials/breadcrumbs.html'\"></div>\n" +
    "\n" +
    "        <!-- Selected side -->\n" +
    "		<div\n" +
    "            ng-show=\"fms.current.iterations.length > 0\"\n" +
    "            ng-include src=\"'fms/live/partials/iterations.html'\">\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Demo videos -->\n" +
    "        <div ng-include src=\"'fms/demo/partials/analysis-layout-emphasized.html'\"></div>\n" +
    "\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/index.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<div class=\"page page-dashboard movement-pages\">\n" +
    "	<div>\n" +
    "		{{ params }}\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/analysis-coronal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/analysis-coronal.html",
    "<div class=\"panel-heading text-right\">\n" +
    "    Front/Coronal\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel-body\">\n" +
    "    <video class=\"demo-analysis\" style=\"width: 100%;\">\n" +
    "        <source ng-src=\"{{'../../../../demo/aslr/left/coronal.webm'}}\" type=\"video/webm\"/>\n" +
    "        <source src=\"{{'../../../../demo/aslr/left/coronal.mp4'}}\" type=\"video/mp4\"/>\n" +
    "        Sorry, your browser doesn't support HTML5 video.\n" +
    "    </video>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/analysis-layout-emphasized.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/analysis-layout-emphasized.html",
    "<div class=\"col-sm-12 panel-group panel-layout-emphasized\">\n" +
    "\n" +
    "    <!-- Emphasized view -->\n" +
    "    <div class=\"col-sm-9 no-gutter panel panel-default panel-emphasized\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <ng-include src=\"'fms/live/partials/analysis-menu.html'\"></ng-include>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <ng-include src=\"'fms/demo/partials/analysis-'+ fms.views[0] +'.html'\"></ng-include>\n" +
    "            </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Secondary views -->\n" +
    "    <div class=\"col-sm-3\">\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms/demo/partials/analysis-'+ fms.views[1] +'.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms/demo/partials/analysis-'+ fms.views[2] +'.html'\"></ng-include>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/analysis-sagittal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/analysis-sagittal.html",
    "<div class=\"panel-heading text-right\">\n" +
    "    Side/Sagittal\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel-body\">\n" +
    "    <video class=\"demo-analysis\" style=\"margin: 0 20%; width: 60%;\">\n" +
    "        <source ng-src=\"../../../../demo/aslr/analysis/sagittal.webm\" type=\"video/webm\"/>\n" +
    "        <source src=\"../../../../demo/aslr/analysis/sagittal.mp4\" type=\"video/mp4\"/>\n" +
    "        Sorry, your browser doesn't support HTML5 video.\n" +
    "    </video>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/analysis-transverse.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/analysis-transverse.html",
    "<div class=\"panel-heading text-right\">\n" +
    "    Horizontal/Transverse\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel-body\">\n" +
    "    <video class=\"demo-analysis\" style=\"width: 100%;\">\n" +
    "        <source ng-src=\"{{'../../../../demo/aslr/left/transverse.webm'}}\" type=\"video/webm\"/>\n" +
    "        <source src=\"{{'../../../../demo/aslr/left/transverse.mp4'}}\" type=\"video/mp4\"/>\n" +
    "        Sorry, your browser doesn't support HTML5 video.\n" +
    "    </video>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/summary-content.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/summary-content.html",
    "<div class=\"panel-body\">\n" +
    "\n" +
    "    <!-- Total score -->\n" +
    "    <div class=\"col-sm-4\"\n" +
    "         style=\"height: 40px; line-height: 40px; background-color: #89c443; color: #333;\">\n" +
    "\n" +
    "        <div class=\"col-sm-9\">Total Score</div>\n" +
    "        <div class=\"col-sm-3\">3</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <br>\n" +
    "    <br>\n" +
    "    <br>\n" +
    "    <br>\n" +
    "\n" +
    "    <!-- Hip results -->\n" +
    "    <table class=\"table table-striped\" ng-show=\"summary.joints.hip\">\n" +
    "\n" +
    "        <!-- Dummy heading -->\n" +
    "        <thead style=\"background-color: #d1d2d4; font-weight: bold; color: #333;\">\n" +
    "            <tr>\n" +
    "                <td>Hip</td>\n" +
    "                <td class=\"text-center\">Left</td>\n" +
    "                <td class=\"text-center\">Right</td>\n" +
    "                <td class=\"text-center\">Difference</td>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "\n" +
    "        <!-- Dummy results -->\n" +
    "        <tbody style=\"font-weight: normal; color: #333;\">\n" +
    "            <tr>\n" +
    "                <td>Flexion/Extension</td>\n" +
    "                <td class=\"text-center\">92</td>\n" +
    "                <td class=\"text-center\">110</td>\n" +
    "                <td class=\"text-center\" style=\"background-color: #ed3941;\">18</td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td>Abduction/Adduction</td>\n" +
    "                <td class=\"text-center\">19</td>\n" +
    "                <td class=\"text-center\">20</td>\n" +
    "                <td class=\"text-center\" style=\"background-color: #89c443;\">1</td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td>Internal/External Rot.</td>\n" +
    "                <td class=\"text-center\">11</td>\n" +
    "                <td class=\"text-center\">18</td>\n" +
    "                <td class=\"text-center\" style=\"background-color: #f48b4a;\">7</td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "    <div\n" +
    "        ng-show=\"summary.joints.hip\"\n" +
    "        class=\"col-sm-6 col-sm-offset-3\"\n" +
    "        style=\"margin-top: 10px; margin-bottom: 60px;\">\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <span class=\"pull-left\">\n" +
    "                <b>Left</b>\n" +
    "            </span>\n" +
    "            <span class=\"pull-right\">\n" +
    "                <b>Right</b>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <div class=\"row linear-heat-gradient\">\n" +
    "            <div style=\"\n" +
    "                position: absolute;\n" +
    "                bottom: -5%;\n" +
    "                left: 60%;\n" +
    "                display: block;\n" +
    "                height: 75%;\n" +
    "                width: 2px;\n" +
    "                background-color: #000;\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Knee results -->\n" +
    "    <table class=\"table table-striped\" ng-show=\"summary.joints.knee\">\n" +
    "\n" +
    "        <!-- Dummy heading -->\n" +
    "        <thead style=\"background-color: #d1d2d4; font-weight: bold; color: #333;\">\n" +
    "            <tr>\n" +
    "                <td>Knee</td>\n" +
    "                <td class=\"text-center\">Left</td>\n" +
    "                <td class=\"text-center\">Right</td>\n" +
    "                <td class=\"text-center\">Difference</td>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "\n" +
    "        <!-- Dummy results -->\n" +
    "        <tbody style=\"font-weight: normal; color: #333;\">\n" +
    "            <tr>\n" +
    "                <td>Flexion/Extension</td>\n" +
    "                <td class=\"text-center\">120</td>\n" +
    "                <td class=\"text-center\">109</td>\n" +
    "                <td class=\"text-center\" style=\"background-color: #f48b4a;\">11</td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td>Internal/External Rot.</td>\n" +
    "                <td class=\"text-center\">2</td>\n" +
    "                <td class=\"text-center\">18</td>\n" +
    "                <td class=\"text-center\" style=\"background-color: #ed3941;\">16</td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "    <div\n" +
    "        ng-show=\"summary.joints.knee\"\n" +
    "        class=\"col-sm-6 col-sm-offset-3\"\n" +
    "        style=\"margin-top: 10px; margin-bottom: 60px;\">\n" +
    "        <div class=\"row\">\n" +
    "            <span class=\"pull-left\">\n" +
    "                <b>Left</b>\n" +
    "            </span>\n" +
    "            <span class=\"pull-right\">\n" +
    "                <b>Right</b>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <div class=\"row linear-heat-gradient\">\n" +
    "            <div style=\"\n" +
    "                position: absolute;\n" +
    "                bottom: -5%;\n" +
    "                left: 52%;\n" +
    "                display: block;\n" +
    "                height: 75%;\n" +
    "                width: 2px;\n" +
    "                background-color: #000;\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/summary-layout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/summary-layout.html",
    "<div class=\"col-sm-12 panel-group\">\n" +
    "\n" +
    "    <div class=\"col-sm-9 no-gutter panel panel-default\" style=\"padding-left: 0px; height: 700px;\">\n" +
    "            <div class=\"col-sm-3\" style=\"height: 700px;\">\n" +
    "                <ng-include src=\"'fms/demo/partials/summary-menu.html'\"></ng-include>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Demo summary content -->\n" +
    "            <div class=\"col-sm-9\" style=\"height: 700px;\">\n" +
    "                <ng-include src=\"'fms/demo/partials/summary-content.html'\"></ng-include>\n" +
    "            </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-3\">\n" +
    "\n" +
    "        <!-- Movement overview -->\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms/demo/partials/summary-movement-overview.html'\"></ng-include>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Overall score -->\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms/demo/partials/summary-overall-scores.html'\"></ng-include>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Legend -->\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms/live/partials/summary-legend.html'\"></ng-include>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/summary-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/summary-menu.html",
    "<div class=\"movement-left-column non-test-pages\" style=\"height: 100%\">\n" +
    "\n" +
    "    <!-- Select trial -->\n" +
    "    <div\n" +
    "        ng-hide=\"analysis.playbackRatePane || analysis.planePane\"\n" +
    "        ng-click=\"analysis.trialPane = !analysis.trialPane; analysis.playbackRatePane = false;\"\n" +
    "        class=\"row\"\n" +
    "        style=\"padding:0;\">\n" +
    "        <div class=\"col-sm-8\" style=\"height:56px;\">\n" +
    "            {{ fms.current.trial.name }}\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" style=\"height:56px;\">\n" +
    "            <i ng-show=\"analysis.trialPane\" style=\"line-height:inherit;transform:scale(1, 1.5);\" class=\"fa fa-2x fa-caret-up\" />\n" +
    "            <i ng-hide=\"analysis.trialPane\" style=\"line-height:inherit;transform:scale(1, 1.5);\" class=\"fa fa-2x fa-caret-down\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div\n" +
    "        ng-if=\"analysis.trialPane\"\n" +
    "        ng-repeat=\"trial in fms.current.trials\"\n" +
    "        ng-click=\"fms.current.trial = trial; analysis.trialPane = false;\"\n" +
    "        class=\"row hierarchy-2\">\n" +
    "\n" +
    "        <div class=\"col-sm-8\">\n" +
    "            {{trial.name}}\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" ng-click=\"joint.selected = !joint.selected\">\n" +
    "            <i ng-show=\"fms.current.trial == trial\" style=\"line-height:inherit;\" class=\"fa fa-2x fa-check\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Select all joints -->\n" +
    "    <div\n" +
    "        ng-click=\"summary.joints.select('all');\"\n" +
    "        class=\"row\"\n" +
    "        style=\"padding:0;\">\n" +
    "\n" +
    "        <div class=\"col-sm-8\" style=\"height: 56px; color: #333;\">\n" +
    "            Select All\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" style=\"height:56px;\">\n" +
    "            <div ng-hide=\"summary.joints.all\" class=\"checkbox\"></div>\n" +
    "            <div ng-show=\"summary.joints.all\" class=\"checked checkbox\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Select Hip -->\n" +
    "    <div\n" +
    "        ng-click=\"summary.joints.select('hip');\"\n" +
    "        class=\"row\"\n" +
    "        style=\"padding:0;\">\n" +
    "\n" +
    "        <div class=\"col-sm-8\" style=\"height: 56px; color: #333;\">\n" +
    "            Hip\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" style=\"height:56px;\">\n" +
    "            <div ng-hide=\"summary.joints.hip\" class=\"checkbox\"></div>\n" +
    "            <div ng-show=\"summary.joints.hip\" class=\"checked checkbox\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Select Knee -->\n" +
    "    <div\n" +
    "        ng-click=\"summary.joints.select('knee');\"\n" +
    "        class=\"row\"\n" +
    "        style=\"padding:0;\">\n" +
    "\n" +
    "        <div class=\"col-sm-8\" style=\"height: 56px; color: #333;\">\n" +
    "            Knee\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" style=\"height:56px;\">\n" +
    "            <div ng-hide=\"summary.joints.knee\" class=\"checkbox\"></div>\n" +
    "            <div ng-show=\"summary.joints.knee\" class=\"checked checkbox\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/summary-movement-overview.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/summary-movement-overview.html",
    "<div class=\"panel-heading text-center\">\n" +
    "    Movement Overview\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel-body\">\n" +
    "    <div>\n" +
    "        <div class=\"text-left col-sm-12\">\n" +
    "            <h2 style=\"margin:0\";>\n" +
    "                <b style=\"font-size:40%\">Left</b>\n" +
    "            </h2>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body col-sm-12\">\n" +
    "        <img\n" +
    "            ng-src=\"{{ '../../../../demo/aslr/summary/heat_map_left.png' }}\"\n" +
    "            style=\"height:100%;display:block;margin:auto;\">\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <div class=\"text-left col-sm-12\">\n" +
    "            <h2 style=\"margin:0\">\n" +
    "                <b style=\"font-size:40%\">Right</b>\n" +
    "            </h2>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body col-sm-12\">\n" +
    "        <img\n" +
    "            ng-src=\"{{ '../../../../demo/aslr/summary/heat_map_left.png' }}\"\n" +
    "            style=\"height:100%;display:block;margin:auto;\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/summary-overall-scores.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/summary-overall-scores.html",
    "<div class=\"panel-heading text-center\">\n" +
    "    Overall Score\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel-body text-left\">\n" +
    "\n" +
    "    <!-- Total score -->\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            Total Test Score\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <br>\n" +
    "\n" +
    "    <div class=\"row \">\n" +
    "        <div class=\"col-sm-12 no-gutter\">\n" +
    "            <div class=\"col-sm-1\" style=\"background-color: #f48b4a\">&nbsp;</div>\n" +
    "            <div class=\"col-sm-1\" style=\"background-color: #ed3941\">&nbsp;</div>\n" +
    "            <div class=\"col-sm-2\" style=\"background-color: #89c443\">&nbsp;</div>\n" +
    "            <div class=\"col-sm-1\" style=\"background-color: #ed3941\">&nbsp;</div>\n" +
    "            <div class=\"col-sm-2\" style=\"background-color: #89c443\">&nbsp;</div>\n" +
    "            <div class=\"col-sm-4 text-center\" style=\"background-color: black; color: white\">15/21</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <br>\n" +
    "\n" +
    "    <!-- Movement Efficiency -->\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12 text-left\">\n" +
    "            Movement Efficiency\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <br>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div style=\"position: relative; margin: 0 auto; height: 120px; width: 120px;\">\n" +
    "                <div class=\"c100 p71 green\">\n" +
    "                    <span>71%</span>\n" +
    "                    <div class=\"slice\">\n" +
    "                        <div class=\"bar\"></div>\n" +
    "                        <div class=\"fill\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/test-coronal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/test-coronal.html",
    "<div class=\"panel-heading text-right\">\n" +
    "    Front/Coronal\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel-body\">\n" +
    "    <video class=\"demo-test\" style=\"width: 100%;\">\n" +
    "        <source ng-src=\"{{'../../../../demo/aslr/left/coronal.webm'}}\" type=\"video/webm\"/>\n" +
    "        <source src=\"{{'../../../../demo/aslr/left/coronal.mp4'}}\" type=\"video/mp4\"/>\n" +
    "        Sorry, your browser doesn't support HTML5 video.\n" +
    "    </video>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/test-layout-emphasized.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/test-layout-emphasized.html",
    "<div class=\"col-sm-12 panel-group panel-layout-emphasized\">\n" +
    "\n" +
    "    <!-- Emphasized view -->\n" +
    "    <div class=\"col-sm-9 no-gutter panel panel-default panel-emphasized\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <ng-include src=\"'fms/live/partials/test-menu.html'\"></ng-include>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <ng-include src=\"'fms/demo/partials/test-'+ fms.views[0] +'.html'\"></ng-include>\n" +
    "            </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Secondary views -->\n" +
    "    <div class=\"col-sm-3\">\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms/demo/partials/test-'+ fms.views[1] +'.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms/demo/partials/test-'+ fms.views[2] +'.html'\"></ng-include>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/test-sagittal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/test-sagittal.html",
    "<div class=\"panel-heading text-right\">\n" +
    "    Side/Sagittal\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel-body\">\n" +
    "    <video class=\"demo-test\" style=\"margin: 0 20%; width: 60%;\">\n" +
    "        <source ng-src=\"{{'../../../../demo/aslr/left/sagittal.webm'}}\" type=\"video/webm\"/>\n" +
    "        <source src=\"{{'../../../../demo/aslr/left/sagittal.mp4'}}\" type=\"video/mp4\"/>\n" +
    "        Sorry, your browser doesn't support HTML5 video.\n" +
    "    </video>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/partials/test-transverse.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/partials/test-transverse.html",
    "<div class=\"panel-heading text-right\">\n" +
    "    Horizontal/Transverse\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel-body\">\n" +
    "    <video class=\"demo-test\" style=\"width: 100%;\">\n" +
    "        <source ng-src=\"{{'../../../../demo/aslr/left/transverse.webm'}}\" type=\"video/webm\"/>\n" +
    "        <source src=\"{{'../../../../demo/aslr/left/transverse.mp4'}}\" type=\"video/mp4\"/>\n" +
    "        Sorry, your browser doesn't support HTML5 video.\n" +
    "    </video>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/summary.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/summary.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<div class=\"page page-dashboard movement-pages\">\n" +
    "	<div>\n" +
    "\n" +
    "        <!-- Breadcrumbs -->\n" +
    "        <div ng-include src=\"'fms/live/partials/breadcrumbs.html'\"></div>\n" +
    "\n" +
    "        <!-- Demo summary -->\n" +
    "        <div ng-include src=\"'fms/demo/partials/summary-layout.html'\"></div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/demo/test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/demo/test.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<div class=\"page page-dashboard movement-pages\">\n" +
    "	<div>\n" +
    "\n" +
    "        <!-- Breadcrumbs -->\n" +
    "        <ng-include src=\"'fms/live/partials/breadcrumbs.html'\"></ng-include>\n" +
    "\n" +
    "        <!-- Selected side -->\n" +
    "		<ng-include\n" +
    "            ng-show=\"fms.current.iterations.length > 0\"\n" +
    "            src=\"'fms/live/partials/iterations.html'\">\n" +
    "        </ng-include>\n" +
    "\n" +
    "        <!-- Test run summary -->\n" +
    "        <div class=\"row\">\n" +
    "            <div\n" +
    "                class=\"col-sm-12 text-center\"\n" +
    "                style=\"margin: 10px auto 20px; font-weight: normal; color: #aaa;\">\n" +
    "                Current test run: <b>{{ fms.current.trial.name }}</b> / <b>{{ fms.current.iteration }}</b>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Demo videos -->\n" +
    "        <ng-include src=\"'fms/demo/partials/test-layout-emphasized.html'\"></ng-include>\n" +
    "\n" +
    "        <!-- Trials -->\n" +
    "        <ng-include src=\"'fms/live/partials/test-trials.html'\"></ng-include>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/live/analysis.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/analysis.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<!-- Temporary placeholder -->\n" +
    "<ng-include src=\"'placeholder.html'\"></ng-include>\n" +
    "");
}]);

angular.module("fms/live/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/index.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<!-- Temporary placeholder -->\n" +
    "<ng-include src=\"'placeholder.html' + assetVersion\"></ng-include>\n" +
    "");
}]);

angular.module("fms/live/partials/analysis-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/partials/analysis-menu.html",
    "<div class=\"movement-left-column non-test-pages\">\n" +
    "\n" +
    "    <!-- Select trial -->\n" +
    "    <div\n" +
    "        ng-hide=\"analysis.playbackRatePane || analysis.planePane\"\n" +
    "        ng-click=\"analysis.trialPane = !analysis.trialPane; analysis.playbackRatePane = false;\"\n" +
    "        class=\"row\"\n" +
    "        style=\"padding:0;\">\n" +
    "        <div class=\"col-sm-8\" style=\"height:56px;\">\n" +
    "            {{ fms.current.trial.name }}\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" style=\"height:56px;\">\n" +
    "            <i ng-show=\"analysis.trialPane\" style=\"line-height:inherit;transform:scale(1, 1.5);\" class=\"fa fa-2x fa-caret-up\" />\n" +
    "            <i ng-hide=\"analysis.trialPane\" style=\"line-height:inherit;transform:scale(1, 1.5);\" class=\"fa fa-2x fa-caret-down\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div\n" +
    "        ng-if=\"analysis.trialPane\"\n" +
    "        ng-repeat=\"trial in fms.current.trials\"\n" +
    "        ng-click=\"fms.current.trial = trial; analysis.trialPane = false;\"\n" +
    "        class=\"row hierarchy-2\">\n" +
    "\n" +
    "        <div class=\"col-sm-8\">\n" +
    "            {{trial.name}}\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" ng-click=\"joint.selected = !joint.selected\">\n" +
    "            <i ng-show=\"fms.current.trial == trial\" style=\"line-height:inherit;\" class=\"fa fa-2x fa-check\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Select plane -->\n" +
    "    <div\n" +
    "        ng-hide=\"analysis.playbackRatePane || analysis.trialPane\"\n" +
    "        ng-click=\"Rover.alert('Demo')\"\n" +
    "        class=\"row\"\n" +
    "        style=\"height:56px;margin:0;line-height:56px;\">\n" +
    "\n" +
    "        <div class=\"col-sm-8\">\n" +
    "            Plane\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" style=\"height:56px;\">\n" +
    "            <i style=\"line-height:inherit;transform:scale(1, 1.5);\" class=\"fa fa-2x fa-caret-down\"/>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Select playback rate -->\n" +
    "    <div\n" +
    "        ng-click=\"analysis.playbackRatePane = !analysis.playbackRatePane; analysis.trialPane = false\"\n" +
    "        ng-hide=\"analysis.trialPane || analysis.planePane\"\n" +
    "        class=\"row\"\n" +
    "        style=\"height:56px;margin:0;line-height:56px;\">\n" +
    "\n" +
    "        <div class=\"col-sm-8\">\n" +
    "            Speed ({{ analysis.playbackRate }}x)\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" style=\"height:56px;\">\n" +
    "            <i ng-hide=\"analysis.playbackRatePane\" style=\"line-height:inherit;transform:scale(1, 1.5);\" class=\"fa fa-2x fa-caret-down\" />\n" +
    "            <i ng-show=\"analysis.playbackRatePane\" style=\"line-height:inherit;transform:scale(1, 1.5);\" class=\"fa fa-2x fa-caret-up\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div\n" +
    "        ng-if=\"analysis.playbackRatePane\"\n" +
    "        ng-repeat=\"playbackRate in [0.5, 1, 5, 25]\"\n" +
    "        ng-click=\"analysis.setPlaybackRate(playbackRate); analysis.playbackRatePane = false;\"\n" +
    "        class=\"row hierarchy-2\">\n" +
    "\n" +
    "        <div class=\"col-sm-8\">\n" +
    "            {{ playbackRate }}x\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-4\">\n" +
    "            <i ng-if=\"analysis.playbackRate == playbackRate\" style=\"line-height:inherit;\" class=\"fa fa-2x fa-check\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Show angles -->\n" +
    "    <div ng-click=\"Rover.alert('Demo')\" class=\"row\" style=\"height:56px;margin:0;line-height:56px;\">\n" +
    "        <div class=\"col-sm-8\">\n" +
    "            Angles\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" style=\"height:56px;\">\n" +
    "            <i style=\"line-height:inherit;\" class=\"fa fa-2x fa-check-square-o\"/>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Playback controls -->\n" +
    "    <div class=\"video-controls\">\n" +
    "        <i ng-click=\"analysis.play()\" class=\"fa fa-2x fa-play\" style=\"margin-right:5px;\"/>\n" +
    "        <i ng-click=\"Rover.alert('Demo')\" class=\"fa fa-2x fa-forward\" style=\"margin-right:5px;\"/>\n" +
    "        <i ng-click=\"analysis.pause()\" class=\"fa fa-2x fa-pause\" style=\"margin-right:5px;\" />\n" +
    "        <i ng-click=\"analysis.reset()\" class=\"fa fa-2x fa-undo fa-flip-vertical\" />\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/live/partials/breadcrumbs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/partials/breadcrumbs.html",
    "<ol class=\"breadcrumb-movement\">\n" +
    "\n" +
    "    <!-- Movement title -->\n" +
    "    <li>\n" +
    "        <div>\n" +
    "            <a>{{ fms.current.name }}</a>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "\n" +
    "    <!-- Movement tabs -->\n" +
    "    <li\n" +
    "        ng-click=\"Rover.browseTo.path('/fms/'+ (isDemo ? 'demo' : 'live') +'/'+ fms.current.id +'/test')\"\n" +
    "        ng-class=\"{'active': params.step == 'test'}\">\n" +
    "\n" +
    "        <a>Test</a>\n" +
    "    </li>\n" +
    "    <li\n" +
    "        ng-click=\"Rover.browseTo.path('/fms/'+ (isDemo ? 'demo' : 'live') +'/'+ fms.current.id +'/analysis')\"\n" +
    "        ng-class=\"{'active': params.step == 'analysis'}\">\n" +
    "        <a>Analysis</a>\n" +
    "    </li>\n" +
    "    <!-- <li ng-click=\"data.current_movement_page.latest_page = 2\" ng-class=\"{'active':data.current_movement_page.latest_page == 2}\">\n" +
    "        <a>Data</a>\n" +
    "    </li> -->\n" +
    "    <li\n" +
    "        ng-click=\"Rover.browseTo.path('/fms/'+ (isDemo ? 'demo' : 'live') +'/'+ fms.current.id +'/summary')\"\n" +
    "        ng-class=\"{'active': params.step == 'summary'}\">\n" +
    "\n" +
    "        <a>Summary</a>\n" +
    "    </li>\n" +
    "</ol>\n" +
    "");
}]);

angular.module("fms/live/partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/partials/header.html",
    "<header class=\"page-main-header\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <h4>Functional Movement Screening</h4>\n" +
    "            <p>Start your tests</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</header>\n" +
    "");
}]);

angular.module("fms/live/partials/iterations.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/partials/iterations.html",
    "<ol class=\"breadcrumb-movement-sm\">\n" +
    "    <li\n" +
    "        ng-click=\"fms.current.iteration = iteration\"\n" +
    "        ng-class=\"{'active': iteration == fms.current.iteration}\"\n" +
    "        ng-repeat=\"iteration in fms.current.iterations\">\n" +
    "        \n" +
    "        <a>\n" +
    "            {{ iteration }}\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ol>\n" +
    "");
}]);

angular.module("fms/live/partials/summary-legend.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/partials/summary-legend.html",
    "<div class=\"panel-heading text-center\">\n" +
    "    Thresholds\n" +
    "    <br>\n" +
    "    <small style=\"font-size: 0.8em; color: #aaa; text-transform: none;\">\n" +
    "        (in degrees)\n" +
    "    </small>\n" +
    "</div>\n" +
    "<div class=\"panel-body\">\n" +
    "\n" +
    "    <div class=\"row no-gutter\" style=\"margin:0; height:32px; color:#89c443;\">\n" +
    "        <div class=\"col-sm-3\">\n" +
    "            <b>0-5&deg;</b>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <b>Within reasonable movement standards</b>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row no-gutter\" style=\"margin:0;height:32px;color:#f48b4a;\">\n" +
    "        <div class=\"col-sm-3\">\n" +
    "            <b>5-15&deg;</b>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <b>Area of concern</b>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row no-gutter\" style=\"margin:0;height:32px;color:#ed3941;\">\n" +
    "        <div class=\"col-sm-3\">\n" +
    "            <b>15&deg;+</b>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <b>Area to address</b>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/live/partials/summary-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/partials/summary-menu.html",
    "<div class=\"movement-left-column non-test-pages\" style=\"height: 100%\">\n" +
    "\n" +
    "    <!-- Select trial -->\n" +
    "    <div\n" +
    "        ng-hide=\"analysis.playbackRatePane || analysis.planePane\"\n" +
    "        ng-click=\"analysis.trialPane = !analysis.trialPane; analysis.playbackRatePane = false;\"\n" +
    "        class=\"row\"\n" +
    "        style=\"padding:0;\">\n" +
    "        <div class=\"col-sm-8\" style=\"height:56px;\">\n" +
    "            {{ fms.current.trial.name }}\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" style=\"height:56px;\">\n" +
    "            <i ng-show=\"analysis.trialPane\" style=\"line-height:inherit;transform:scale(1, 1.5);\" class=\"fa fa-2x fa-caret-up\" />\n" +
    "            <i ng-hide=\"analysis.trialPane\" style=\"line-height:inherit;transform:scale(1, 1.5);\" class=\"fa fa-2x fa-caret-down\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div\n" +
    "        ng-if=\"analysis.trialPane\"\n" +
    "        ng-repeat=\"trial in fms.current.trials\"\n" +
    "        ng-click=\"fms.current.trial = trial; analysis.trialPane = false;\"\n" +
    "        class=\"row hierarchy-2\">\n" +
    "\n" +
    "        <div class=\"col-sm-8\">\n" +
    "            {{trial.name}}\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\" ng-click=\"joint.selected = !joint.selected\">\n" +
    "            <i ng-show=\"fms.current.trial == trial\" style=\"line-height:inherit;\" class=\"fa fa-2x fa-check\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/live/partials/test-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/partials/test-menu.html",
    "<div class=\"movement-left-column test-page\">\n" +
    "    <div\n" +
    "        ng-click=\"run.start()\"\n" +
    "        ng-show=\"isTestLive == false && !run.exists()\"\n" +
    "        style=\"background-color: #89c443; color: #fff;\">\n" +
    "        Start\n" +
    "    </div>\n" +
    "    <div\n" +
    "        ng-click=\"run.end()\"\n" +
    "        ng-show=\"isTestLive == true\"\n" +
    "        style=\"background-color: #ed3941; color: #fff;\">\n" +
    "        Stop\n" +
    "    </div>\n" +
    "    <div\n" +
    "        ng-click=\"run.pain()\"\n" +
    "        ng-show=\"isTestLive == true\"\n" +
    "        style=\"background-color: #f48b4a; color: #fff;\">\n" +
    "        Pain\n" +
    "    </div>\n" +
    "    <div\n" +
    "        ng-click=\"run.fault()\"\n" +
    "        ng-show=\"isTestLive == true\"\n" +
    "        style=\"background-color: #f48b4a; color: #fff;\">\n" +
    "        Fault\n" +
    "    </div>\n" +
    "    <div\n" +
    "        ng-click=\"run.reset()\"\n" +
    "        ng-show=\"isTestLive == false && run.exists()\"\n" +
    "        style=\"color:#f48b4a;\">\n" +
    "        Rerun the test\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/live/partials/test-trials.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/partials/test-trials.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-sm-4\">\n" +
    "		<div class=\"panel panel-default\">\n" +
    "			<div class=\"panel-body\" style=\"padding:0px;\">\n" +
    "				<div class=\"col-sm-12 ng-scope movement-trial-list\" style=\"padding:0px;\">\n" +
    "					<div\n" +
    "                        ng-repeat=\"trial in fms.current.trials\"\n" +
    "                        ng-click=\"fms.current.trial = trial;run.name = null\"\n" +
    "                        ng-class=\"{'active': trial == fms.current.trial}\">\n" +
    "\n" +
    "						<div class=\"trial-label\">\n" +
    "							{{ trial.name }}\n" +
    "                            <span\n" +
    "                                ng-show=\"run.getRunByTrial(trial) && run.getRunByTrial(trial).numFaults > 0\"\n" +
    "                                style=\"font-size:.7em;color:#999;font-weight:normal;margin-left: 5px;position:absolute;\">\n" +
    "\n" +
    "                                Faults: {{ run.getRunByTrial(trial).numFaults }}\n" +
    "                            </span>\n" +
    "						</div>\n" +
    "\n" +
    "						<div class=\"trial-status\">\n" +
    "\n" +
    "                            <!-- Status text -->\n" +
    "							<div class=\"col-sm-8\">\n" +
    "								<div ng-if=\"run.getStatus(trial) == 'saved' && run.getRunByTrial(trial).numFaults == 0\">\n" +
    "								    No Fault\n" +
    "								</div>\n" +
    "								<div ng-if=\"run.getStatus(trial) == 'saved' && run.getRunByTrial(trial).numFaults > 0\">\n" +
    "								    Faults: {{ run.getRunByTrial(trial).numFaults }}\n" +
    "								</div>\n" +
    "								<div ng-if=\"run.getStatus(trial) == 'pain'\">\n" +
    "                                    Pain\n" +
    "                                </div>\n" +
    "							</div>\n" +
    "\n" +
    "							<div class=\"col-sm-4\">\n" +
    "								<img ng-if=\"run.getStatus(trial) == 'live'\" class=\"pull-right\" src=\"../../images/ui/lock_open.png\" alt=\"unsaved\" style=\"height:40px;margin-top:5px;\" />\n" +
    "								<img ng-if=\"run.getStatus(trial) == 'saved' || run.getStatus(trial) =='pain'\" class=\"pull-right\" src=\"../../images/ui/lock_closed.png\" alt=\"saved\" style=\"height:40px;margin-top:5px;\" />\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div ng-click=\"run.submit()\" ng-hide=\"fms.current.isTestSubmitted\" class=\"movement-submit-button\">\n" +
    "						Submit Results\n" +
    "					</div>\n" +
    "					<div ng-show=\"fms.current.isTestSubmitted\" class=\"movement-submit-button\">\n" +
    "						Results Successfully Submitted\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms/live/summary.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/summary.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<!-- Temporary placeholder -->\n" +
    "<ng-include src=\"'placeholder.html'\"></ng-include>\n" +
    "");
}]);

angular.module("fms/live/test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms/live/test.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<!-- Temporary placeholder -->\n" +
    "<ng-include src=\"'placeholder.html'\"></ng-include>\n" +
    "");
}]);

angular.module("group/create.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("group/create.html",
    "<div class=\"page page-dashboard\">\n" +
    "\n" +
    "    <!-- Breadcrumbs -->\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div data-ng-include=\"'partials/breadcrumbs.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <h1>Add a Team</h1>\n" +
    "    <br>\n" +
    "\n" +
    "    <form ng-submit=\"submitGroupForm()\">\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <!-- New team form -->\n" +
    "            <div class=\"col-sm-12 col-md-8\">\n" +
    "                <div data-ng-include=\"'group/partials/form.html'\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Team picture -->\n" +
    "        	<div class=\"col-sm-12 col-md-4\">\n" +
    "                <div data-ng-include src=\"'group/partials/upload-photo.html'\"></div>\n" +
    "        	</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Action buttons -->\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12 text-center\">\n" +
    "                <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <!-- Debug -->\n" +
    "    <div ng-show=\"global.isLocal\">\n" +
    "        <br><br>\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">Debug</div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                Group data: {{ group }} <br><br>\n" +
    "                Sports: {{ sports }} <br><br>\n" +
    "                File data: {{ avatar }}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("group/edit.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("group/edit.html",
    "<div class=\"page page-dashboard\">\n" +
    "\n" +
    "    <!-- Breadcrumbs -->\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div data-ng-include=\"'partials/breadcrumbs.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <h1>Edit {{ group.name }}</h1>\n" +
    "    <br>\n" +
    "\n" +
    "    <form ng-submit=\"submitGroupForm()\">\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <!-- Edit form -->\n" +
    "            <div class=\"col-sm-12 col-md-8\">\n" +
    "                <div data-ng-include=\"'group/partials/form.html'\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Team picture -->\n" +
    "        	<div class=\"col-sm-12 col-md-4\">\n" +
    "                <div data-ng-include src=\"'group/partials/upload-photo.html'\"></div>\n" +
    "        	</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Action buttons -->\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12 text-center\">\n" +
    "                <button type=\"submit\" class=\"btn btn-default\">Save Changes</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <!-- Debug -->\n" +
    "    <div ng-show=\"global.isLocal\">\n" +
    "        <br><br>\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">Debug</div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                Group data: {{ group }} <br><br>\n" +
    "                File data: {{ avatar }}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("group/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("group/list.html",
    "<div class=\"page page-dashboard\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "\n" +
    "            <!-- Breadcrumbs -->\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div data-ng-include=\"'partials/breadcrumbs.html'\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Actions -->\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\"btn-group pull-right\">\n" +
    "                    <button\n" +
    "                        ng-click=\"Rover.browseTo.path('group/create')\"\n" +
    "                        class=\"btn btn-default\">Add a Team</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- List of groups -->\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            Teams (total: {{ global.state.group.list.length }})\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"panel-body\">\n" +
    "            <div class=\"row\">\n" +
    "                <div ng-hide=\"global.state.group.list.length > 0\" class=\"col-sm-12\">\n" +
    "                    You don't have any teams yet! Create one above to get started.\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <a\n" +
    "                        ng-repeat=\"group in global.state.group.list\"\n" +
    "                        ng-click=\"Rover.browseTo.group(group)\"\n" +
    "                        href=\"javascript:;\"\n" +
    "                        class=\"btn btn-primary btn-metro\"\n" +
    "                        style=\"background-image: url({{ group.avatar_src || '' }});background-size: cover;\">\n" +
    "\n" +
    "                        <!-- <object\n" +
    "                            ng-hide=\"group.avatar_src\"\n" +
    "                            style=\"pointer-events:none;\"\n" +
    "                            type=\"image/svg+xml\"\n" +
    "                            data=\"/images/sports/{{group.sport_id}}.svg\" /> -->\n" +
    "\n" +
    "                        <span>{{ group.name }}</span>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("group/partials/details.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("group/partials/details.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        {{ global.state.group.selected.name }}'s details\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        <div data-ui-editable-list-container>\n" +
    "\n" +
    "            <!-- Group name -->\n" +
    "            <div\n" +
    "                data-ui-editable-list-item\n" +
    "                data-label=\"Name\"\n" +
    "                data-value=\"group.name\">\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("group/partials/form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("group/partials/form.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        Team Details\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        <!-- Name -->\n" +
    "        <div class=\"form-group\">\n" +
    "            <input\n" +
    "                type=\"text\"\n" +
    "                ng-model=\"group.name\"\n" +
    "                placeholder=\"Name\"\n" +
    "                class=\"form-control\"\n" +
    "                required>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Sport -->\n" +
    "        <!-- <div class=\"row form-group\">\n" +
    "            <div class=\"col-sm-4 col-md-2\">\n" +
    "                Sport\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-8\">\n" +
    "                <select ng-model=\"group.sport_id\" class=\"form-control\" required>\n" +
    "                    <option\n" +
    "                        ng-repeat=\"sport in sports\"\n" +
    "                        ng-selected=\"sport.id === group.sport_id\"\n" +
    "                        value=\"{{ sport.id }}\">\n" +
    "                        {{ sport.name }}\n" +
    "                    </option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "        </div> -->\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("group/partials/upload-photo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("group/partials/upload-photo.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        Avatar\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        <!-- Avatar preview -->\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <img\n" +
    "                    ng-show=\"avatar || group.photo_src\"\n" +
    "                    ngf-src=\"avatar || group.photo_src\"\n" +
    "                    style=\"width: 100%\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <!-- Action buttons -->\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12 text-center\">\n" +
    "                <span ng-show=\"group.id < 1\">\n" +
    "                    Please create the team <br>\n" +
    "                    before uploading a photo. <br><br>\n" +
    "                </span>\n" +
    "\n" +
    "                <span ng-show=\"group.id >= 1\">\n" +
    "                    Temporarily disabled. <br><br>\n" +
    "                </span>\n" +
    "\n" +
    "                <button\n" +
    "                    ngf-select=\"uploadPhoto($file)\"\n" +
    "                    ngf-drop\n" +
    "                    ng-model=\"avatar\"\n" +
    "                    accept=\"image/*\"\n" +
    "                    ngf-pattern=\"'image/*'\"\n" +
    "                    ngf-capture=\"'camera'\"\n" +
    "                    ngf-min-height=\"100\"\n" +
    "                    ngf-max-size=\"2MB\"\n" +
    "                    ng-class=\"{'btn btn-default': true, 'disabled': group.id < 1 || true}\">\n" +
    "\n" +
    "                    Select or drag &amp; drop a photo\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("group/view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("group/view.html",
    "<!-- Group summary -->\n" +
    "<div ng-show=\"group.id\" class=\"page\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <!-- Breadcrumbs -->\n" +
    "        <div class=\"col-sm-12 col-md-6\">\n" +
    "            <div data-ng-include=\"'partials/breadcrumbs.html'\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Actions -->\n" +
    "        <div class=\"col-sm-12 col-md-6\">\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "\n" +
    "                <!-- Delete group button -->\n" +
    "                <button\n" +
    "                    ng-show=\"group.id > 0\"\n" +
    "                    data-toggle=\"modal\"\n" +
    "                    data-target=\"#deleteGroupConfirmation\"\n" +
    "                    class=\"btn btn-danger\">\n" +
    "\n" +
    "                    Delete <b>{{ group.name }}</b>\n" +
    "                </button>\n" +
    "\n" +
    "                <!-- Delete confirmation -->\n" +
    "                <div class=\"modal fade\" id=\"deleteGroupConfirmation\">\n" +
    "                    <div class=\"modal-dialog\">\n" +
    "                        <div class=\"modal-content\">\n" +
    "                            <div class=\"modal-body\">\n" +
    "                                <p ng-show=\"global.state.profile.list.length > 0\">\n" +
    "                                    Are you sure you want to delete <b>{{ group.name }}</b>\n" +
    "                                    and the {{ global.state.profile.list.length }}\n" +
    "                                    associated athletes?\n" +
    "                                </p>\n" +
    "                                <p ng-show=\"global.state.profile.list.length === 0\">\n" +
    "                                    Are you sure you want to delete <b>{{ group.name }}</b>?\n" +
    "                                </p>\n" +
    "                            </div>\n" +
    "                            <div class=\"modal-footer text-center\">\n" +
    "                                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\n" +
    "                                    Cancel\n" +
    "                                </button>\n" +
    "                                <button ng-click=\"deleteGroup()\" type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">\n" +
    "                                    Yes, delete {{ group.name }}\n" +
    "                                </button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Edit group button -->\n" +
    "                <button\n" +
    "                    ng-show=\"group.id > 0\"\n" +
    "                    ng-click=\"Rover.browseTo.path('group/edit')\"\n" +
    "                    class=\"btn btn-default\">\n" +
    "\n" +
    "                    Edit <b>{{ group.name }}</b>\n" +
    "                </button>\n" +
    "\n" +
    "                <!-- Create profile button -->\n" +
    "                <button\n" +
    "                    ng-click=\"Rover.browseTo.path('profile/create')\"\n" +
    "                    class=\"btn btn-default\">\n" +
    "\n" +
    "                    Add an athlete\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <section>\n" +
    "    	<div class=\"row\">\n" +
    "\n" +
    "            <!-- Avatar -->\n" +
    "    		<div class=\"col-md-6 col-sm-12\">\n" +
    "                <div class=\"text-center\" style=\"margin: 5% 20%; width: 60%;\">\n" +
    "                    <ui-avatar\n" +
    "                        data-upload-endpoint=\"uploadAvatarEndpoint\"\n" +
    "                        data-success-callback=\"uploadAvatarCallback\"\n" +
    "                        data-src=\"group.avatar_src\">\n" +
    "                    </ui-avatar>\n" +
    "                </div>\n" +
    "    		</div>\n" +
    "\n" +
    "            <!-- Group details -->\n" +
    "            <div class=\"col-sm-12 col-md-6\">\n" +
    "                <div data-ng-include=\"'group/partials/details.html'\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section data-ng-show=\"global.isLocal\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div class=\"panel panel-default\">\n" +
    "                        <div class=\"panel-heading\">\n" +
    "                            Debug\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"panel-body\">\n" +
    "                            Avatar: {{ group.avatar_src ? 'has avatar' : 'no avatar' }} <br>\n" +
    "                            Global: {{ global.state.group.selected.name }} <br>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "    </section>\n" +
    "</div>\n" +
    "\n" +
    "<!-- No group selected -->\n" +
    "<div ng-show=\"group.id === 0\" class=\"page\">\n" +
    "    <h1 class=\"text-center\">No group selected</h1>\n" +
    "    <br>\n" +
    "\n" +
    "    <div class=\"text-center\">\n" +
    "        Please select a group to view its details.\n" +
    "        <br>\n" +
    "\n" +
    "        You can also take this opportunity to\n" +
    "        <a ng-click=\"Rover.browseTo.path('group/create')\" href=\"javascript:;\">create one</a>.\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/breadcrumbs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/breadcrumbs.html",
    "<ol class=\"breadcrumb-alt\">\n" +
    "    <li>\n" +
    "        <a class=\"active\" href=\"javascript:;\" ng-click=\"Rover.browseTo.path('/')\">\n" +
    "            Dashboard\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li ng-show=\"global.state.group.selected.id > 0\">\n" +
    "        <a class=\"active\" href=\"javascript:;\" ng-click=\"Rover.browseTo.path('/group/list')\">\n" +
    "            Teams\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li ng-show=\"isProfilePage && global.state.group.selected.id > 0\">\n" +
    "        <a class=\"active\" href=\"javascript:;\" ng-click=\"Rover.browseTo.group()\">\n" +
    "            {{ global.state.group.selected.name }}\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li ng-show=\"currentPath == '/profile/view'\">\n" +
    "        <a class=\"active\" href=\"javascript:;\" ng-click=\"Rover.browseTo.profile()\">\n" +
    "            {{ global.state.profile.selected.first_name }}\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li ng-show=\"currentPath == '/group/create'\">\n" +
    "        <a class=\"active\" href=\"javascript:;\" ng-click=\"\">\n" +
    "            Create a Team\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li ng-show=\"currentPath == '/profile/create'\">\n" +
    "        <a class=\"active\" href=\"javascript:;\" ng-click=\"\">\n" +
    "            Add an athlete\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ol>\n" +
    "");
}]);

angular.module("profile/create.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/create.html",
    "<div class=\"page page-dashboard\">\n" +
    "\n" +
    "    <!-- Breadcrumbs -->\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div data-ng-include=\"'partials/breadcrumbs.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <h1>Add an Athlete</h1>\n" +
    "    <br>\n" +
    "\n" +
    "    <form ng-submit=\"createProfile()\">\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <!-- New profile form -->\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        Profile Details\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <div class=\"row\">\n" +
    "\n" +
    "                            <!-- First name -->\n" +
    "                            <div class=\"col-sm-12 col-md-6\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <input\n" +
    "                                        type=\"text\"\n" +
    "                                        ng-model=\"profile.first_name\"\n" +
    "                                        placeholder=\"First Name\"\n" +
    "                                        class=\"form-control\"\n" +
    "                                        required>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <!-- Last name -->\n" +
    "                            <div class=\"col-sm-12 col-md-6\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <input\n" +
    "                                        type=\"text\"\n" +
    "                                        ng-model=\"profile.last_name\"\n" +
    "                                        placeholder=\"Last Name\"\n" +
    "                                        class=\"form-control\"\n" +
    "                                        required>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Height -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Height (ft / in)\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-4 col-md-3\">\n" +
    "                                <input\n" +
    "                                    type=\"number\"\n" +
    "                                    min=\"1\" max=\"10\"\n" +
    "                                    ng-model=\"profile.feet\"\n" +
    "                                    placeholder=\"Feet\"\n" +
    "                                    class=\"form-control\"\n" +
    "                                    required>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-4 col-md-3\">\n" +
    "                                <input\n" +
    "                                    type=\"number\"\n" +
    "                                    min=\"0\" max=\"11\"\n" +
    "                                    ng-model=\"profile.inches\"\n" +
    "                                    placeholder=\"Inches\"\n" +
    "                                    class=\"form-control\"\n" +
    "                                    required>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Weight -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Weight (lbs)\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-4 col-md-3\">\n" +
    "                                <input\n" +
    "                                    class=\"form-control\"\n" +
    "                                    ng-model=\"profile.weight_lbs\"\n" +
    "                                    placeholder=\"Weight\"\n" +
    "                                    type=\"number\"\n" +
    "                                    min=\"1\" max=\"1000\" step=\"0.01\"\n" +
    "                                    required>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Date of birth -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Date of Birth\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-8 col-md-4\">\n" +
    "                                <input\n" +
    "                                    class=\"form-control\"\n" +
    "                                    ng-model=\"profile.dob\"\n" +
    "                                    placeholder=\"DOB\"\n" +
    "                                    type=\"text\"\n" +
    "                                    disabled>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Gender -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Gender\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-8 col-md-4\">\n" +
    "                                <select ng-model=\"profile.gender\" class=\"form-control\">\n" +
    "                                    <option value=\"\" ng-selected=\"profile.gender == ''\">(not specified)</option>\n" +
    "                                    <option value=\"female\" ng-selected=\"profile.gender == 'female'\">Female</option>\n" +
    "                                    <option value=\"male\" ng-selected=\"profile.gender == 'male'\">Male</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Email -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Email\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-8 col-md-6\">\n" +
    "                                <input\n" +
    "                                    class=\"form-control\"\n" +
    "                                    ng-model=\"profile.email\"\n" +
    "                                    placeholder=\"email@example.com\"\n" +
    "                                    type=\"email\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Phone number -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Phone\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-8 col-md-4\">\n" +
    "                                <input\n" +
    "                                    class=\"form-control\"\n" +
    "                                    ng-model=\"profile.phone\"\n" +
    "                                    placeholder=\"555-555-5555\"\n" +
    "                                    type=\"tel\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Medical history -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Medical History\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-8 col-md-9\">\n" +
    "                                <textarea class=\"form-control\" ng-model=\"profile.medical_history\" placeholder=\"...\"></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Previous injuries -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Previous Injuries\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-8 col-md-9\">\n" +
    "                                <textarea class=\"form-control\" ng-model=\"profile.injuries\" placeholder=\"...\"></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Notes -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Other Notes\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-8 col-md-9\">\n" +
    "                                <textarea class=\"form-control\" ng-model=\"profile.notes\" placeholder=\"...\"></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Action buttons -->\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12 text-center\">\n" +
    "                <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <div ng-show=\"global.isLocal\" class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Debug</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "            Selected group: {{ global.state.group.selected.name }}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("profile/edit.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/edit.html",
    "<div class=\"page page-dashboard\">\n" +
    "\n" +
    "    <!-- Breadcrumbs -->\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div data-ng-include=\"'partials/breadcrumbs.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <h1>Edit {{ profile.first_name }}'s details</h1>\n" +
    "    <br>\n" +
    "\n" +
    "    <form ng-submit=\"submitProfileForm()\">\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <!-- Edit form -->\n" +
    "            <div class=\"col-sm-12 col-md-8\">\n" +
    "                <div data-ng-include=\"'profile/partials/form.html'\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Profile picture -->\n" +
    "        	<div class=\"col-sm-12 col-md-4\">\n" +
    "                <div data-ng-include=\"'profile/partials/upload-photo.html'\"></div>\n" +
    "        	</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <!-- Medical information -->\n" +
    "            <div class=\"col-sm-12 col-md-6\">\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        Medical Information\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <textarea ng-model=\"profile.underlying_medical\" class=\"form-control\"></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Previous injuries -->\n" +
    "            <div class=\"col-sm-12 col-md-6\">\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        Previous Injuries\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <textarea ng-model=\"profile.previous_injuries\" class=\"form-control\"></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Other notes -->\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12 col-md-6 col-md-offset-3\">\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        Other Notes\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <textarea ng-model=\"profile.notes\" class=\"form-control\"></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Action buttons -->\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12 text-center\">\n" +
    "                <button type=\"submit\" class=\"btn btn-default\">Save changes</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <div ng-show=\"global.isLocal\">\n" +
    "        <br><br>\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">Debug</div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                Selected group: {{ global.state.group.selected.name }}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("profile/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/list.html",
    "<div class=\"page page-dashboard\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "\n" +
    "            <!-- Breadcrumbs -->\n" +
    "            <div class=\"col-sm-12 col-md-6\">\n" +
    "                <div data-ng-include=\"'partials/breadcrumbs.html'\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Profile list -->\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            Athletes in {{ global.state.group.selected.name }}\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"panel-body\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div ng-show=\"global.state.profile.list.length === 0\">\n" +
    "                        The <b>{{ global.state.group.selected.name }}</b> do not have any\n" +
    "                        members yet. Add one above to get started!\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <a\n" +
    "                        href=\"javascript:;\"\n" +
    "                        class=\"btn btn-primary btn-metro\"\n" +
    "                        ng-repeat=\"profile in global.state.profile.list\"\n" +
    "                        ng-click=\"Rover.browseTo.profile(profile)\"\n" +
    "                        style=\"background-image: url({{ profile.avatar_src || '' }});background-size: cover;\">\n" +
    "\n" +
    "                        <div class=\"btn-title\">{{ profile.first_name }}</div>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("profile/partials/current-fms-plot.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/partials/current-fms-plot.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        Test FMS Score Graph\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body\">\n" +
    "        <div\n" +
    "            morris-chart\n" +
    "            data-type=\"area\"\n" +
    "            data-data=\"fmsForms\"\n" +
    "            data-xkey=\"created_at\"\n" +
    "            data-ykeys='[\"Lhurdle\", \"Rhurdle\", \"Llunge\", \"Rlunge\"]'\n" +
    "            data-labels='[\"Left Hurdle\", \"Right Hurdle\", \"Left Lunge\", \"Right Lunge\"]'\n" +
    "            data-line-colors='[\"#383d43\",\"#db5031\",\"#c1bfc0\"]'\n" +
    "            data-line-width=\"3\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("profile/partials/details.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/partials/details.html",
    "<div\n" +
    "    data-ui-editable-list-container\n" +
    "    data-model=\"profile\"\n" +
    "    data-save=\"saveProfileDetails\"\n" +
    "    data-save-callback=\"saveProfileDetailsCallback\"\n" +
    "    data-heading=\"{{ global.state.profile.selected.first_name }}'s details\">\n" +
    "\n" +
    "    <!-- First name -->\n" +
    "    <div\n" +
    "        data-ui-editable-list-item\n" +
    "        data-label=\"First Name\"\n" +
    "        data-key=\"first_name\"\n" +
    "        data-required=\"true\">\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Last name -->\n" +
    "    <div\n" +
    "        data-ui-editable-list-item\n" +
    "        data-label=\"Last Name\"\n" +
    "        data-key=\"last_name\">\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Height -->\n" +
    "    <!-- <div\n" +
    "        data-ui-editable-list-item\n" +
    "        data-label=\"Height\"\n" +
    "        data-display=\"{{ profile.feet }}' {{ profile.inches }}&quot;\"\n" +
    "        data-model=\"profile\"\n" +
    "        data-key=\"height\">\n" +
    "    </div> -->\n" +
    "\n" +
    "    <!-- Weight -->\n" +
    "    <!-- <div\n" +
    "        data-ui-editable-list-item\n" +
    "        data-label=\"Weight\"\n" +
    "        data-display=\"{{ profile.weight_lbs }} lbs\"\n" +
    "        data-value=\"profile.weight_lbs\"\n" +
    "        data-disabled=\"true\">\n" +
    "    </div> -->\n" +
    "\n" +
    "    <!-- Date of Birth -->\n" +
    "    <div\n" +
    "        data-ui-editable-list-item\n" +
    "        data-label=\"Date of Birth\"\n" +
    "        data-key=\"dob\"\n" +
    "        data-type=\"date\">\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Gender -->\n" +
    "    <div\n" +
    "        data-ui-editable-list-item\n" +
    "        data-label=\"Gender\"\n" +
    "        data-key=\"gender\"\n" +
    "        data-type=\"gender\">\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Phone -->\n" +
    "    <div\n" +
    "        data-ui-editable-list-item\n" +
    "        data-label=\"Phone #\"\n" +
    "        data-key=\"phone\">\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Email -->\n" +
    "    <div\n" +
    "        data-ui-editable-list-item\n" +
    "        data-label=\"Email\"\n" +
    "        data-key=\"email\">\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Profile creation date -->\n" +
    "    <div\n" +
    "        data-ui-editable-list-item\n" +
    "        data-label=\"Profile Created\"\n" +
    "        data-key=\"created_at\"\n" +
    "        data-type=\"datetime\"\n" +
    "        data-disabled=\"true\">\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("profile/partials/final-fms-plot.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/partials/final-fms-plot.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        Total FMS Score Graph\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body\">\n" +
    "        <div class=\"panel-body ng-scope\" data-ng-controller=\"morrisChartCtrl\">\n" +
    "\n" +
    "            <div\n" +
    "                morris-chart\n" +
    "                data-type=\"line\"\n" +
    "                data-data=\"fmsForms\"\n" +
    "                data-xkey=\"created_at\"\n" +
    "                data-ykeys='[\"totalscore\"]'\n" +
    "                data-labels='[\"total score\"]'\n" +
    "                data-line-colors='[\"#383d43\"]'\n" +
    "                data-line-width=\"3\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("profile/partials/upload-photo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/partials/upload-photo.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        Avatar\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        <!-- Avatar preview -->\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <img\n" +
    "                    ng-show=\"avatar || profile.photo_src\"\n" +
    "                    ngf-src=\"avatar || profile.photo_src\"\n" +
    "                    style=\"width: 100%\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <!-- Action buttons -->\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12 text-center\">\n" +
    "                <span ng-show=\"profile.id < 1\">\n" +
    "                    Please create the profile <br>\n" +
    "                    before uploading a photo. <br><br>\n" +
    "                </span>\n" +
    "\n" +
    "                <span ng-show=\"profile.id >= 1\">\n" +
    "                    Temporarily disabled. <br><br>\n" +
    "                </span>\n" +
    "\n" +
    "                <button\n" +
    "                    ngf-select=\"uploadPhoto($file)\"\n" +
    "                    ngf-drop\n" +
    "                    ng-model=\"avatar\"\n" +
    "                    accept=\"image/*\"\n" +
    "                    ngf-pattern=\"'image/*'\"\n" +
    "                    ngf-capture=\"'camera'\"\n" +
    "                    ngf-min-height=\"100\"\n" +
    "                    ngf-max-size=\"2MB\"\n" +
    "                    ng-class=\"{'btn btn-default': true, 'disabled': profile.id < 1 || true}\">\n" +
    "\n" +
    "                    Select or drag &amp; drop a photo\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("profile/view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profile/view.html",
    "<!-- Profile summary -->\n" +
    "<div ng-show=\"profile.id\" class=\"page\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <!-- Breadcrumbs -->\n" +
    "        <div class=\"col-sm-12 col-md-6\">\n" +
    "            <div data-ng-include=\"'partials/breadcrumbs.html'\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Actions -->\n" +
    "        <div class=\"col-sm-12 col-md-6\">\n" +
    "            <div class=\"btn-group pull-right\">\n" +
    "\n" +
    "                <!-- Delete profile button -->\n" +
    "                <button\n" +
    "                    ng-show=\"profile.id > 0\"\n" +
    "                    data-toggle=\"modal\"\n" +
    "                    data-target=\"#deleteProfileConfirmation\"\n" +
    "                    data-toggle=\"tooltip\"\n" +
    "                    title=\"Delete <b>{{ profile.first_name }}</b>'s profile\"\n" +
    "                    class=\"btn btn-danger\">\n" +
    "\n" +
    "                    Delete <b>{{ profile.first_name }}</b>'s profile\n" +
    "                </button>\n" +
    "\n" +
    "                <!-- Delete confirmation -->\n" +
    "                <div class=\"modal fade\" id=\"deleteProfileConfirmation\">\n" +
    "                    <div class=\"modal-dialog\">\n" +
    "                        <div class=\"modal-content\">\n" +
    "                            <div class=\"modal-body\">\n" +
    "                                <p>\n" +
    "                                    Are you sure you want to delete <b>{{ profile.first_name }}\n" +
    "                                    {{ profile.last_name }}</b>'s profile?\n" +
    "                                </p>\n" +
    "                            </div>\n" +
    "                            <div class=\"modal-footer text-center\">\n" +
    "                                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\n" +
    "                                    Cancel\n" +
    "                                </button>\n" +
    "                                <button ng-click=\"deleteProfile()\" type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">\n" +
    "                                    Yes, delete {{ profile.first_name }}\n" +
    "                                </button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Create profile button -->\n" +
    "                <button\n" +
    "                    ng-click=\"Rover.browseTo.path('profile/create')\"\n" +
    "                    class=\"btn btn-default\">\n" +
    "\n" +
    "                    Add another athlete\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <section>\n" +
    "    	<div class=\"row\">\n" +
    "\n" +
    "            <!-- Avatar -->\n" +
    "    		<div class=\"col-md-6 col-sm-12\">\n" +
    "                <div class=\"text-center\" style=\"margin: 5% 20%; width: 60%;\">\n" +
    "                    <ui-avatar\n" +
    "                        data-upload-endpoint=\"uploadAvatarEndpoint\"\n" +
    "                        data-success-callback=\"uploadAvatarCallback\"\n" +
    "                        data-src=\"profile.avatar_src\">\n" +
    "                    </ui-avatar>\n" +
    "                </div>\n" +
    "    		</div>\n" +
    "\n" +
    "            <!-- Profile details -->\n" +
    "            <div class=\"col-sm-12 col-md-6\">\n" +
    "                <div data-ng-include=\"'profile/partials/details.html'\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Medical information -->\n" +
    "        <div class=\"row\">\n" +
    "    		<div class=\"col-sm-12\">\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        Medical Information\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                {{ profile.medical_history || 'No medical information provided.' }}\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        Previous Injuries\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                {{ profile.injuries || 'No previous injuries' }}\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        Other Notes\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                {{ profile.notes || 'No other notes' }}\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "    		</div>\n" +
    "    	</div>\n" +
    "    </section>\n" +
    "\n" +
    "    <!-- FMS graphs... To be reviewed -->\n" +
    "    <section ng-show=\"fmsForms.length > 0\">\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <!-- Current test -->\n" +
    "            <div class=\"col-sm-12 col-md-6\">\n" +
    "                <div data-ng-include=\"'profile/partials/current-fms-plot.html'\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Final results -->\n" +
    "            <div class=\"col-sm-12 col-md-6\">\n" +
    "                <div data-ng-include=\"'profile/partials/final-fms-plot.html'\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section data-ng-show=\"global.isLocal\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div class=\"panel panel-default\">\n" +
    "                        <div class=\"panel-heading\">\n" +
    "                            Debug\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"panel-body\">\n" +
    "                            FMS Forms: {{ fmsForms }} <br><br>\n" +
    "                            Profile alias: {{ profile.first_name }} ({{ profile.id }}) <br>\n" +
    "                            Profile global: ({{ global.state.profile.selected.id }}) <br>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "    </section>\n" +
    "</div>\n" +
    "\n" +
    "<!-- No profile selected -->\n" +
    "<div ng-show=\"profile.id === 0\" class=\"page\">\n" +
    "    <h1 class=\"text-center\">No profile selected</h1>\n" +
    "    <br>\n" +
    "\n" +
    "    <div class=\"text-center\">\n" +
    "        Please select a profile to view its details.\n" +
    "        <br>\n" +
    "\n" +
    "        You can also take this opportunity to\n" +
    "        <a ng-click=\"Rover.browseTo.path('profile/create')\" href=\"javascript:;\">create one</a>.\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
