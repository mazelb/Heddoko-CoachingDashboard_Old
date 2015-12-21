@extends('layouts.web')

@section('html-class', 'oauth-login')
@section('body-class', 'oauth-login')

@section('content')

{{-- <h1 class="inspiring-quote">{{ Inspiring::quote() }}</h1> --}}
<h1 class="inspiring-quote">
    {{ $client->getName() }}
</h1>

<section>
    <div class="main-body">
        <div class="container" style="margin-bottom:50px;">

            <form class="auth-form" role="form" method="post" action="{{ route('oauth.authorize.post', $params) }}">
                <input type="hidden" name="client_id" value="{{ $params['client_id'] }}">
                <input type="hidden" name="redirect_uri" value="{{ $params['redirect_uri'] }}">
                <input type="hidden" name="response_type" value="{{ $params['response_type'] }}">
                <input type="hidden" name="state" value="{{ $params['state'] }}">
                <input type="hidden" name="scope" value="{{ $params['scope'] }}">

                <!-- User authorization -->
                <div class="col-xs-12 text-center">
                    <button class="btn btn-default" type="submit" name="approve" value="1">
                        Approve
                    </button>
                    <button class="btn btn-default" type="submit" name="deny" value="1">
                        Deny
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>

@endsection
