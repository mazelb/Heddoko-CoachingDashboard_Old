<!doctype html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Heddoko</title>
        <meta name="description" content="">
        <meta name="user-hash" content="{{ md5(Auth::id()) }}"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,700,600,400' rel='stylesheet' type='text/css'>
        <script type="text/javascript" src="{{ asset('js/jquery.min.js') }}"></script>

        <!-- Theme's own CSS file -->
        <link rel="stylesheet" href="{{ url('css/main.css') }}">
    </head>
    <body data-ng-app="app" id="app" data-custom-background="" data-off-canvas-nav="" data-ng-controller="MainController">

        <div>
            <div data-ng-cloak="" class="no-print">
                <!-- Include a version # with the template for caching -->
                <aside
                    data-ng-include=" 'views/navigation.html?' + (dev.isLocal ? dev.timestamp : dev.version) "
                    id="nav-container">
                </aside>
            </div>

            <div class="view-container">

                <div class="no-print">
                    <!-- Include a version # with the template for caching -->
                    <section
                        data-ng-include=" 'views/header.html?' + (dev.isLocal ? dev.timestamp : dev.version) "
                        id="header" class="top-header">
                    </section>
                </div>

                <section data-ng-view="" id="content" class="animate-fade-up"></section>
            </div>
        </div>

        <!-- Loading overlay -->
        <div class="page-loading-overlay">
            <div class="loader-2"></div>
        </div>
        <div class="load_circle_wrapper">
            <div class="loading_spinner">
                <div id="wrap_spinner">
                    <div class="loading outer">
                        <div class="loading inner"></div>
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
