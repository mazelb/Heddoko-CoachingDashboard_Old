@extends('layouts.web')

@section('html-class', 'auth-register')

@section('content')

<div class="page-signup">

	<div class="main-body">

		<!-- <div class="container" style="position:fixed;width:100%;top:5%;"> -->
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

						<!--<div style="background-color:white">
							Account Type
							 <label class="checkbox-inline">
									<input type="radio" name="newAccountType" value="athlete">Athlete
							 </label>
							 <label class="checkbox-inline">
									<input type="radio" name="newAccountType" value="coach" checked>Coach
							 </label>
							 <label class="checkbox-inline">
									<input type="radio" name="newAccountType" value="admin">Admin
							 </label>
						</div>-->

						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-user"></span>
								</span>
								<input  type="text"
												class="form-control"
												placeholder="First Name"
												name="first_name"
												value="{{ old('first_name') }}">
							</div>
						</div>

						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-user"></span>
								</span>
								<input  type="text"
												class="form-control"
												placeholder="Last Name"
												name="last_name"
												value="{{ old('last_name') }}">
							</div>
						</div>

						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
										<span class="glyphicon glyphicon-envelope"></span>
								</span>
								<input type="email"
											class="form-control"
											placeholder="E-mail Address"
											name="email"
											value="{{ old('email') }}" >
							</div>
						</div>

						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
										<span class="glyphicon glyphicon-envelope"></span>
								</span>
								<input type="text"
											class="form-control"
											placeholder="Username"
											name="username"
											value="{{ old('username') }}" >
							</div>
						</div>

						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-lock"></span>
								</span>
								<input type="password"
											class="form-control"
											placeholder="Password"
											name="password">
							</div>
						</div>

						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-refresh"></span>
								</span>
								<input type="password"
											class="form-control"
											placeholder="Confirm Password"
											name="password_confirmation"
											 >
							</div>
						</div>

						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
										<span class="glyphicon glyphicon-envelope"></span>
								</span>
								<input type="text"
											class="form-control"
											placeholder="City"
											name="city"
											value="{{ old('city') }}" >
							</div>
						</div>

						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
										<span class="glyphicon glyphicon-envelope"></span>
								</span>
								<input type="text"
											class="form-control"
											placeholder="Date of Birth"
											name="dob"
											value="{{ old('dob') }}" >
							</div>
						</div>

						<!--<div style="background-color:white">
							Sex
							 <label class="checkbox-inline">
									<input type="radio" name="sex" value="unspecified" checked>unspecified
							 </label>
							 <label class="checkbox-inline">
									<input type="radio" name="sex" value="male">male
							 </label>
							 <label class="checkbox-inline">
									<input type="radio" name="sex" value="female">female
							 </label>
						</div>-->

						<div style="margin:20px 0 25px 0;">
							<div class="form-group">
								<label for="sex" style="color:white">Sex:</label>
								<select class="form-control"  id="sex" name="sex">
									<option selected>unspecified</option>
									<option>male</option>
									<option >female</option>
								</select>

							</div>
						</div>

						<div class="form-group">
							<div class="input-group input-group-lg">
								<span class="input-group-addon">
										<span class="glyphicon glyphicon-envelope"></span>
								</span>
								<input type="text"
											class="form-control"
											placeholder="Mobile"
											name="mobile"
											value="{{ old('mobile') }}" >
							</div>
						</div>

						<div class="form-group">
							<p style="color:white" class="text-muted text-small">By clicking on Sign up, you agree to our <a href="{{ url('terms') }}">terms & conditions</a> and <a href="{{ url('privacy') }}">privacy policy</a></p>
							<div class="divider"></div>
							<button type="submit" class="btn btn-primary btn-block btn-lg">Sign up</button>
						</div>

					</form>

				</section>

				<section>
					<p style="color:white" class="text-center text-muted">Already have an account? <a href={{ url('/auth/login') }} >Log in now</a></p>
				</section>

			</div>
		</div>
	</div>
</div>
<br>
<br>

@endsection
