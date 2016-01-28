<!doctype html>
<html class="no-js web-layout @yield('html-class', '')">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Heddoko</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logos/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/images/logos/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logos/favicon-16x16.png">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,700,600,400' rel='stylesheet' type='text/css'>
        <script src="{{ url('js/jquery.min.js') }}"></script>
        <link rel="stylesheet" href="{{ asset('css/styles.css?'. config('app.version')) }}">

        {{-- TODO: migrate the necessary styles into styles.css --}}
        <link rel="stylesheet" href="{{ url('css/app.css') . '?20151023' }}">
    </head>
    <body class="@yield('body-class', '')">
		<header>
			<a class="nav-logo" href="/">
				<img src="{{ asset('images/logos/heddoko_logo.svg') }}" alt="Heddoko">
			</a>

			<div class="social">
				<p>
					<a href="https://www.facebook.com/heddoko" target="_blank">
                        <i class="fa fa-2x fa-facebook"></i>
                    </a>
					<a href="https://twitter.com/heddoko" target="_blank">
                        <i class="fa fa-2x fa-twitter"></i>
                    </a>
					<a href="https://www.linkedin.com/company/heddoko" target="_blank">
                        <i class="fa fa-2x fa-linkedin"></i>
                    </a>
					<a href="https://instagram.com/heddoko/" target="_blank">
                        <i class="fa fa-2x fa-instagram"></i>
                    </a>
				</p>
			</div>
		</header>

		@yield('content')

		<div id="footer" class="navbar-fixed-bottom text-center">
			&copy; Copyright Heddoko
		</div>
    </body>
</html>
