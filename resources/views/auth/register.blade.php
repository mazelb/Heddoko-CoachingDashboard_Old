@extends('layouts.web')

@section('html-class', 'auth-register')
@section('body-class', 'auth-register')

@section('content')

<div class="page-signup">
	<div class="main-body">
        <div>
			<div class="form-container">
				<section>

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

					<form class="form-horizontal" role="form" method="POST" action="{{ url('/auth/register') }}">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">

                        {{-- Account type --}}
						<div style="margin:20px 0 25px 0;">
							<div class="form-group">
								<label for="accType" style="color:white">Account Type:</label>
								<select class="form-control"  id="accType" name="newAccountType">
									<option value="coach" selected>Coach</option>
									<option value="athlete">Athlete</option>
									<option value="admin" >Admin</option>
								</select>

							</div>
						</div>

                        {{-- First name --}}
						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-user"></span>
								</span>
								<input
                                    type="text"
                                    maxlength="100"
									class="form-control"
									placeholder="First Name"
									name="first_name"
									value="{{ old('first_name') }}">
							</div>
						</div>

                        {{-- Last name --}}
						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-user"></span>
								</span>
								<input
                                    type="text"
                                    maxlength="100"
									class="form-control"
									placeholder="Last Name"
									name="last_name"
									value="{{ old('last_name') }}">
							</div>
						</div>

                        {{-- Email --}}
						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-envelope"></span>
								</span>
								<input
                                    type="email"
                                    maxlength="255"
									class="form-control"
									placeholder="E-mail Address"
									name="email"
									value="{{ old('email') }}">
							</div>
						</div>

                        {{-- Username --}}
						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									@
								</span>
								<input
                                    type="text"
									class="form-control"
									placeholder="Username"
									name="username"
									value="{{ old('username') }}">
							</div>
						</div>

                        {{-- Password --}}
						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-lock"></span>
								</span>
								<input
                                    type="password"
									class="form-control"
									placeholder="Password"
									name="password">
							</div>
						</div>

                        {{-- Password confirmation --}}
						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-refresh"></span>
								</span>
								<input
                                    type="password"
									class="form-control"
									placeholder="Confirm Password"
									name="password_confirmation">
							</div>
						</div>

                        {{-- Country --}}
						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-globe"></span>
								</span>
								<input
                                    name="country"
                                    type="text"
									class="form-control"
									placeholder="Country"
									value="{{ old('country') }}"
                                    disabled>
							</div>
						</div>

                        {{-- Date of birth --}}
						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-calendar"></span>
								</span>
								<input
                                    type="text"
									class="form-control"
									placeholder="Date of Birth"
									name="dob"
									value="{{ old('dob') }}"
                                    disabled>
							</div>
						</div>

                        {{-- Gender --}}
                        <div class="form-group">
                            <label for="gender">Gender:</label>
                            <select class="form-control" id="gender" name="gender">
                                <option value="" selected>Unspecified</option>
                                <option value="femail">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>

                        {{-- Phone # --}}
						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-phone-alt"></span>
								</span>
								<input
                                    type="text"
									class="form-control"
									placeholder="Mobile"
									name="phone"
									value="{{ old('phone') }}">
							</div>
						</div>

						<div class="form-group">

                            {{-- Privacy policy & terms of use--}}
                            <p class="text-center info">
                                By clicking on Sign up, you agree to <br> our
                                <a href="{{ url('terms') }}">terms & conditions</a> and
                                <a href="{{ url('privacy') }}">privacy policy</a>
                            </p>

                            {{-- Submit button --}}
                            <input
                                type="submit"
                                class="btn btn-default"
                                name="name"
                                value="Sign up">
						</div>

                        {{-- Login link --}}
                        <div class="form-group">
        					<p class="text-center">
                                Already have an account?
                                <a href={{ url('/auth/login') }} class="emphasize">Log in now</a>
                            </p>
                        </div>
					</form>
				</section>
			</div>
		</div>
	</div>
</div>
<br>
<br>

@endsection
