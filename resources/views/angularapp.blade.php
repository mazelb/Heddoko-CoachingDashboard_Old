<!doctype html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Heddoko</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,700,600,400' rel='stylesheet' type='text/css'>

        <!-- Include Jquery in the vendor folder -->
        <script src="{{ url('js/jquery.min.js') }}"></script>

        <!-- Theme's own CSS file -->
        <link rel="stylesheet" href="{{ url('css/main.css') }}">
    </head>
    <body data-ng-app="app" id="app" data-custom-background="" data-off-canvas-nav="" data-ng-controller="MainController">

        <div>
            <div data-ng-cloak="" class="no-print">
                <aside data-ng-include=" 'views/navigation.html' " id="nav-container"></aside>
            </div>

            <div class="view-container">

                <div class="no-print">
                    <section data-ng-include=" 'views/header.html' " id="header" class="top-header"></section>
                </div>

                <section data-ng-view="" id="content" class="animate-fade-up"></section>
            </div>
        </div>
        <div class="page-loading-overlay"> <div class="loader-2"></div> </div>
        <div class="load_circle_wrapper">

            <div class="loading_spinner">
                <div id="wrap_spinner">
                    <div class="loading outer">
                        <div class="loading inner"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Vendor scripts. Can be minified into a single file when going into production. -->
        <!-- TODO: move all vendor scripts from app.js -->
        <script type="text/javascript" src="{{ asset('js/vendor/bootstrap.min.js') }}"></script>

        <!-- App scripts. Should be minified into a single file for production. -->
        <!-- TODO: move all modules into their own javascript file. -->
        <script type="text/javascript" src="{{ url('js/app.js') }}"></script>
    </body>
</html>
