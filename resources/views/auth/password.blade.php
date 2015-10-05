@extends('layouts.web')

@section('content')

<div class="page-forgot">

    <div class="signin-header">
        <div class="container text-center">
            <section class="logo">
				<i class="fa fa-2x fa-slack"></i></a>
            </section>
        </div>
    </div>

    <div class="main-body">
        <div class="container">

            <div class="info text-center">
                <h2>Password Reset</h2>
                <p class="text-small">Enter your email address that you used to register. We'll send you an email with your username and a link to reset your password.</p>
            </div>

			@if (count($errors) > 0)
				<div class="alert alert-danger">
					<strong>Whoops!</strong> There were some problems with your input.<br><br>
					<ul>
						@foreach ($errors->all() as $error)
							<li>{{ $error }}</li>
						@endforeach
					</ul>
				</div>
			@endif

            <div class="form-container">

                <form class="form-horizontal" name="forgotPasswordForm">
					<input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
					   <input type="email" class="form-control input-lg" name="email" placeholder="Email" value="{{ old('email') }}">
                    </div>
                    <div class="form-group">
						<button type="submit" class="btn btn-lg btn-block btn-primary">Send</button>
                    </div>
                </form>

            </div>

        </div>
    </div>

</div>

@endsection
