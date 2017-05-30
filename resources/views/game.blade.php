@extends('layouts.app')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">Game
					<div class="pull-right">
						Rows:
						<input class="newParams form-control" type="number" placeholder="rows" v-model="newParams.rows">
						Cells:
						<input class="newParams form-control" type="number" placeholder="cells" v-model="newParams.cells">
						Mines:
						<input class="newParams form-control" type="number" placeholder="mines" v-model="newParams.mines">
						<button @click="createGame" class="btn btn-primary btn-xs ">New game</button>
					</div>

				</div>

			</div>
		</div>
	</div>
</div>
@endsection

@section('scripts')
	<script src="{{ asset('js/newgame.js') }}"></script>
@endsection