@extends('layouts.web')

@section('content')
<div class="row">
    <div class="main-body col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4">
        <p class="info text-center">
            Use this form to reset your password.
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

        <form class="form-horizontal" name="forgotPasswordForm" method="POST" action="{{ route('auth.password.post') }}">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="token" value="{{ $token }}">

            {{-- Email --}}
            <div class="form-group">
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    placeholder="Email"
                    value="{{ old('email') }}">
            </div>

            {{-- Password --}}
            <div class="form-group">
                <input
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Password">
            </div>

            {{-- Password confirmation --}}
            <div class="form-group">
                <input
                    type="password"
                    class="form-control"
                    name="password_confirmation"
                    placeholder="Confirm Password">
            </div>

            {{-- Submit button --}}
            <div class="form-group">
                <input
                    type="submit"
                    class="btn btn-default"
                    name="name"
                    value="Reset password">
            </div>
        </form>
    </div>
</div>
@endsection
