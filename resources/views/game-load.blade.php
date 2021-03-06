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

				<div class="panel-body" v-cloak>
					Game id: {{ $game }}<br>
					@verbatim
					Enlapsed time: <span v-text="enlapsed_time"></span><br>

					<table class="minesGrid" v-cloak>
						<tr v-for="row in grid">

							<td v-for="cell in row" :class="{closed : cell.revealed!=1}" @click="reveal(cell)" @contextmenu="flag(cell,$event)">
								<span v-if="cell.revealed==1">
									<span v-if="cell.mine"><i class="fa fa-bomb" aria-hidden="true"></i></span>
									<span v-else >
										<span v-if="cell.adjacents>0">	{{ cell.adjacents }}</span>
									</span>
								</span>
								<span v-else>
									<span v-if="cell.flags==1" ><i class="fa fa-flag" aria-hidden="true"></i></span>
									<span v-if="cell.flags==2" ><i class="fa fa-question" aria-hidden="true"></i></span>
								</span>
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
<script>
	window.loadGame={{ $game }};
</script>
<script src="{{ asset('js/loadgame.js') }}"></script>
@endsection