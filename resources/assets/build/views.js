angular.module('app.views', ['account.html', 'configuration.html', 'dashboard.html', 'fmsresults.html', 'fmstest.html', 'placeholder.html', 'capture/index.html', 'directive-partials/ui-avatar.html', 'directive-partials/ui-editable-fields/field-value-generic.html', 'directive-partials/ui-editable-fields/field-value-timestamp.html', 'directive-partials/ui-editable-fields/field-value-with-units.html', 'directive-partials/ui-editable-fields/field.html', 'directive-partials/ui-editable-fields/fields.html', 'directive-partials/ui-editable-fields/standalone-field.html', 'directive-partials/ui-movement-placeholder.html', 'directive-partials/ui-movement-preview.html', 'directive-partials/ui-page-title.html', 'directive-partials/ui-taggable-input.html', 'fms-bak/demo/analysis.html', 'fms-bak/demo/index.html', 'fms-bak/demo/partials/analysis-coronal.html', 'fms-bak/demo/partials/analysis-layout-emphasized.html', 'fms-bak/demo/partials/analysis-sagittal.html', 'fms-bak/demo/partials/analysis-transverse.html', 'fms-bak/demo/partials/summary-content.html', 'fms-bak/demo/partials/summary-layout.html', 'fms-bak/demo/partials/summary-menu.html', 'fms-bak/demo/partials/summary-movement-overview.html', 'fms-bak/demo/partials/summary-overall-scores.html', 'fms-bak/demo/partials/test-coronal.html', 'fms-bak/demo/partials/test-layout-emphasized.html', 'fms-bak/demo/partials/test-sagittal.html', 'fms-bak/demo/partials/test-transverse.html', 'fms-bak/demo/summary.html', 'fms-bak/demo/test.html', 'fms-bak/live/analysis.html', 'fms-bak/live/index.html', 'fms-bak/live/partials/analysis-menu.html', 'fms-bak/live/partials/breadcrumbs.html', 'fms-bak/live/partials/header.html', 'fms-bak/live/partials/iterations.html', 'fms-bak/live/partials/summary-legend.html', 'fms-bak/live/partials/summary-menu.html', 'fms-bak/live/partials/test-menu.html', 'fms-bak/live/partials/test-trials.html', 'fms-bak/live/summary.html', 'fms-bak/live/test.html', 'group/create.html', 'group/edit.html', 'group/list.html', 'group/partials/form.html', 'group/partials/upload-photo.html', 'group/view.html', 'import/index.html', 'movement-editor/footer.html', 'movement-editor/index.html', 'movements/analysis/index.html', 'movements/comparison/index.html', 'movements/explorer/index.html', 'movements/explorer/partials/details-layout.html', 'movements/explorer/partials/large-tiles-layout.html', 'movements/explorer/partials/small-tiles-layout.html', 'partials/breadcrumbs.html', 'partials/header.html', 'partials/modal.html', 'partials/navigation.html', 'partials/select-profile.html', 'profile/create.html', 'profile/edit.html', 'profile/list.html', 'profile/partials/current-fms-plot.html', 'profile/partials/final-fms-plot.html', 'profile/partials/upload-photo.html', 'profile/view.html', 'screenings/current/index.html', 'screenings/index.html', 'screenings/view/index.html', 'thumbnail-selector/footer.html', 'thumbnail-selector/index.html']);

