@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Games</div>

                <div class="panel-body">
                    <a href="{{ url('game') }}"><button class="btn btn-primary pull-right">START NEW GAME</button></a>
                    [Game LIST]


                </div>
            </div>
        </div>
    </div>
</div>
@endsection
