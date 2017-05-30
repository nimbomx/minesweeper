@extends('layouts.app')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">Game <button @click="createGame" class="btn btn-primary btn-xs pull-right">New game</button></div>

				<div class="panel-body" v-cloak>
				@verbatim
					{{ game }}				
					<table class="minesGrid" v-cloak>
						<tr v-for="row in grid">

							<td v-for="cell in row" class="closed">
								{{ cell }}
							</td>

						</tr>

					</table>
				@endverbatim
					

				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section('scripts')
	<script src="{{ asset('js/newgame.js') }}"></script>
@endsection