angular.module("account.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<!-- User details -->\n" +
    "<div class=\"page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            Account <i class=\"fa fa-cogs\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "    </header>\n" +
    "\n" +
    "    <div ng-hide=\"user.id === 0\" class=\"row\">\n" +
    "        <div class=\"col-md-8\">\n" +
    "\n" +
    "            <!-- User details -->\n" +
    "            <ui-editable-fields\n" +
    "                data-model=\"user\"\n" +
    "                data-save=\"saveUserDetails\"\n" +
    "                data-save-callback=\"saveUserDetailsCallback\"\n" +
    "                data-heading=\"Your Details\">\n" +
    "\n" +
    "                <!-- Username -->\n" +
    "                <ui-editable-field\n" +
    "                    data-label=\"Username\"\n" +
    "                    data-key=\"username\"\n" +
    "                    data-disabled=\"true\">\n" +
    "                </ui-editable-field>\n" +
    "\n" +
    "                <!-- First name -->\n" +
    "                <ui-editable-field\n" +
    "                    data-label=\"First Name\"\n" +
    "                    data-key=\"firstName\"\n" +
    "                    data-required=\"true\">\n" +
    "                </ui-editable-field>\n" +
    "\n" +
    "                <!-- Last name -->\n" +
    "                <ui-editable-field\n" +
    "                    data-label=\"Last Name\"\n" +
    "                    data-key=\"lastName\">\n" +
    "                </ui-editable-field>\n" +
    "\n" +
    "                <!-- Phone -->\n" +
    "                <ui-editable-field\n" +
    "                    data-label=\"Phone #\"\n" +
    "                    data-key=\"phone\">\n" +
    "                </ui-editable-field>\n" +
    "\n" +
    "                <!-- Email -->\n" +
    "                <ui-editable-field\n" +
    "                    data-label=\"Email\"\n" +
    "                    data-key=\"email\"\n" +
    "                    data-required=\"true\">\n" +
    "                </ui-editable-field>\n" +
    "\n" +
    "            </ui-editable-fields>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Avatar -->\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"text-center\" style=\"margin: 5% 20%; width: 60%;\">\n" +
    "                <ui-avatar\n" +
    "                    data-upload-endpoint=\"uploadAvatarEndpoint\"\n" +
    "                    data-success-callback=\"uploadAvatarCallback\"\n" +
    "                    data-src=\"user.avatarSrc\">\n" +
    "                </ui-avatar>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Retrieving user data -->\n" +
    "    <div ng-show=\"user.id === 0\" class=\"text-center\">\n" +
    "        <h3>Retrieving your details</h3>\n" +
    "        <br>\n" +
    "        <br>\n" +
    "        <br>\n" +
    "        <br>\n" +
    "        <i class=\"fa fa-spinner fa-spin fa-3x\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Debug -->\n" +
    "    <div ng-show=\"global.isLocal\" class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Debug</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "            Avatar: {{ user.avatarSrc ? 'Yes' : 'No' }} <br>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("configuration.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("configuration.html",
    "<!-- User details -->\n" +
    "<div class=\"page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            Settings <i class=\"fa fa-cogs\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "    </header>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-8\">\n" +
    "\n" +
    "            <!-- Preferences -->\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    App Settings\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div style=\"color: #ccc; text-align: center\">\n" +
    "                        In Development\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Debug -->\n" +
    "    <div ng-show=\"global.isLocal\" class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Debug</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("dashboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"dashboard page animate-fade-up\">\n" +
    "\n" +
    "    <div class=\"dashboard-menu\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <div class=\"row dashboard-title\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <h1\n" +
    "                    ng-show=\"global.state.user.id > 0 && global.state.user.firstName.length\"\n" +
    "                    class=\"text-center\">\n" +
    "                    {{ greeting }} {{ global.state.user.firstName }},\n" +
    "                </h1>\n" +
    "                <h1\n" +
    "                    ng-show=\"global.state.user.id === 0\n" +
    "                        || !global.state.user.firstName\n" +
    "                        || global.state.user.firstName.length === 0\"\n" +
    "                    class=\"text-center\">\n" +
    "                    {{ greeting }}.\n" +
    "                </h1>\n" +
    "\n" +
    "                <h3 class=\"text-center\">\n" +
    "                    What would you like to do?\n" +
    "                </h3>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Bookmarks -->\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <!-- Padding for bookmarks -->\n" +
    "            <div ng-show=\"bookmarks.length === 4\" class=\"col-md-2\"></div>\n" +
    "            <div ng-show=\"bookmarks.length === 3\" class=\"col-md-3\"></div>\n" +
    "            <div ng-show=\"bookmarks.length === 2\" class=\"col-md-4\"></div>\n" +
    "            <div ng-show=\"bookmarks.length === 1\" class=\"col-md-5\"></div>\n" +
    "\n" +
    "            <!-- Actual bookmarks -->\n" +
    "            <div ng-repeat=\"bookmark in bookmarks\" class=\"col-md-2\">\n" +
    "                <a href=\"{{ bookmark.uri }}\" class=\"btn-dashboard\">\n" +
    "                    <i ng-class=\"'fa fa-2x fa-'+ bookmark.icon\"></i>\n" +
    "                    <span>\n" +
    "                        {{ bookmark.title }}\n" +
    "                    </span>\n" +
    "                    <span></span>\n" +
    "                </a>\n" +
    "            </div>\n" +
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

angular.module("capture/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("capture/index.html",
    "<div class=\"page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            Record <i class=\"fa fa-video-camera\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "    </header>\n" +
    "\n" +
    "    <h2 style=\"text-align: center; color: #ccc;\">\n" +
    "        In Development\n" +
    "    </h2>\n" +
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
    "        <span ng-switch=\"status\">\n" +
    "\n" +
    "            <!-- Avatar -->\n" +
    "            <img ng-switch-when=\"uploaded\" src=\"{{ avatarSrc }}\" style=\"width: 100%\">\n" +
    "\n" +
    "            <!-- Avatar placeholder -->\n" +
    "            <i\n" +
    "                ng-switch-when=\"none\"\n" +
    "                class=\"fa fa-user\"\n" +
    "                style=\"padding: 30px 40px; font-size: 5em;\"></i>\n" +
    "\n" +
    "            <!-- Uploading notifier -->\n" +
    "            <i\n" +
    "                ng-switch-when=\"uploading\"\n" +
    "                class=\"fa fa-spin fa-spinner\"\n" +
    "                style=\"padding: 30px 40px; font-size: 5em;\"></i>\n" +
    "\n" +
    "        </span>\n" +
    "    </button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive-partials/ui-editable-fields/field-value-generic.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-editable-fields/field-value-generic.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div ng-show=\"state != 'editing'\" class=\"row no-gutter ui-editable-field-value\">\n" +
    "\n" +
    "    <!-- Edit icon -->\n" +
    "    <div class=\"col-sm-1 text-center\">\n" +
    "        <a ng-hide=\"isDisabled\" href=\"javascript:;\" class=\"edit-icon fa fa-pencil\"></a>\n" +
    "        <i ng-show=\"isDisabled\" class=\"edit-icon fa fa-ban\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Displayed value -->\n" +
    "    <div class=\"col-sm-11\">\n" +
    "        <a ng-hide=\"isDisabled\" href=\"javascript:;\" class=\"edit-text\">\n" +
    "            {{ display || model[key] }}\n" +
    "        </a>\n" +
    "        <b ng-show=\"isDisabled\">\n" +
    "            {{ display || model[key] }}\n" +
    "        </b>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive-partials/ui-editable-fields/field-value-timestamp.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-editable-fields/field-value-timestamp.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div ng-show=\"state != 'editing'\" class=\"row no-gutter ui-editable-field-value\">\n" +
    "\n" +
    "    <!-- Edit icon -->\n" +
    "    <div class=\"col-sm-1 text-center\">\n" +
    "        <a ng-hide=\"isDisabled\" href=\"javascript:;\" class=\"edit-icon fa fa-pencil\"></a>\n" +
    "        <i ng-show=\"isDisabled\" class=\"edit-icon fa fa-ban\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Displayed value -->\n" +
    "    <div class=\"col-sm-11\">\n" +
    "        <a ng-hide=\"isDisabled\" href=\"javascript:;\" class=\"edit-text\">\n" +
    "            {{ timestamp | date:format }}\n" +
    "        </a>\n" +
    "        <b ng-show=\"isDisabled\">\n" +
    "            {{ timestamp | date:format }}\n" +
    "        </b>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive-partials/ui-editable-fields/field-value-with-units.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-editable-fields/field-value-with-units.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div ng-show=\"state != 'editing'\" class=\"row no-gutter ui-editable-field-value\">\n" +
    "\n" +
    "    <!-- Edit icons -->\n" +
    "    <div class=\"col-sm-1 text-center\">\n" +
    "        <a ng-hide=\"isDisabled\" href=\"javascript:;\" class=\"edit-icon fa fa-pencil\"></a>\n" +
    "        <i ng-show=\"isDisabled\" class=\"edit-icon fa fa-ban\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Unit selector -->\n" +
    "    <div class=\"col-sm-1 text-center\">\n" +
    "        <div class=\"dropdown\">\n" +
    "            <a href=\"javascript:;\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\">\n" +
    "                <i class=\"fa fa-cog\" style=\"color: #ccc;\"></i>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\">\n" +
    "                <li ng-repeat=\"unit in units\">\n" +
    "                    <a ng-click=\"updateUnit(unit)\" href=\"javascript:;\">\n" +
    "                        {{ unit }}\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Displayed data -->\n" +
    "    <div class=\"col-sm-10\">\n" +
    "        <a href=\"javascript:;\" class=\"edit-text\">\n" +
    "            {{ data.displayStr }}\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive-partials/ui-editable-fields/field.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-editable-fields/field.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"row ui-editable-field\">\n" +
    "\n" +
    "    <!-- Field label -->\n" +
    "    <div class=\"col-sm-4 text-right\">\n" +
    "        {{ label }} <span ng-show=\"isRequired && state == 'editing'\">*</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-8\" ng-switch=\"inputType\">\n" +
    "\n" +
    "        <!-- Date -->\n" +
    "        <div ng-switch-when=\"date\">\n" +
    "            <ng-include src=\"'directive-partials/ui-editable-fields/field-value-timestamp.html'\"></ng-include>\n" +
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
    "            <ng-include src=\"'directive-partials/ui-editable-fields/field-value-timestamp.html'\"></ng-include>\n" +
    "\n" +
    "            <input\n" +
    "                ng-show=\"state == 'editing'\"\n" +
    "                ng-disabled=\"isDisabled\"\n" +
    "                ng-required=\"isRequired\"\n" +
    "                type=\"datetime\"\n" +
    "                class=\"form-control\">\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Length -->\n" +
    "        <div ng-switch-when=\"length\">\n" +
    "            <ng-include src=\"'directive-partials/ui-editable-fields/field-value-with-units.html'\"></ng-include>\n" +
    "\n" +
    "            <!-- Feet & inches -->\n" +
    "            <div class=\"row\" ng-show=\"state == 'editing' && config.unitForLength == 'ft/in'\">\n" +
    "                <div class=\"col-sm-6\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input\n" +
    "                            ng-model=\"data.lengthFeet\"\n" +
    "                            ng-disabled=\"isDisabled\"\n" +
    "                            ng-required=\"isRequired\"\n" +
    "                            ng-blur=\"updateModel()\"\n" +
    "                            ng-change=\"updateModel()\"\n" +
    "                            type=\"number\" min=\"1\" max=\"10\"\n" +
    "                            class=\"form-control\">\n" +
    "                        <span class=\"input-group-addon\">&apos;</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-6\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input\n" +
    "                            ng-model=\"data.lengthInches\"\n" +
    "                            ng-disabled=\"isDisabled\"\n" +
    "                            ng-required=\"isRequired\"\n" +
    "                            ng-blur=\"updateModel()\"\n" +
    "                            ng-change=\"updateModel()\"\n" +
    "                            type=\"number\" min=\"0\" max=\"11\"\n" +
    "                            class=\"form-control\">\n" +
    "                        <span class=\"input-group-addon\">&quot;</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- All other supported units -->\n" +
    "            <div class=\"input-group\" ng-show=\"state == 'editing' && config.unitForLength != 'ft/in'\">\n" +
    "                <span class=\"input-group-addon\">{{ config.unitForLength }}</span>\n" +
    "                <input\n" +
    "                    ng-model=\"data.lengthVal\"\n" +
    "                    ng-disabled=\"isDisabled\"\n" +
    "                    ng-required=\"isRequired\"\n" +
    "                    ng-blur=\"updateModel()\"\n" +
    "                    type=\"number\" step=\"0.01\"\n" +
    "                    class=\"form-control\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Gender -->\n" +
    "        <div ng-switch-when=\"gender\">\n" +
    "            <ng-include src=\"'directive-partials/ui-editable-fields/field-value-generic.html'\"></ng-include>\n" +
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
    "        <!-- Mass -->\n" +
    "        <div ng-switch-when=\"mass\">\n" +
    "            <ng-include src=\"'directive-partials/ui-editable-fields/field-value-with-units.html'\"></ng-include>\n" +
    "\n" +
    "            <!-- Edit field -->\n" +
    "            <div class=\"input-group\" ng-show=\"state == 'editing'\">\n" +
    "                <span class=\"input-group-addon\">{{ config.unitForMass }}</span>\n" +
    "                <input\n" +
    "                    ng-model=\"data.massVal\"\n" +
    "                    ng-disabled=\"isDisabled\"\n" +
    "                    ng-required=\"isRequired\"\n" +
    "                    ng-blur=\"updateModel()\"\n" +
    "                    type=\"number\" step=\"0.01\"\n" +
    "                    class=\"form-control\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Tag -->\n" +
    "        <div ng-switch-when=\"tag\">\n" +
    "            <ng-include src=\"'directive-partials/ui-editable-fields/field-value-generic.html'\"></ng-include>\n" +
    "\n" +
    "            <div ng-show=\"state == 'editing'\">\n" +
    "                <selectize\n" +
    "                    ng-model=\"data\"\n" +
    "                    class=\"form-control text-left\"\n" +
    "                    config=\"config\"\n" +
    "                    options=\"options\">\n" +
    "                </selectize>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Default -->\n" +
    "        <div ng-switch-default>\n" +
    "            <ng-include src=\"'directive-partials/ui-editable-fields/field-value-generic.html'\"></ng-include>\n" +
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

angular.module("directive-partials/ui-editable-fields/fields.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-editable-fields/fields.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"panel panel-default ui-editable-fields\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        {{ heading }}\n" +
    "\n" +
    "        <!-- Action buttons -->\n" +
    "        <div class=\"pull-right\">\n" +
    "            <span ng-click=\"save()\" ng-show=\"state == 'editing'\">\n" +
    "                Save &nbsp; <i class=\"fa fa-toggle-on\"></i>\n" +
    "            </span>\n" +
    "            <span ng-click=\"edit()\" ng-show=\"state == 'idle'\">\n" +
    "                Edit All Fields &nbsp; <i class=\"fa fa-toggle-off\"></i>\n" +
    "            </span>\n" +
    "            <span ng-show=\"state == 'saving'\" style=\"color: #ccc;\">\n" +
    "                <i class=\"fa fa-toggle-off\"></i>\n" +
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

angular.module("directive-partials/ui-editable-fields/standalone-field.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-editable-fields/standalone-field.html",
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
    "            <span ng-show=\"state == 'saving'\" style=\"color: #ccc;\">\n" +
    "                <i class=\"fa fa-toggle-off\"></i>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        <div class=\"row\" ng-switch=\"state\">\n" +
    "\n" +
    "            <!-- Editable field -->\n" +
    "            <div ng-switch-when=\"editing\" class=\"col-sm-12\">\n" +
    "                <textarea ng-model=\"model[key]\" class=\"form-control\"></textarea>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Working animation -->\n" +
    "            <div ng-switch-when=\"saving\" class=\"text-center\" style=\"padding: 20px 0;\">\n" +
    "                <i class=\"fa fa-spin fa-4x fa-spinner\"></i>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Displayed field -->\n" +
    "            <div ng-switch-default class=\"col-sm-12\">\n" +
    "                {{ model[key] || empty }}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive-partials/ui-movement-placeholder.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-movement-placeholder.html",
    "<div class=\"ui-movement-container four-three-aspect-ratio\">\n" +
    "    <div class=\"ui-movement-placeholder\">\n" +
    "        Movement Placeholder\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive-partials/ui-movement-preview.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-movement-preview.html",
    "<div class=\"ui-movement-container aspect-ratio aspect-4-3\">\n" +
    "    <div class=\"ui-movement-placeholder\">\n" +
    "        Movement Preview <br>\n" +
    "        <span style=\"color: #ccc\">\n" +
    "            In Development...\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive-partials/ui-page-title.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-page-title.html",
    "<!-- Title -->\n" +
    "<span class=\"ui-page-title-background\">\n" +
    "    <span class=\"ui-page-title-skew\">\n" +
    "        <span class=\"ui-page-title\">\n" +
    "            {{ title }} <i ng-show=\"icon\" ng-class=\"'fa fa-' + icon\"></i>\n" +
    "        </span>\n" +
    "    </span>\n" +
    "</span>\n" +
    "\n" +
    "<div class=\"clearfix\"></div>\n" +
    "");
}]);

angular.module("directive-partials/ui-taggable-input.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive-partials/ui-taggable-input.html",
    "<div class=\"ui-taggable-input\">\n" +
    "    <selectize\n" +
    "        ng-model=\"data\"\n" +
    "        class=\"form-control text-left\"\n" +
    "        config=\"config\"\n" +
    "        options=\"options\"\n" +
    "        placeholder=\"Start typing to add tags\">\n" +
    "    </selectize>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms-bak/demo/analysis.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/analysis.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms-bak/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<div class=\"page page-dashboard movement-pages\">\n" +
    "	<div>\n" +
    "\n" +
    "        <!-- Breadcrumbs -->\n" +
    "        <div ng-include src=\"'fms-bak/live/partials/breadcrumbs.html'\"></div>\n" +
    "\n" +
    "        <!-- Selected side -->\n" +
    "		<div\n" +
    "            ng-show=\"fms.current.iterations.length > 0\"\n" +
    "            ng-include src=\"'fms-bak/live/partials/iterations.html'\">\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Demo videos -->\n" +
    "        <div ng-include src=\"'fms-bak/demo/partials/analysis-layout-emphasized.html'\"></div>\n" +
    "\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms-bak/demo/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/index.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms-bak/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<div class=\"page page-dashboard movement-pages\">\n" +
    "	<div>\n" +
    "		{{ params }}\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms-bak/demo/partials/analysis-coronal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/analysis-coronal.html",
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

angular.module("fms-bak/demo/partials/analysis-layout-emphasized.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/analysis-layout-emphasized.html",
    "<div class=\"col-sm-12 panel-group panel-layout-emphasized\">\n" +
    "\n" +
    "    <!-- Emphasized view -->\n" +
    "    <div class=\"col-sm-9 no-gutter panel panel-default panel-emphasized\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <ng-include src=\"'fms-bak/live/partials/analysis-menu.html'\"></ng-include>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <ng-include src=\"'fms-bak/demo/partials/analysis-'+ fms.views[0] +'.html'\"></ng-include>\n" +
    "            </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Secondary views -->\n" +
    "    <div class=\"col-sm-3\">\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms-bak/demo/partials/analysis-'+ fms.views[1] +'.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms-bak/demo/partials/analysis-'+ fms.views[2] +'.html'\"></ng-include>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms-bak/demo/partials/analysis-sagittal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/analysis-sagittal.html",
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

angular.module("fms-bak/demo/partials/analysis-transverse.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/analysis-transverse.html",
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

angular.module("fms-bak/demo/partials/summary-content.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/summary-content.html",
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

angular.module("fms-bak/demo/partials/summary-layout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/summary-layout.html",
    "<div class=\"col-sm-12 panel-group\">\n" +
    "\n" +
    "    <div class=\"col-sm-9 no-gutter panel panel-default\" style=\"padding-left: 0px; height: 700px;\">\n" +
    "            <div class=\"col-sm-3\" style=\"height: 700px;\">\n" +
    "                <ng-include src=\"'fms-bak/demo/partials/summary-menu.html'\"></ng-include>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Demo summary content -->\n" +
    "            <div class=\"col-sm-9\" style=\"height: 700px;\">\n" +
    "                <ng-include src=\"'fms-bak/demo/partials/summary-content.html'\"></ng-include>\n" +
    "            </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-3\">\n" +
    "\n" +
    "        <!-- Movement overview -->\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms-bak/demo/partials/summary-movement-overview.html'\"></ng-include>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Overall score -->\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms-bak/demo/partials/summary-overall-scores.html'\"></ng-include>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Legend -->\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms-bak/live/partials/summary-legend.html'\"></ng-include>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms-bak/demo/partials/summary-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/summary-menu.html",
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

angular.module("fms-bak/demo/partials/summary-movement-overview.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/summary-movement-overview.html",
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

angular.module("fms-bak/demo/partials/summary-overall-scores.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/summary-overall-scores.html",
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

angular.module("fms-bak/demo/partials/test-coronal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/test-coronal.html",
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

angular.module("fms-bak/demo/partials/test-layout-emphasized.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/test-layout-emphasized.html",
    "<div class=\"col-sm-12 panel-group panel-layout-emphasized\">\n" +
    "\n" +
    "    <!-- Emphasized view -->\n" +
    "    <div class=\"col-sm-9 no-gutter panel panel-default panel-emphasized\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <ng-include src=\"'fms-bak/live/partials/test-menu.html'\"></ng-include>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <ng-include src=\"'fms-bak/demo/partials/test-'+ fms.views[0] +'.html'\"></ng-include>\n" +
    "            </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Secondary views -->\n" +
    "    <div class=\"col-sm-3\">\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms-bak/demo/partials/test-'+ fms.views[1] +'.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-12 panel panel-default\">\n" +
    "            <ng-include src=\"'fms-bak/demo/partials/test-'+ fms.views[2] +'.html'\"></ng-include>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms-bak/demo/partials/test-sagittal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/test-sagittal.html",
    "<div class=\"panel-heading text-right\">\n" +
    "    Side/Sagittal\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel-body\">\n" +
    "    <video class=\"demo-test\" style=\"margin: 0 20%; width: 60%;\">\n" +
    "        <!-- <source ng-src=\"{{ '../../../../demo/aslr/analysis/sagittal.webm?1' }}\" type=\"video/webm\"/>\n" +
    "        <source src=\"{{ '../../../../demo/aslr/analysis/sagittal.mp4?1' }}\" type=\"video/mp4\"/>\n" +
    "        <source ng-src=\"{{'../../../../demo/aslr/analysis/sagittal.webm'}}\" type=\"video/webm\"/>\n" +
    "        <source src=\"{{'../../../../demo/aslr/analysis/sagittal.mp4'}}\" type=\"video/mp4\"/> -->\n" +
    "        <source ng-src=\"{{'../../../../demo/aslr/left/sagittal.webm'}}\" type=\"video/webm\"/>\n" +
    "        <source src=\"{{'../../../../demo/aslr/left/sagittal.mp4'}}\" type=\"video/mp4\"/>\n" +
    "        Sorry, your browser doesn't support HTML5 video.\n" +
    "    </video>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms-bak/demo/partials/test-transverse.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/partials/test-transverse.html",
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

angular.module("fms-bak/demo/summary.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/summary.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms-bak/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<div class=\"page page-dashboard movement-pages\">\n" +
    "	<div>\n" +
    "\n" +
    "        <!-- Breadcrumbs -->\n" +
    "        <div ng-include src=\"'fms-bak/live/partials/breadcrumbs.html'\"></div>\n" +
    "\n" +
    "        <!-- Demo summary -->\n" +
    "        <div ng-include src=\"'fms-bak/demo/partials/summary-layout.html'\"></div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms-bak/demo/test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/demo/test.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms-bak/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<div class=\"page page-dashboard movement-pages\">\n" +
    "	<div>\n" +
    "\n" +
    "        <!-- Breadcrumbs -->\n" +
    "        <ng-include src=\"'fms-bak/live/partials/breadcrumbs.html'\"></ng-include>\n" +
    "\n" +
    "        <!-- Selected side -->\n" +
    "		<ng-include\n" +
    "            ng-show=\"fms.current.iterations.length > 0\"\n" +
    "            src=\"'fms-bak/live/partials/iterations.html'\">\n" +
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
    "        <ng-include src=\"'fms-bak/demo/partials/test-layout-emphasized.html'\"></ng-include>\n" +
    "\n" +
    "        <!-- Trials -->\n" +
    "        <ng-include src=\"'fms-bak/live/partials/test-trials.html'\"></ng-include>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("fms-bak/live/analysis.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/analysis.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms-bak/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<!-- Temporary placeholder -->\n" +
    "<ng-include src=\"'placeholder.html'\"></ng-include>\n" +
    "");
}]);

angular.module("fms-bak/live/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/index.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms-bak/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<!-- Temporary placeholder -->\n" +
    "<ng-include src=\"'placeholder.html' + assetVersion\"></ng-include>\n" +
    "");
}]);

angular.module("fms-bak/live/partials/analysis-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/partials/analysis-menu.html",
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

angular.module("fms-bak/live/partials/breadcrumbs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/partials/breadcrumbs.html",
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
    "        ng-click=\"global.browseTo.path('/fms/'+ (isDemo ? 'demo' : 'live') +'/'+ fms.current.id +'/test')\"\n" +
    "        ng-class=\"{'active': params.step == 'test'}\">\n" +
    "\n" +
    "        <a>Test</a>\n" +
    "    </li>\n" +
    "    <li\n" +
    "        ng-click=\"global.browseTo.path('/fms/'+ (isDemo ? 'demo' : 'live') +'/'+ fms.current.id +'/analysis')\"\n" +
    "        ng-class=\"{'active': params.step == 'analysis'}\">\n" +
    "        <a>Analysis</a>\n" +
    "    </li>\n" +
    "    <li\n" +
    "        ng-click=\"global.browseTo.path('/fms/'+ (isDemo ? 'demo' : 'live') +'/'+ fms.current.id +'/summary')\"\n" +
    "        ng-class=\"{'active': params.step == 'summary'}\">\n" +
    "\n" +
    "        <a>Summary</a>\n" +
    "    </li>\n" +
    "</ol>\n" +
    "");
}]);

angular.module("fms-bak/live/partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/partials/header.html",
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

angular.module("fms-bak/live/partials/iterations.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/partials/iterations.html",
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

angular.module("fms-bak/live/partials/summary-legend.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/partials/summary-legend.html",
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

angular.module("fms-bak/live/partials/summary-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/partials/summary-menu.html",
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

angular.module("fms-bak/live/partials/test-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/partials/test-menu.html",
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

angular.module("fms-bak/live/partials/test-trials.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/partials/test-trials.html",
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

angular.module("fms-bak/live/summary.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/summary.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms-bak/live/partials/header.html'\"></div>\n" +
    "\n" +
    "<!-- Temporary placeholder -->\n" +
    "<ng-include src=\"'placeholder.html'\"></ng-include>\n" +
    "");
}]);

angular.module("fms-bak/live/test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fms-bak/live/test.html",
    "<!-- Header -->\n" +
    "<div ng-include src=\"'fms-bak/live/partials/header.html'\"></div>\n" +
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
    "    <header>\n" +
    "        <h1>\n" +
    "            Teams\n" +
    "            <i class=\"fa fa-users\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "    </header>\n" +
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
    "                        ng-click=\"global.browseTo.path('group/create')\"\n" +
    "                        class=\"btn btn-default\">Add a Team</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <br>\n" +
    "    <br>\n" +
    "\n" +
    "    <a\n" +
    "        ng-repeat=\"group in global.state.group.list\"\n" +
    "        ng-show=\"group.id\"\n" +
    "        ng-click=\"global.browseTo.group(group)\"\n" +
    "        href=\"javascript:;\"\n" +
    "        class=\"btn btn-primary btn-metro\"\n" +
    "        style=\"background-image: url({{ group.avatarSrc || '' }});background-size: cover;\">\n" +
    "\n" +
    "        <span>{{ group.name | characters:15 }}</span>\n" +
    "    </a>\n" +
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
    "    <header>\n" +
    "        <h1>\n" +
    "            {{ group.name }}\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "    </header>\n" +
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
    "                    ng-show=\"global.getSelectedGroup().id > 0\"\n" +
    "                    data-toggle=\"modal\"\n" +
    "                    data-target=\"#deleteGroupConfirmation\"\n" +
    "                    class=\"btn btn-danger\">\n" +
    "\n" +
    "                    Delete <b>{{ global.getSelectedGroup().name }}</b>\n" +
    "                </button>\n" +
    "\n" +
    "                <!-- Delete confirmation -->\n" +
    "                <div class=\"modal fade\" id=\"deleteGroupConfirmation\">\n" +
    "                    <div class=\"modal-dialog\">\n" +
    "                        <div class=\"modal-content\">\n" +
    "                            <div class=\"modal-body\">\n" +
    "                                <p ng-show=\"global.state.profile.list.length > 0\">\n" +
    "                                    Are you sure you want to delete <b>{{ global.getSelectedGroup().name }}</b>\n" +
    "                                    and the {{ global.state.profile.filtered.length }}\n" +
    "                                    associated athletes?\n" +
    "                                </p>\n" +
    "                                <p ng-show=\"global.state.profile.list.length === 0\">\n" +
    "                                    Are you sure you want to delete <b>{{ global.getSelectedGroup().name }}</b>?\n" +
    "                                </p>\n" +
    "                            </div>\n" +
    "                            <div class=\"modal-footer text-center\">\n" +
    "                                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\n" +
    "                                    Cancel\n" +
    "                                </button>\n" +
    "                                <button ng-click=\"deleteGroup()\" type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">\n" +
    "                                    Yes, delete {{ global.getSelectedGroup().name }}\n" +
    "                                </button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Create profile button -->\n" +
    "                <button\n" +
    "                    ng-click=\"global.browseTo.path('profile/create')\"\n" +
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
    "                        data-src=\"global.state.group.list[global.store.groupId].avatarSrc\">\n" +
    "                    </ui-avatar>\n" +
    "                </div>\n" +
    "    		</div>\n" +
    "\n" +
    "            <!-- Group details -->\n" +
    "            <div class=\"col-sm-12 col-md-6\">\n" +
    "                <ui-editable-fields\n" +
    "                    data-model=\"global.state.group.list[global.store.groupId]\"\n" +
    "                    data-save=\"saveGroupDetails\"\n" +
    "                    data-save-callback=\"saveGroupDetailsCallback\"\n" +
    "                    data-heading=\"Details for {{ global.state.group.list[global.store.groupId].name }}\">\n" +
    "\n" +
    "                    <!-- Group name -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Name\"\n" +
    "                        data-key=\"name\"\n" +
    "                        data-required=\"true\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Tags -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Sport\"\n" +
    "                        data-key=\"tags\"\n" +
    "                        data-type=\"tag\">\n" +
    "                    </ui-editable-field>\n" +
    "                </ui-editable-fields>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section>\n" +
    "\n" +
    "        <!-- Profile list -->\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                Athletes in {{ global.getSelectedGroup().name }}\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div ng-show=\"global.state.profile.filtered.length === 0\">\n" +
    "                            The <b>{{ global.getSelectedGroup().name }}</b> do not have any\n" +
    "                            members yet. Add one above to get started!\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <a\n" +
    "                            href=\"javascript:;\"\n" +
    "                            class=\"btn btn-primary btn-metro\"\n" +
    "                            ng-repeat=\"profile in global.state.profile.filtered\"\n" +
    "                            ng-click=\"global.browseTo.profile(profile)\"\n" +
    "                            style=\"background-image: url({{ profile.avatarSrc || '' }});background-size: cover;\">\n" +
    "\n" +
    "                            <div class=\"btn-title\">{{ profile.firstName }}</div>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section ng-show=\"global.isLocal\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        Debug\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        Avatar: {{ global.getSelectedGroup().avatarSrc ? 'has avatar' : 'no avatar' }} <br>\n" +
    "                        Global: {{ global.getSelectedGroup().name }} <br>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "</div>\n" +
    "\n" +
    "<!-- No group selected -->\n" +
    "<div ng-show=\"global.getSelectedGroup().id === 0\" class=\"page\">\n" +
    "    <h1 class=\"text-center\">No group selected</h1>\n" +
    "    <br>\n" +
    "\n" +
    "    <div class=\"text-center\">\n" +
    "        Please select a group to view its details.\n" +
    "        <br>\n" +
    "\n" +
    "        You can also take this opportunity to\n" +
    "        <a href=\"#/group/create\">create one</a>.\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("import/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("import/index.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"page import-page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            Upload <i class=\"fa fa-cloud-upload\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "\n" +
    "        <!-- Append profile name to page title -->\n" +
    "        <div ng-show=\"global.getSelectedProfile().id > 0\" class=\"h1-append\">\n" +
    "            for\n" +
    "            <a ng-click=\"global.store.profileId = 0\" href=\"javascript:;\">\n" +
    "                {{ global.getSelectedProfile().firstName }}\n" +
    "                {{ global.getSelectedProfile().lastName }}\n" +
    "                <i class=\"fa fa-refresh\"></i>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <!-- Import page -->\n" +
    "    <div ng-show=\"global.getSelectedProfile().id > 0\">\n" +
    "        <div class=\"movement-import row\">\n" +
    "\n" +
    "            <!-- Import new movement -->\n" +
    "            <div ng-show=\"global.data.isImporting === false\" class=\"col-xs-12 text-center\">\n" +
    "                <button\n" +
    "                    ngf-select=\"startImport($files)\"\n" +
    "                    ngf-drop=\"startImport($files)\"\n" +
    "                    accept=\".csv,.txt\"\n" +
    "                    ngf-max-size=\"2MB\"\n" +
    "                    multiple\n" +
    "                    class=\"btn btn-primary btn-circle btn-lg\">\n" +
    "\n" +
    "                    <i class=\"fa fa-plus\"></i>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Uploading movement file -->\n" +
    "            <div ng-show=\"global.data.isImporting === true\">\n" +
    "\n" +
    "                <!-- Import status -->\n" +
    "                <br>\n" +
    "                <br>\n" +
    "                <h3 class=\"text-center\">\n" +
    "                    {{ global.data.import.status }}\n" +
    "\n" +
    "                    <br>\n" +
    "                    <small ng-show=\"global.data.import.queue.length > 1\">\n" +
    "                        {{ global.data.import.queue.length }} movement files left.\n" +
    "                    </small>\n" +
    "                    <small ng-show=\"global.data.import.queue.length <= 1\">\n" +
    "                        Almost done...\n" +
    "                    </small>\n" +
    "                </h3>\n" +
    "                <br>\n" +
    "\n" +
    "                <!-- Import progress -->\n" +
    "                <div class=\"col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4\">\n" +
    "                    <div class=\"progress\">\n" +
    "                        <div\n" +
    "                            class=\"progress-bar progress-bar-info progress-bar-striped active\"\n" +
    "                            role=\"progressbar\"\n" +
    "                            aria-valuenow=\"{{ global.data.import.progress }}\"\n" +
    "                            aria-valuemin=\"0\"\n" +
    "                            aria-valuemax=\"100\"\n" +
    "                            style=\"min-width: 2em;\"\n" +
    "                            ng-style=\"{width: global.data.import.progress + '%'}\">\n" +
    "\n" +
    "                            {{ global.data.import.progress }}%\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Import actions -->\n" +
    "                <br>\n" +
    "                <div class=\"col-xs-12 text-center\">\n" +
    "                    <div class=\"btn-group\">\n" +
    "                        <button\n" +
    "                            ng-disabled=\"global.data.import.imported.length === 0\"\n" +
    "                            ng-click=\"global.data.import.imported = []\"\n" +
    "                            type=\"button\"\n" +
    "                            class=\"btn btn-default\">\n" +
    "\n" +
    "                            Clear List\n" +
    "                        </button>\n" +
    "\n" +
    "                        <button\n" +
    "                            ng-disabled=\"global.data.import.queue.length <= 1\"\n" +
    "                            ng-click=\"global.data.import.queue = []\"\n" +
    "                            type=\"button\"\n" +
    "                            class=\"btn btn-danger\">\n" +
    "\n" +
    "                            Stop Import\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-show=\"global.data.import.imported.length > 0\">\n" +
    "            <!-- List of uploaded movements -->\n" +
    "            <div ng-repeat=\"file in global.data.import.imported\" class=\"movement-import row\">\n" +
    "                <div class=\"col-md-3 col-md-offset-1\">\n" +
    "\n" +
    "                    <!-- Movement title -->\n" +
    "                    <input\n" +
    "                        ng-model=\"file.title\"\n" +
    "                        type=\"text\"\n" +
    "                        class=\"form-control movement-title\"\n" +
    "                        placeholder=\"Movement Title\">\n" +
    "\n" +
    "                    <!-- Tags -->\n" +
    "                    <ui-taggable-input\n" +
    "                        data-model=\"file\"\n" +
    "                        data-key=\"tags\"\n" +
    "                        data-max-tags=\"20\">\n" +
    "                    </ui-taggable-input>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-md-3\">\n" +
    "\n" +
    "                    <!-- Movement preview -->\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-xs-12\">\n" +
    "                            <ui-movement-preview data-aspect-ratio=\"4:3\"></ui-movement-preview>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Delete movement -->\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-xs-12\">\n" +
    "                            <a ng-click=\"deleteMovement(file.id)\" href=\"javascript:;\" class=\"pull-right\">\n" +
    "                                Delete Movement <i class=\"fa fa-trash-o\"></i>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Edit movement -->\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <div class=\"movement-edit row\">\n" +
    "\n" +
    "                        <!-- Thumbnail link -->\n" +
    "                        <div class=\"col-md-5 text-right\">\n" +
    "                            <a ng-click=\"selectThumbnail()\" href=\"javascript:;\">\n" +
    "                                Choose Thumbnail <i class=\"fa fa-picture-o\"></i>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"col-md-1 text-center\">\n" +
    "                            <i class=\"fa fa-angle-double-right\"></i>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Video edit link -->\n" +
    "                        <div class=\"col-md-5 text-left\">\n" +
    "                            <a ng-click=\"editMovement()\" href=\"javascript:;\">\n" +
    "                                Edit Video <i class=\"fa fa-pencil\"></i>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Clear button -->\n" +
    "            <div class=\"movement-import row\">\n" +
    "                <div class=\"col-sm-12 text-center\">\n" +
    "                    <button\n" +
    "                        ng-click=\"global.data.import.imported = []\"\n" +
    "                        type=\"button\"\n" +
    "                        class=\"btn btn-default\">\n" +
    "\n" +
    "                        Clear List\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- No recently uploaded movement -->\n" +
    "        <div\n" +
    "            ng-show=\"global.data.import.imported.length === 0 && global.data.isImporting === false\"\n" +
    "            class=\"col-md-6 col-md-offset-3 text-center\">\n" +
    "\n" +
    "            <h3>There are no movements to display.</h3>\n" +
    "            Once you upload or capture a new movement, it will show up here.\n" +
    "            <br><br>\n" +
    "\n" +
    "            <b>Go ahead and use the <i class=\"fa fa-plus fa-lg fa-fw\"></i> button above to start.</b>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- No profile selected -->\n" +
    "    <!-- <div ng-show=\"global.getSelectedProfile().id === 0\">\n" +
    "        <div ng-include=\"'partials/select-profile.html'\"></div>\n" +
    "    </div> -->\n" +
    "    <div ng-show=\"global.getSelectedProfile().id === 0\">\n" +
    "        <h3 class=\"text-center\">Select a profile to get started</h3>\n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"col-md-4 col-md-offset-4 text-center\">\n" +
    "            <ui-profile-lookup\n" +
    "                profiles=\"global.state.profile.list\"\n" +
    "                select-profile=\"global.selectProfile(profile)\">\n" +
    "            </ui-profile-lookup>\n" +
    "            <br>\n" +
    "\n" +
    "            You can also take this opportunity to\n" +
    "            <a href=\"#/profile/create\">create one</a>.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("movement-editor/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("movement-editor/footer.html",
    "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n" +
    "<button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Save changes</button>\n" +
    "");
}]);

angular.module("movement-editor/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("movement-editor/index.html",
    "<h3 style=\"color: #ccc; text-align: center; margin: 100px auto\">\n" +
    "    In Development.\n" +
    "</h3>\n" +
    "");
}]);

angular.module("movements/analysis/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("movements/analysis/index.html",
    "<div class=\"page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            Analyze <i class=\"fa fa-line-chart\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "    </header>\n" +
    "\n" +
    "    <h2 style=\"text-align: center; color: #ccc;\">\n" +
    "        In Development\n" +
    "    </h2>\n" +
    "</div>\n" +
    "");
}]);

