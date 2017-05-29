@extends('layouts.app')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">Game</div>

				<div class="panel-body">

					[GRID]

				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section('scripts')
	<script src="{{ asset('js/newgame.js') }}"></script>
@endsection