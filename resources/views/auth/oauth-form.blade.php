@extends('layouts.web')

@section('html-class', 'auth-login oauth')
@section('body-class', 'auth-login oauth')

@section('content')

<section>
    <div class="main-body">
        <div class="container" style="margin-bottom: 300px;">

            <h3 class="text-center">
                <b>{{ $client->getName() }}</b>
                <br>

                would like to access your data.
            </h3>
            <br>

            <form class="auth-form" role="form" method="post" action="{{ route('oauth.authorize.post', $params) }}">
                <input type="hidden" name="client_id" value="{{ $params['client_id'] }}">
                <input type="hidden" name="redirect_uri" value="{{ $params['redirect_uri'] }}">
                <input type="hidden" name="response_type" value="{{ $params['response_type'] }}">
                <input type="hidden" name="state" value="{{ $params['state'] }}">
                <input type="hidden" name="scope" value="{{ $params['scope'] }}">
                {!! csrf_field() !!}

                <!-- User authorization -->
                <div class="col-xs-12 text-center">
                    <button class="btn btn-primary" type="submit" name="approve" value="1">
                        Approve
                    </button>
                    <button class="btn btn-info" type="submit" name="deny" value="1">
                        Deny
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>

@endsection
