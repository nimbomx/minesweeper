@extends('layouts.app')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">Game <a href="{{ url('game') }}"><button class="btn btn-primary btn-xs pull-right">New game</button></a></div>

				<div class="panel-body" v-cloak>
				@verbatim
					Game id: {{ game }}<br>

					<table class="minesGrid" v-cloak>
						<tr v-for="row in grid">

							<td v-for="cell in row" :class="{closed : cell.revealed!=1}" @click="reveal(cell)">
								<span v-if="cell.revealed==1">
									<span v-if="cell.mine" >[X]</span>
									<span v-else >
										<span v-if="cell.adjacents>0">	{{ cell.adjacents }}</span>
									</span>
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
	<script src="{{ asset('js/newgame.js') }}"></script>
@endsection