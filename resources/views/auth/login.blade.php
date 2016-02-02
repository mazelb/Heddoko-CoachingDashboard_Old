@extends('layouts.web')

@section('html-class', 'auth-login')
@section('body-class', 'auth-login')

@section('content')

{{-- <h1 class="inspiring-quote">{{ Inspiring::quote() }}</h1> --}}
<h1 class="inspiring-quote">
    More Than Just a Coach
</h1>

<section>
    <div class="main-body">
        <div class="container" style="margin-bottom:50px;">

            <!-- Login form -->
            <form class="auth-form" role="form" method="POST" action="{{ route('auth.login.post') }}">
                {!! csrf_field() !!}

                <div class="row">

                    <!-- Username -->
                    <div class="col-xs-12 col-sm-12 col-md-4 col-md-offset-1">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required autofocus>

                        <a href="{{ route('auth.username') }}">Forgot your username?</a>
                    </div>

                    <!-- Password -->
                    <div class="col-xs-12 col-sm-12 col-md-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required>

                        <a href="{{ route('auth.password') }}">Forgot your password?</a>
                    </div>

                    <!-- Submit button -->
                    <div class="col-xs-12 col-sm-12 col-md-2">
                        <input
                            type="submit"
                            class="btn btn-default"
                            name="name"
                            value="Login">

                        <a href="{{ route('auth.register') }}" class="emphasize">Create a new account</a>
                    </div>
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
        </div>
    </div>
</section>

@endsection
