@extends('layouts.web')

@section('body-class', 'auth-reset-password')

@section('content')

<section>
    <div class="main-body">
        <div class="row">
            <div class="main-body col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4">

                @if (Session::has('status'))

                    <h3 class="text-center" style="margin-bottom: 100px">
                        {{ Session::pull('status') }}
                    </h3>

                @else

                    <p class="info text-center">
                        Enter the email address that you used to register. We'll send you an email with
                        your username.
                    </p>

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

                    <form
                        class="form-horizontal"
                        name="forgotUsernameForm"
                        method="POST"
                        action="{{ route('auth.username.post') }}">

                        {!! csrf_field() !!}

                        {{-- Email --}}
                        <div class="form-group">
                            <input
                                type="email"
                                class="form-control"
                                name="email"
                                placeholder="Email"
                                value="{{ old('email') }}">
                        </div>

                        {{-- Submit button --}}
                        <div class="form-group">
                            <input
                                type="submit"
                                class="btn btn-default"
                                name="name"
                                value="Retrieve Username">
                        </div>
                    </form>

                @endif
            </div>
        </div>
    </div>
</section>

@endsection
