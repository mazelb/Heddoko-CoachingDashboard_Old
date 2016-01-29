
<!-- Copyright Heddoko(TM) 2015, all rights reserved. -->

<!doctype html>
<html class="no-js" data-ng-app="app">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Heddoko</title>
        <meta name="description" content="">
        <meta name="user-hash" content="{{ md5(Auth::id()) }}">
        <meta name="version" content="{{ config('app.version') }}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logos/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/images/logos/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logos/favicon-16x16.png">

        <!-- Fonts & stylesheets -->
        <link rel="stylesheet" href="{{ asset('css/styles.css?'. config('app.version')) }}">
    </head>
    <body id="app" data-ng-controller="MainController">

        <div>
            <div data-ng-cloak="" class="no-print">
                <aside data-ng-include="'partials/navigation.html'" id="nav-container"></aside>
            </div>

            <div class="view-container">
                <div class="no-print">
                    <section
                        data-ng-include="'partials/header.html'"
                        id="header"
                        class="top-header">
                    </section>
                </div>

                <section data-ng-view="" id="content" class="animate-fade-up"></section>
            </div>
        </div>

        <!-- Loading overlay -->
        <div class="page-loading-overlay">
            <a href="/logout" title="Exit application" class="page-loading-escape">
                <i class="fa fa-times-circle fa-2x"></i>
            </a>

            <div class="loader-2"></div>
        </div>
        <div class="load_circle_wrapper">
            <div class="loading_spinner">
                <!-- <div id="wrap_spinner">
                    <div class="loading outer">
                        <div class="loading inner"></div>
                    </div>
                </div> -->
                <i class="fa fa-spinner fa-spin fa-4x"></i>
            </div>
        </div>

        <!-- Overlayed screens (all overlayed screens are shown through this modal) -->
        <div data-ng-include="'partials/overlay.html'"></div>

        <!-- Scripts -->
        <script type="text/javascript" src="{{ asset('js/scripts.js?'. config('app.version')) }}"></script>
    </body>
</html>