angular.module("movements/comparison/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("movements/comparison/index.html",
    "<div class=\"page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            Compare\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "    </header>\n" +
    "\n" +
    "    <h2 style=\"text-align: center; color: #ccc;\">\n" +
    "        In Development\n" +
    "    </h2>\n" +
    "</div>\n" +
    "");
}]);

angular.module("movements/explorer/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("movements/explorer/index.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"page movements-page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            Organize\n" +
    "            <i class=\"fa fa-th\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "\n" +
    "        <div class=\"btn-toolbar pull-right\" role=\"toolbar\">\n" +
    "\n" +
    "            <!-- Create new folder -->\n" +
    "            <div class=\"btn-group\">\n" +
    "                <button ng-show=\"rootProfile\" type=\"button\" class=\"btn btn-default\">\n" +
    "                    <i class=\"fa fa-plus\"></i> New Folder\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Sorting -->\n" +
    "            <div class=\"btn-group\">\n" +
    "                <div class=\"dropdown\">\n" +
    "                    <button\n" +
    "                        class=\"btn btn-default dropdown-toggle\"\n" +
    "                        type=\"button\"\n" +
    "                        id=\"sortMenu\"\n" +
    "                        data-toggle=\"dropdown\"\n" +
    "                        aria-haspopup=\"true\"\n" +
    "                        aria-expanded=\"false\">\n" +
    "\n" +
    "                        Sort <span class=\"caret\"></span>\n" +
    "                    </button>\n" +
    "\n" +
    "                    <ul class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"sortMenu\">\n" +
    "                        <li>\n" +
    "                            <a href=\"#\">\n" +
    "                                Alphabetically\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <a href=\"#\">\n" +
    "                                By Date\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Layout selector -->\n" +
    "            <div class=\"btn-group\" role=\"group\">\n" +
    "                <button\n" +
    "                    ng-repeat=\"btn in layout.list\"\n" +
    "                    ng-click=\"layout.name = btn.name\"\n" +
    "                    ng-class=\"{'btn-primary': btn.name == layout.name, 'btn-default': btn.name != layout.name}\"\n" +
    "                    type=\"button\"\n" +
    "                    class=\"btn\">\n" +
    "\n" +
    "                    <i ng-class=\"'fa-' + btn.icon\" class=\"fa\"></i>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <!-- Main container -->\n" +
    "    <div\n" +
    "        ng-show=\"global.state.profile.list.length > 0 || global.data.isFetchingProfiles === true\"\n" +
    "        class=\"file-explorer-container\">\n" +
    "\n" +
    "        <header>\n" +
    "        </header>\n" +
    "\n" +
    "        <!-- Movements and folders -->\n" +
    "        <section\n" +
    "            ng-show=\"global.data.isFetchingMovementData === false\"\n" +
    "            ng-include=\"'movements/explorer/partials/' + layout.name + '-layout.html'\"\n" +
    "            ng-class=\"layout.name + '-layout'\">\n" +
    "        </section>\n" +
    "\n" +
    "        <!-- Loading notice -->\n" +
    "        <section\n" +
    "            ng-show=\"global.data.isFetchingMovementData === true\n" +
    "                || global.data.isFetchingProfiles === true\">\n" +
    "            <div class=\"text-center\" style=\"margin: 60px auto\">\n" +
    "                <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n" +
    "            </div>\n" +
    "        </section>\n" +
    "\n" +
    "        <footer>\n" +
    "            <i class=\"fa fa-compass fa-fw\"></i>\n" +
    "            <span>\n" +
    "                {{ path }}\n" +
    "            </span>\n" +
    "        </footer>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- No profile exists -->\n" +
    "    <div\n" +
    "        ng-show=\"global.data.isFetchingProfiles === false\n" +
    "            && global.state.profile.list.length === 0\"\n" +
    "        class=\"text-center\">\n" +
    "\n" +
    "        <h3 class=\"text-center\">You do not have any profiles yet.</h3>\n" +
    "        <br>\n" +
    "\n" +
    "        Once you create a profile, you can start uploading and organizing your movements here.\n" +
    "        <br>\n" +
    "        <br>\n" +
    "\n" +
    "        Take this opportunity to <a href=\"#/profile/create\">create one</a>.\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("movements/explorer/partials/details-layout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("movements/explorer/partials/details-layout.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"\">\n" +
    "\n" +
    "    <!-- Header -->\n" +
    "    <div class=\"row header\">\n" +
    "\n" +
    "        <!-- Checkbox -->\n" +
    "        <div class=\"col-xs-2 col-md-1 text-right\">\n" +
    "            <a href=\"javascript:;\">\n" +
    "                <i class=\"fa fa-square-o\"></i>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <div class=\"col-xs-10 col-md-8\">\n" +
    "            Title\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Created date -->\n" +
    "        <div class=\"col-md-3 hidden-xs text-center\">\n" +
    "            Date\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Parent folder -->\n" +
    "    <div ng-show=\"parentFolder\" class=\"row\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <div class=\"col-xs-10 col-xs-offset-2 col-md-11 col-md-offset-1\">\n" +
    "            <a href=\"{{ parentFolder.href }}\">\n" +
    "                <i class=\"fa fa-level-up\"></i> Parent Folder\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Other folders -->\n" +
    "    <div ng-repeat=\"folder in folders\" class=\"row\">\n" +
    "\n" +
    "        <!-- Checkbox -->\n" +
    "        <div class=\"col-xs-2 col-md-1 text-right\">\n" +
    "            <a href=\"javascript:;\">\n" +
    "                <i class=\"fa fa-square-o\"></i>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <div class=\"col-xs-10 col-md-11\">\n" +
    "            <a href=\"{{ folder.href }}\">\n" +
    "                <i class=\"fa fa-folder-open fa-fw\"></i> {{ folder.name | characters:40 }}\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Movements -->\n" +
    "    <div ng-repeat=\"movement in movements\" class=\"row\">\n" +
    "\n" +
    "        <!-- Checkbox -->\n" +
    "        <div class=\"col-xs-2 col-md-1 text-right\">\n" +
    "            <a href=\"javascript:;\">\n" +
    "                <i class=\"fa fa-square-o\"></i>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <div class=\"col-xs-10 col-md-8\">\n" +
    "            <a href=\"javascript:;\">\n" +
    "                {{ movement.title | characters:40 }}\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Created date -->\n" +
    "        <div class=\"col-md-3 hidden-xs text-center\">\n" +
    "            {{ movement.createdAt | mysqlDate:'MMMM d, yyyy (h:mm a)' }}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- No movements or folders to show -->\n" +
    "    <div ng-show=\"folders.length === 0 && movements.length === 0\" class=\"row text-center\">\n" +
    "\n" +
    "        <div class=\"col-xs-12\" style=\"margin-top: 20px; margin-bottom: 20px;\">\n" +
    "            <h3>There are no movements to display.</h3>\n" +
    "            Once you upload or capture a new movement, it will show up here.\n" +
    "            <br>\n" +
    "\n" +
    "            Start by <b><a href=\"#/movements/upload\">importing</a></b> your own movements.\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("movements/explorer/partials/large-tiles-layout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("movements/explorer/partials/large-tiles-layout.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "\n" +
    "    <!-- Parent folder -->\n" +
    "    <div ng-show=\"parentFolder\" class=\"col-xs-6 col-md-4 col-lg-3\">\n" +
    "        <a href=\"{{ parentFolder.href }}\" class=\"folder\">\n" +
    "            <i class=\"fa fa-hand-o-left fa-3x\"></i>\n" +
    "            <span class=\"name\">\n" +
    "                Back\n" +
    "            </span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Other folders -->\n" +
    "    <div ng-repeat=\"folder in folders\" class=\"col-xs-6 col-md-4 col-lg-3\">\n" +
    "        <a href=\"{{ folder.href }}\" class=\"folder\">\n" +
    "            <i class=\"fa fa-folder-open fa-3x\"></i>\n" +
    "            <span class=\"name\">\n" +
    "                {{ folder.name | characters:25 }}\n" +
    "            </span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Movements -->\n" +
    "    <div ng-repeat=\"movement in movements\" class=\"col-xs-6 col-md-4 col-lg-3\">\n" +
    "        <div class=\"aspect-ratio aspect-4-3 active-element text-center\">\n" +
    "            <div>\n" +
    "\n" +
    "                <!-- Movement preview -->\n" +
    "                <ui-movement-preview data-aspect-ratio=\"4:3\"></ui-movement-preview>\n" +
    "\n" +
    "                <div class=\"tools text-left\">\n" +
    "\n" +
    "                    <!-- Movement date -->\n" +
    "                    <span style=\"color: #aaa\">\n" +
    "                        {{ movement.createdAt | mysqlDate : 'MMMM d, h:mma' }}\n" +
    "                    </span>\n" +
    "                    <br>\n" +
    "\n" +
    "                    <!-- Movement title -->\n" +
    "                    <span style=\"color: #999\">\n" +
    "                        {{ movement.title | characters:25 }}\n" +
    "                    </span>\n" +
    "\n" +
    "                    <!-- Movement actions -->\n" +
    "                    <div class=\"pull-right\">\n" +
    "                        <div class=\"btn-group hidden-tools\">\n" +
    "                            <button\n" +
    "                                type=\"button\"\n" +
    "                                class=\"btn btn-default dropdown-toggle\"\n" +
    "                                data-toggle=\"dropdown\"\n" +
    "                                aria-haspopup=\"true\"\n" +
    "                                aria-expanded=\"false\">\n" +
    "                                <i class=\"caret\"></i>\n" +
    "                            </button>\n" +
    "\n" +
    "                            <ul class=\"dropdown-menu\">\n" +
    "                                <li>\n" +
    "                                    <a href=\"#/analyze\">Analyze</a>\n" +
    "                                </li>\n" +
    "                                <li>\n" +
    "                                    <a href=\"#/compare\">Compare</a>\n" +
    "                                </li>\n" +
    "                                <li>\n" +
    "                                    <a\n" +
    "                                        ng-click=\"shareMovement(movement)\"\n" +
    "                                        href=\"javascript:;\">\n" +
    "                                        Share\n" +
    "                                    </a>\n" +
    "                                </li>\n" +
    "                                <li>\n" +
    "                                    <a\n" +
    "                                        ng-click=\"editMovement(movement)\"\n" +
    "                                        href=\"javascript:;\">\n" +
    "                                        Edit\n" +
    "                                    </a>\n" +
    "                                </li>\n" +
    "                                <li role=\"separator\" class=\"divider\"></li>\n" +
    "                                <li>\n" +
    "                                    <a\n" +
    "                                        ng-click=\"deleteMovement(movement)\"\n" +
    "                                        href=\"javascript:;\">\n" +
    "                                        Delete\n" +
    "                                    </a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- No movements or folders to show -->\n" +
    "    <div\n" +
    "        ng-show=\"folders.length === 0 && movements.length === 0\"\n" +
    "        class=\"col-xs-6 col-md-8 col-lg-9\"\n" +
    "        style=\"margin-top: 35px\">\n" +
    "\n" +
    "        <h3>There are no movements to display.</h3>\n" +
    "        Once you upload or capture a new movement, it will show up here.\n" +
    "        <br>\n" +
    "        <br>\n" +
    "\n" +
    "        Start by <b><a href=\"#/movements/upload\">importing</a></b> your own movements.\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("movements/explorer/partials/small-tiles-layout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("movements/explorer/partials/small-tiles-layout.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "\n" +
    "    <!-- Parent folder -->\n" +
    "    <div ng-show=\"parentFolder\" class=\"col-xs-4 col-md-3 col-lg-1\">\n" +
    "        <a href=\"{{ parentFolder.href }}\" class=\"folder\">\n" +
    "            <i class=\"fa fa-hand-o-left fa-2x\"></i>\n" +
    "            <span class=\"name\">\n" +
    "                Back\n" +
    "            </span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Other folders -->\n" +
    "    <div ng-repeat=\"folder in folders\" class=\"col-xs-4 col-md-3 col-lg-1\">\n" +
    "        <a href=\"{{ folder.href }}\" class=\"folder\">\n" +
    "            <i class=\"fa fa-folder-open fa-2x\"></i>\n" +
    "            <span class=\"name\">\n" +
    "                {{ folder.name | characters:20 }}\n" +
    "            </span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Movements -->\n" +
    "    <div ng-repeat=\"movement in movements\" class=\"col-xs-4 col-md-3 col-lg-1\">\n" +
    "        <span class=\"file\">\n" +
    "            <i class=\"fa fa-files-o fa-2x\"></i>\n" +
    "            <span class=\"name\">\n" +
    "                {{ movement.title | characters:20 }}\n" +
    "            </span>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- No movements or folders to show -->\n" +
    "    <div\n" +
    "        ng-show=\"folders.length === 0 && movements.length === 0\"\n" +
    "        class=\"col-xs-8 col-md-9 col-lg-11 text-center\">\n" +
    "\n" +
    "        <h3>There are no movements to display.</h3>\n" +
    "        Once you upload or capture a new movement, it will show up here.\n" +
    "        <br>\n" +
    "\n" +
    "        Start by <b><a href=\"#/movements/upload\">importing</a></b> your own movements.\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/breadcrumbs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/breadcrumbs.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<ol class=\"breadcrumb-alt\">\n" +
    "    <li>\n" +
    "        <a class=\"active\" href=\"#/dashboard\">\n" +
    "            Dashboard\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li ng-show=\"global.store.groupId > 0\">\n" +
    "        <a class=\"active\" href=\"#/group/list\">\n" +
    "            Teams\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li ng-show=\"isProfilePage && global.store.groupId > 0\">\n" +
    "        <a class=\"active\" href=\"javascript:;\" ng-click=\"global.browseTo.group()\">\n" +
    "            {{ global.state.group.list[global.store.groupId].name }}\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li ng-show=\"currentPath == '/profile/view' && global.store.profileId > 0\">\n" +
    "        <a class=\"active\" href=\"javascript:;\" ng-click=\"global.browseTo.profile()\">\n" +
    "            {{ global.state.profile.list[global.store.profileId].firstName }}\n" +
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

angular.module("partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/header.html",
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
    "			<li>\n" +
    "				<a href=\"#/\" data-toggle-min-nav class=\"toggle-min\">\n" +
    "                    <i class=\"fa fa-bars\"></i>\n" +
    "                </a>\n" +
    "			</li>\n" +
    "\n" +
    "            <!-- Account -->\n" +
    "            <li ng-show=\"global.isLocal\" class=\"dropdown text-normal nav-profile\">\n" +
    "                <a\n" +
    "                    href=\"javascript:;\"\n" +
    "                    class=\"dropdown-toggle\"\n" +
    "                    id=\"menuAccountDropdown\"\n" +
    "                    data-toggle=\"dropdown\"\n" +
    "                    aria-haspopup=\"true\"\n" +
    "                    aria-expanded=\"true\">\n" +
    "\n" +
    "                    <i class=\"fa fa-user\"></i>\n" +
    "                </a>\n" +
    "\n" +
    "                <!-- Account links -->\n" +
    "                <div\n" +
    "                    class=\"dropdown-menu with-arrow pull-left panel panel-default\"\n" +
    "                    aria-labelledby=\"menuAccountDropdown\">\n" +
    "\n" +
    "                    <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"#/account\">\n" +
    "                                <i class=\"fa fa-user color-info\"></i>\n" +
    "                                <span>My Account</span>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a ng-click=\"global.endSession()\" href=\"javascript:;\">\n" +
    "                                <i class=\"fa fa-sign-out fa-fw\"></i>\n" +
    "                                <span>Log out</span>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "		</ul>\n" +
    "\n" +
    "        <ul class=\"nav-right list-unstyled\">\n" +
    "\n" +
    "            <!-- Search input -->\n" +
    "            <li>\n" +
    "                <div ng-controller=\"SearchController\" class=\"search-input\">\n" +
    "                    <selectize\n" +
    "                        ng-model=\"model\"\n" +
    "                        class=\"form-control\"\n" +
    "                        config=\"config\"\n" +
    "                        options=\"options\">\n" +
    "                    </selectize>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "\n" +
    "            <!-- Notifications -->\n" +
    "            <li ng-show=\"global.isLocal\" class=\"dropdown\">\n" +
    "                <a\n" +
    "                    href=\"javascript:;\"\n" +
    "                    class=\"dropdown-toggle onboarding-general\"\n" +
    "                    id=\"menuAccountDropdown\"\n" +
    "                    data-toggle=\"dropdown\"\n" +
    "                    aria-haspopup=\"true\"\n" +
    "                    aria-expanded=\"true\"\n" +
    "                    data-intro=\"Whenever you do something in the app, it will show up as a notification here\">\n" +
    "\n" +
    "                    <i class=\"fa fa-bell fa-fw\"></i>\n" +
    "                    <span>Notifications</span>\n" +
    "                </a>\n" +
    "\n" +
    "                <div\n" +
    "                    class=\"dropdown-menu with-arrow pull-right panel panel-default\"\n" +
    "                    aria-labelledby=\"menuNotificationsDropdown\">\n" +
    "\n" +
    "                    <!-- Notifications header -->\n" +
    "                    <div class=\"panel-heading\">\n" +
    "                        You have 2 notifications.\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- List of notifications -->\n" +
    "                    <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"pull-left media-icon\">\n" +
    "                                    <span class=\"circle-icon sm bg-success\">\n" +
    "                                        <i class=\"fa fa-bell-o\"></i>\n" +
    "                                    </span>\n" +
    "                                </span>\n" +
    "\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">New tasks needs to be done</span>\n" +
    "                                    <span class=\"text-muted block\">2min ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"pull-left media-icon\">\n" +
    "                                    <span class=\"circle-icon sm bg-info\">\n" +
    "                                        <i class=\"fa fa-bell-o\"></i>\n" +
    "                                    </span>\n" +
    "                                </span>\n" +
    "\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">Change your password</span>\n" +
    "                                    <span class=\"text-muted\">3 hours ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li class=\"list-group-item\">\n" +
    "                            <a href=\"javascript:;\" class=\"media\">\n" +
    "                                <span class=\"pull-left media-icon\">\n" +
    "                                    <span class=\"circle-icon sm bg-danger\">\n" +
    "                                        <i class=\"fa fa-bell-o\"></i>\n" +
    "                                    </span>\n" +
    "                                </span>\n" +
    "\n" +
    "                                <div class=\"media-body\">\n" +
    "                                    <span class=\"block\">New feature added</span>\n" +
    "                                    <span class=\"text-muted\">9 hours ago</span>\n" +
    "                                </div>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "\n" +
    "                    <!-- Notifications footer -->\n" +
    "                    <div class=\"panel-footer\">\n" +
    "                        <a href=\"javascript:;\">\n" +
    "                            Show all notifications.\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "\n" +
    "            <!-- App settings -->\n" +
    "            <li>\n" +
    "                <a\n" +
    "                    href=\"#/config\"\n" +
    "                    class=\"onboarding-general\"\n" +
    "                    data-step=\"4\"\n" +
    "                    data-intro=\"Click this button to modify your app settings\">\n" +
    "\n" +
    "                    <i class=\"fa fa-cogs fa-fw\"></i>\n" +
    "                    <span>Settings</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <!-- Onboarding -->\n" +
    "            <li>\n" +
    "                <a\n" +
    "                    ng-click=\"global.onboarding.general()\"\n" +
    "                    href=\"javascript:;\"\n" +
    "                    class=\"onboarding-general\"\n" +
    "                    data-step=\"6\"\n" +
    "                    data-intro=\"Click here whenever you want to see this again\">\n" +
    "\n" +
    "                    <i class=\"fa fa-question fa-fw\"></i>\n" +
    "                    <span>Help</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <!-- Sign out -->\n" +
    "            <li>\n" +
    "                <a\n" +
    "                    ng-click=\"global.endSession()\"\n" +
    "                    href=\"javascript:;\"\n" +
    "                    class=\"onboarding-general\"\n" +
    "                    data-step=\"5\"\n" +
    "                    data-intro=\"Use this button when you're ready to log out\">\n" +
    "\n" +
    "                    <i class=\"fa fa-sign-out fa-fw\"></i>\n" +
    "                    <span>Log out</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "	</div>\n" +
    "</header>\n" +
    "");
}]);

angular.module("partials/modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/modal.html",
    "<div class=\"modal fade\" id=\"overlay-screen\" tabindex=\"-1\" data-ng-controller=\"ModalController\">\n" +
    "    <div class=\"modal-dialog modal-responsive\">\n" +
    "        <div class=\"modal-content\">\n" +
    "\n" +
    "            <!-- Overlay title -->\n" +
    "            <header class=\"modal-header\">\n" +
    "                <button\n" +
    "                    type=\"button\"\n" +
    "                    class=\"close\"\n" +
    "                    data-dismiss=\"modal\"\n" +
    "                    aria-label=\"Close\">\n" +
    "\n" +
    "                    <span aria-hidden=\"true\">&times;</span>\n" +
    "                </button>\n" +
    "                <h2 class=\"modal-title text-center\" id=\"overlay-screen-title\">{{ title }}</h2>\n" +
    "            </header>\n" +
    "\n" +
    "            <!-- Overlay content -->\n" +
    "            <div\n" +
    "                data-ng-show=\"bodyTemplate.length > 0\"\n" +
    "                data-ng-include=\"bodyTemplate\"\n" +
    "                class=\"modal-body\">\n" +
    "            </div>\n" +
    "            <div data-ng-show=\"bodyTemplate.length === 0\" class=\"modal-body\">\n" +
    "                Nothing here...\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Overlay footer -->\n" +
    "            <footer\n" +
    "                data-ng-show=\"footerTemplate.length > 0\"\n" +
    "                data-ng-include=\"footerTemplate\"\n" +
    "                class=\"modal-footer\">\n" +
    "            </footer>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/navigation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/navigation.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
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
    "\n" +
    "            <a href=\"#/dashboard\">\n" +
    "                <i class=\"fa fa-dashboard\"></i>\n" +
    "                <span>Dashboard</span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "\n" +
    "        <!-- List of groups -->\n" +
    "		<li>\n" +
    "            <a href=\"#/group/list\">\n" +
    "                <i class=\"fa fa-cubes\"></i>\n" +
    "                <span>Teams</span>\n" +
    "                <span class=\"pull-right\">\n" +
    "                    <i ng-show=\"global.data.isFetchingGroups === true\" class=\"fa fa-spinner fa-spin\"></i>\n" +
    "                    <small ng-show=\"!global.data.isFetchingGroups\">\n" +
    "                        ( {{ global.state.group.list.length }} )\n" +
    "                    </small>\n" +
    "                </span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "\n" +
    "        <!-- List of athletes -->\n" +
    "		<li>\n" +
    "            <a href=\"#/profile/list\">\n" +
    "                <i class=\"fa fa-users\"></i>\n" +
    "                <span>Athletes</span>\n" +
    "                <span class=\"pull-right\">\n" +
    "                    <i ng-show=\"global.data.isFetchingProfiles === true\" class=\"fa fa-spinner fa-spin\"></i>\n" +
    "                    <small ng-show=\"!global.data.isFetchingProfiles\">\n" +
    "                        ( {{ global.state.profile.list.length }} )\n" +
    "                    </small>\n" +
    "                </span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "\n" +
    "        <!-- List of movements -->\n" +
    "		<li>\n" +
    "            <a href=\"#/movements\">\n" +
    "                <i class=\"fa fa-th\"></i>\n" +
    "                <span>Movements</span>\n" +
    "            </a>\n" +
    "\n" +
    "            <ul style=\"display: block\">\n" +
    "                <li>\n" +
    "                    <a href=\"#/movements\">\n" +
    "                        <i class=\"fa fa-angle-right\"></i>\n" +
    "                        <span>Organize</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/capture\">\n" +
    "                        <i class=\"fa fa-angle-right\"></i>\n" +
    "                        <span>Record</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/movements/upload\">\n" +
    "                        <i class=\"fa fa-angle-right\"></i>\n" +
    "                        <span>Upload</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/movements/analyze\">\n" +
    "                        <i class=\"fa fa-angle-right\"></i>\n" +
    "                        <span>Analyze</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/movements/compare\">\n" +
    "                        <i class=\"fa fa-angle-right\"></i>\n" +
    "                        <span>Compare</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "\n" +
    "        <!-- Screenings -->\n" +
    "		<li>\n" +
    "            <a href=\"#/screening\">\n" +
    "                <i class=\"fa fa-pencil-square-o\"></i>\n" +
    "                <span>Movement Tests</span>\n" +
    "            </a>\n" +
    "\n" +
    "            <ul style=\"display: block\">\n" +
    "                <li>\n" +
    "                    <a href=\"#/screenings/current\">\n" +
    "                        <i class=\"fa fa-angle-right\"></i>\n" +
    "                        <span>Record or Upload</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"#/screenings\">\n" +
    "                        <i class=\"fa fa-angle-right\"></i>\n" +
    "                        <span>View Results</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
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
    "            <a href=\"#/fms/live\"> <i class=\"fa fa-pencil-square-o\"></i> Movement Screen</a>\n" +
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
    "        <!-- Account page -->\n" +
    "		<li>\n" +
    "            <a href=\"#/account\"><span>My Account</span></a>\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"app-version\">\n" +
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

angular.module("partials/select-profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/select-profile.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<h3 class=\"text-center\">Select a profile to get started</h3>\n" +
    "<br>\n" +
    "\n" +
    "<div class=\"col-md-4 col-md-offset-4 text-center\">\n" +
    "    <ui-profile-lookup\n" +
    "        profiles=\"global.state.profile.list\"\n" +
    "        select-profile=\"global.selectProfile(profile)\">\n" +
    "    </ui-profile-lookup>\n" +
    "    <br>\n" +
    "\n" +
    "    You can also take this opportunity to\n" +
    "    <a href=\"#profile/create\">create one</a>.\n" +
    "</div>\n" +
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
    "                        Fields marked * are required\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"panel-body\">\n" +
    "\n" +
    "                        <!-- First & last name -->\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                First &amp; Last Name *\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-4 col-md-4\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <input\n" +
    "                                        type=\"text\"\n" +
    "                                        ng-model=\"profile.firstName\"\n" +
    "                                        placeholder=\"First Name\"\n" +
    "                                        class=\"form-control\"\n" +
    "                                        required>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-4 col-md-5\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <input\n" +
    "                                        type=\"text\"\n" +
    "                                        ng-model=\"profile.lastName\"\n" +
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
    "                                Height (ft / in) *\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-4 col-md-2\">\n" +
    "                                <input\n" +
    "                                    type=\"number\"\n" +
    "                                    min=\"1\" max=\"10\"\n" +
    "                                    ng-model=\"profile.feet\"\n" +
    "                                    placeholder=\"Feet\"\n" +
    "                                    class=\"form-control\"\n" +
    "                                    required>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-4 col-md-2\">\n" +
    "                                <input\n" +
    "                                    type=\"number\"\n" +
    "                                    min=\"0\" max=\"11\"\n" +
    "                                    ng-model=\"profile.inches\"\n" +
    "                                    placeholder=\"Inches\"\n" +
    "                                    class=\"form-control\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Weight -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Weight (lbs) *\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-8 col-md-2\">\n" +
    "                                <input\n" +
    "                                    class=\"form-control\"\n" +
    "                                    ng-model=\"profile.weightInPounds\"\n" +
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
    "                                <textarea\n" +
    "                                    ng-model=\"profile.medicalHistory\"\n" +
    "                                    class=\"form-control\"\n" +
    "                                    placeholder=\"...\"></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Previous injuries -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Previous Injuries\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-8 col-md-9\">\n" +
    "                                <textarea\n" +
    "                                    ng-model=\"profile.injuries\"\n" +
    "                                    class=\"form-control\"\n" +
    "                                    placeholder=\"...\"></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Notes -->\n" +
    "                        <div class=\"row form-group\">\n" +
    "                            <div class=\"col-sm-4 col-md-3 text-right\">\n" +
    "                                Other Notes\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-8 col-md-9\">\n" +
    "                                <textarea\n" +
    "                                    ng-model=\"profile.notes\"\n" +
    "                                    class=\"form-control\"\n" +
    "                                    placeholder=\"...\"></textarea>\n" +
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
    "            Selected group: {{ global.state.group.list[global.store.groupId].name }} <br>\n" +
    "            Profile: {{ profile }}\n" +
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
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"page page-dashboard\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            Athletes <i class=\"fa fa-users\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "    </header>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <a\n" +
    "                href=\"javascript:;\"\n" +
    "                class=\"btn btn-primary btn-metro\"\n" +
    "                ng-repeat=\"profile in global.state.profile.list\"\n" +
    "                ng-show=\"profile.id\"\n" +
    "                ng-click=\"global.browseTo.profile(profile)\"\n" +
    "                style=\"background-image: url({{ profile.avatarSrc || '' }});background-size: cover;\">\n" +
    "\n" +
    "                <div class=\"btn-title\">{{ profile.firstName | characters:30 }}</div>\n" +
    "            </a>\n" +
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
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<!-- Profile summary -->\n" +
    "<div ng-hide=\"profile.id === 0\" class=\"page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            {{ profile.firstName }} {{ profile.lastName }}\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "    </header>\n" +
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
    "                    title=\"Delete <b>{{ profile.firstName }}</b>'s profile\"\n" +
    "                    class=\"btn btn-danger\">\n" +
    "\n" +
    "                    Delete <b>{{ profile.firstName }}</b>'s profile\n" +
    "                </button>\n" +
    "\n" +
    "                <!-- Delete confirmation -->\n" +
    "                <div class=\"modal fade\" id=\"deleteProfileConfirmation\">\n" +
    "                    <div class=\"modal-dialog\">\n" +
    "                        <div class=\"modal-content\">\n" +
    "                            <div class=\"modal-body\">\n" +
    "                                <p>\n" +
    "                                    Are you sure you want to delete <b>{{ profile.firstName }}\n" +
    "                                    {{ profile.lastName }}</b>'s profile?\n" +
    "                                </p>\n" +
    "                            </div>\n" +
    "                            <div class=\"modal-footer text-center\">\n" +
    "                                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\n" +
    "                                    Cancel\n" +
    "                                </button>\n" +
    "                                <button ng-click=\"deleteProfile()\" type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">\n" +
    "                                    Yes, delete {{ profile.firstName }}\n" +
    "                                </button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Create profile button -->\n" +
    "                <button\n" +
    "                    ng-click=\"global.browseTo.path('profile/create')\"\n" +
    "                    class=\"btn btn-default\">\n" +
    "\n" +
    "                    Add another athlete\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <section ng-hide=\"profile.id === 0\">\n" +
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
    "                <ui-editable-fields\n" +
    "                    data-model=\"global.state.profile.list[global.store.profileId]\"\n" +
    "                    data-save=\"saveProfileDetails\"\n" +
    "                    data-save-callback=\"saveProfileDetailsCallback\"\n" +
    "                    data-heading=\"{{ global.state.profile.list[global.store.profileId].firstName }}'s details\">\n" +
    "\n" +
    "                    <!-- First name -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"First Name\"\n" +
    "                        data-key=\"firstName\"\n" +
    "                        data-required=\"true\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Last name -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Last Name\"\n" +
    "                        data-key=\"lastName\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Height -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Height\"\n" +
    "                        data-key=\"height\"\n" +
    "                        data-type=\"length\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Weight -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Weight\"\n" +
    "                        data-key=\"mass\"\n" +
    "                        data-type=\"mass\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Date of Birth -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Date of Birth\"\n" +
    "                        data-key=\"dob\"\n" +
    "                        data-type=\"date\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Gender -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Gender\"\n" +
    "                        data-key=\"gender\"\n" +
    "                        data-type=\"gender\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Phone -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Phone #\"\n" +
    "                        data-key=\"phone\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Email -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Email\"\n" +
    "                        data-key=\"email\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Profile creation date -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Profile Created\"\n" +
    "                        data-key=\"created_at\"\n" +
    "                        data-type=\"datetime\"\n" +
    "                        data-disabled=\"true\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Primary Tag -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Primary Sport\"\n" +
    "                        data-key=\"primary_tag\"\n" +
    "                        data-type=\"tag\">\n" +
    "                    </ui-editable-field>\n" +
    "\n" +
    "                    <!-- Secondary tags -->\n" +
    "                    <ui-editable-field\n" +
    "                        data-label=\"Other Sports\"\n" +
    "                        data-key=\"secondary_tags\"\n" +
    "                        data-type=\"tag\"\n" +
    "                        data-max-tags=\"10\">\n" +
    "                    </ui-editable-field>\n" +
    "                </ui-editable-fields>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- General notes -->\n" +
    "        <div class=\"row\">\n" +
    "    		<div class=\"col-sm-12 col-md-4\">\n" +
    "                <ui-editable-standalone-field\n" +
    "                    data-heading=\"Medical Information\"\n" +
    "                    data-model=\"global.state.profile.list[global.store.profileId]\"\n" +
    "                    data-key=\"medical_history\"\n" +
    "                    data-empty=\"No medical information provided.\"\n" +
    "                    data-save=\"saveProfileDetails\"\n" +
    "                    data-save-callback=\"saveProfileDetailsCallback\">\n" +
    "                </ui-editable-standalone-field>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-12 col-md-4\">\n" +
    "                <ui-editable-standalone-field\n" +
    "                    data-heading=\"Previous Injuries\"\n" +
    "                    data-model=\"global.state.profile.list[global.store.profileId]\"\n" +
    "                    data-key=\"injuries\"\n" +
    "                    data-empty=\"No previous injuries.\"\n" +
    "                    data-save=\"saveProfileDetails\"\n" +
    "                    data-save-callback=\"saveProfileDetailsCallback\">\n" +
    "                </ui-editable-standalone-field>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-12 col-md-4\">\n" +
    "                <ui-editable-standalone-field\n" +
    "                    data-heading=\"Other Notes\"\n" +
    "                    data-model=\"global.state.profile.list[global.store.profileId]\"\n" +
    "                    data-key=\"notes\"\n" +
    "                    data-empty=\"No other notes.\"\n" +
    "                    data-save=\"saveProfileDetails\"\n" +
    "                    data-save-callback=\"saveProfileDetailsCallback\">\n" +
    "                </ui-editable-standalone-field>\n" +
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
    "                            Profile alias: {{ profile.firstName }} ({{ profile.id }}) <br>\n" +
    "                            Profile global: ({{ global.state.profile.list[global.store.profileId].id }}) <br>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "    </section>\n" +
    "</div>\n" +
    "\n" +
    "<!-- No profile selected -->\n" +
    "<div ng-show=\"profile.id === 0\" ng-include=\"'partials/no-profile-selected-notice.html'\" class=\"page\"></div>\n" +
    "");
}]);

