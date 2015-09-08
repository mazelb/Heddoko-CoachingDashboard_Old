@extends('angularnonapppages')

@section('content')

<h1 style="position:fixed;width:100%;top:50%;"><b>{{ Inspiring::quote() }}</b></h1>

<div class="page-signin" style="position:fixed;width:100%;bottom:-2%;">

    <div class="main-body">
        <div class="container" style="margin-bottom:50px;">
			
            <div class="form-container">

                <form class="form-horizontal" role="form" method="POST" action="{{ url('/auth/login') }}">

									<input type="hidden" name="_token" value="{{ csrf_token() }}">
									<div class="form-group">
										<input type="text"
													 class="form-control"
													 placeholder="Username"
													 name="username">
									</div>
									<div class="form-group">
										<input type="password"
													 class="form-control"
													 placeholder="password"
													 name="password">
									</div>
									<div class="form-group">
										<button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>
									</div>

                </form>
				
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

                <section>
                    <p class="text-center"><a style="color:white" href="{{ url('/password/email') }}">Forgot your password?</a></p>
                    <p class="text-center" style="color:white" text-muted text-small>Don't have an account yet? <a href="{{ url('/auth/register') }}">Sign up</a></p>
                </section>
                
            </div>
        </div>
    </div>

</div>

@endsection