angular.module("screenings/current/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("screenings/current/index.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            Movement Test <i class=\"fa fa-pencil-square-o\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "\n" +
    "        <!-- Append profile name to page title -->\n" +
    "        <div ng-show=\"screening.id > 0 && global.data.isFetchingScreeningData === false\" class=\"h1-append\">\n" +
    "            for {{ global.getSelectedProfile().firstName }} {{ global.getSelectedProfile().lastName }}\n" +
    "\n" +
    "            <small>\n" +
    "                <a ng-click=\"global.store.profileId = 0\" href=\"javascript:;\">\n" +
    "                    (change)\n" +
    "                </a>\n" +
    "            </small>\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <!-- Test progress -->\n" +
    "    <div ng-show=\"screening.id > 0 && global.data.isFetchingScreeningData === false\">\n" +
    "\n" +
    "        <h2 class=\"text-center\">\n" +
    "            {{ screening.title }}\n" +
    "\n" +
    "            <br>\n" +
    "            <small>\n" +
    "                {{ screening.createdAt | mysqlDate:'d / M / yyyy' }}\n" +
    "            </small>\n" +
    "        </h2>\n" +
    "\n" +
    "\n" +
    "        <div ng-repeat=\"movement in screening.movements\" class=\"row\" style=\"margin-bottom: 15px;\">\n" +
    "\n" +
    "            <div class=\"col-md-3 col-md-offset-4\" style=\"line-height: 30px\">\n" +
    "                <span class=\"text-muted\">{{ $index + 1 }}</span>\n" +
    "                {{ movement.title }}\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-md-2\">\n" +
    "                <button\n" +
    "                    ng-click=\"global.alert('In Development')\"\n" +
    "                    class=\"btn btn-primary btn-circle\">\n" +
    "                    <i class=\"fa fa-plus\"></i>\n" +
    "                </button>\n" +
    "                <button\n" +
    "                    ng-click=\"global.alert('In Development')\"\n" +
    "                    class=\"btn btn-primary btn-circle\">\n" +
    "                    <i class=\"fa fa-cloud-upload\"></i>\n" +
    "                </button>\n" +
    "                <button\n" +
    "                    ng-click=\"global.alert('In Development')\"\n" +
    "                    class=\"btn btn-primary btn-circle\">\n" +
    "                    <i class=\"fa fa-th\"></i>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Select a screening template -->\n" +
    "    <div ng-show=\"screening.id === 0 && global.data.isFetchingScreeningData === false\">\n" +
    "\n" +
    "        <!-- Temporary listing -->\n" +
    "        <div\n" +
    "            ng-show=\"global.getSelectedProfile().id > 0\n" +
    "                && global.data.isPreparingNewScreening === false\">\n" +
    "\n" +
    "            <div class=\"callout-elem callout-elem-info\">\n" +
    "                <p>\n" +
    "                    Start by selecting a test template:\n" +
    "                </p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-md-4 col-md-offset-4 text-center\">\n" +
    "                <a ng-click=\"createFunctionalMovementScreening()\" href=\"javascript:;\">\n" +
    "                    Functional Movement Test\n" +
    "                </a>\n" +
    "                <br>\n" +
    "\n" +
    "                <a href=\"javascript:;\">\n" +
    "                    <i class=\"fa fa-plus fa-fw\"></i> Create a Custom Movement Test\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Select a profile -->\n" +
    "        <div\n" +
    "            ng-show=\"global.getSelectedProfile().id === 0\n" +
    "                && global.data.isPreparingNewScreening === false\">\n" +
    "\n" +
    "            <div ng-include=\"'partials/select-profile.html'\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Preparing screening records -->\n" +
    "        <div ng-show=\"global.data.isPreparingNewScreening === true\">\n" +
    "\n" +
    "            <br>\n" +
    "            <h2 class=\"text-center\">\n" +
    "                Preparing Your Test\n" +
    "            </h2>\n" +
    "\n" +
    "            <br>\n" +
    "            <br>\n" +
    "            <div class=\"text-center\">\n" +
    "                <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Loading screening data -->\n" +
    "    <div ng-show=\"global.data.isFetchingScreeningData === true\">\n" +
    "        <div class=\"text-center\" style=\"margin: 60px auto\">\n" +
    "            <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("screenings/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("screenings/index.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            Movement Tests <i class=\"fa fa-pencil-square-o\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "    </header>\n" +
    "\n" +
    "    <!-- List of screenings -->\n" +
    "    <div ng-show=\"global.data.isFetchingScreeningData === false\" class=\"table-responsive\">\n" +
    "        <table\n" +
    "            ng-show=\"global.state.screening.list.length > 0\"\n" +
    "            class=\"table table-striped\">\n" +
    "\n" +
    "            <!-- Heading -->\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <td class=\"text-center\"></td>\n" +
    "                    <td class=\"text-center\">Title</td>\n" +
    "                    <td class=\"text-center\">Date</td>\n" +
    "                    <td class=\"text-center\">Athlete</td>\n" +
    "                    <td class=\"text-center\">Score</td>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "\n" +
    "            <!-- Screenings -->\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"screening in global.state.screening.list\">\n" +
    "                    <td class=\"text-right\">\n" +
    "                        <a ng-click=\"selectScreening(screening)\" href=\"javascript:;\" title=\"Edit\">\n" +
    "                            <i class=\"fa fa-pencil-square-o\"></i>\n" +
    "                        </a>\n" +
    "                        <a href=\"#/screenings/{{ screening.id }}\" title=\"\">\n" +
    "                            <i class=\"fa fa-list-alt\"></i>\n" +
    "                        </a>\n" +
    "                    </td>\n" +
    "                    <td class=\"text-center\">\n" +
    "                        {{ screening.title | characters:60 }}\n" +
    "                    </td>\n" +
    "                    <td class=\"text-center\">\n" +
    "                        {{ screening.createdAt | mysqlDate }}\n" +
    "                    </td>\n" +
    "                    <td class=\"text-center\">\n" +
    "                        {{ screening.profile.firstName + ' ' + screening.profile.lastName | characters:40 }}\n" +
    "                    </td>\n" +
    "                    <td class=\"text-center\">\n" +
    "                        {{ screening.score | number:0 }}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "\n" +
    "        <!-- No screenings to show -->\n" +
    "        <div ng-show=\"global.state.screening.list.length === 0\">\n" +
    "\n" +
    "            <a href=\"#/screenings/current\" class=\"btn btn-primary btn-circle btn-lg\">\n" +
    "                <i class=\"fa fa-plus\"></i>\n" +
    "            </a>\n" +
    "\n" +
    "            <h3>There are no tests to display.</h3>\n" +
    "            Once you create a new test, it will show up here.\n" +
    "            <br><br>\n" +
    "\n" +
    "            <b>Go ahead and use the <i class=\"fa fa-plus fa-lg fa-fw\"></i> button above to start.</b>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Loading data -->\n" +
    "    <div ng-show=\"global.data.isFetchingScreeningData === true\">\n" +
    "        <h3 class=\"text-center\">Retrieving Tests</h3>\n" +
    "        <div class=\"text-center\" style=\"margin: 60px auto\">\n" +
    "            <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("screenings/view/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("screenings/view/index.html",
    "<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->\n" +
    "\n" +
    "<div class=\"page\">\n" +
    "    <header>\n" +
    "        <h1>\n" +
    "            <abbr title=\"Functional Movement Test\">FMT</abbr> Report <i class=\"fa fa-list-alt\"></i>\n" +
    "            <span></span>\n" +
    "        </h1>\n" +
    "\n" +
    "        <!-- Append profile name to page title -->\n" +
    "        <div ng-show=\"screeningProfile.id > 0\" class=\"h1-append\">\n" +
    "            {{ screeningProfile.firstName }}\n" +
    "            {{ screeningProfile.lastName }}\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <!-- Screening results -->\n" +
    "    <div ng-show=\"screening.id > 0\" class=\"text-center\">\n" +
    "\n" +
    "        <button class=\"btn btn-default\">\n" +
    "            Test Score Table\n" +
    "        </button>\n" +
    "        <br>\n" +
    "        <br>\n" +
    "\n" +
    "        <button class=\"btn btn-default\">\n" +
    "            Test Score Graph\n" +
    "        </button>\n" +
    "        <br>\n" +
    "        <br>\n" +
    "\n" +
    "        <button class=\"btn btn-default\">\n" +
    "            Mobility Summary\n" +
    "        </button>\n" +
    "        <br>\n" +
    "        <br>\n" +
    "        <br>\n" +
    "\n" +
    "        <a href=\"javascript:;\">\n" +
    "            <i class=\"fa fa-angle-double-down fa-2x\"></i>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"screening.id === 0\">\n" +
    "        <h2 style=\"text-align: center; color: #ccc;\">\n" +
    "            In Development\n" +
    "        </h2>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("thumbnail-selector/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("thumbnail-selector/footer.html",
    "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n" +
    "<button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Use as thumbnail</button>\n" +
    "");
}]);

angular.module("thumbnail-selector/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("thumbnail-selector/index.html",
    "<h3 style=\"color: #ccc; text-align: center; margin: 100px auto\">\n" +
    "    In Development.\n" +
    "</h3>\n" +
    "");
}]);
