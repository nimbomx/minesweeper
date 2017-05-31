@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Games</div>

                <div class="panel-body">
                    <a href="{{ url('game') }}"><button class="btn btn-primary pull-right">START NEW GAME</button></a>
                    <div class="clearfix">
                      
                    </div>
                    <div v-cloak>
                        <div v-for="game in games" style="margin-bottom: 10px; border:1px solid #aaa; padding: 10px 20px;">

                           @{{ game.enlapsed_time }} seconds<br>
                           @{{ game.rows }} x @{{ game.cells }} with @{{ game.mines }} mines.<br>
                           <a :href="route+'/game/'+game.id">Play this game</a>
                           <a class="pull-right" href="#" style="color: red" @click="deleteGame(game.id)">Delete game</a>
                       </div>
                   </div>

               </div>
           </div>
       </div>
   </div>
</div>
@endsection
@section('scripts')
<script src="{{ asset('js/home.js') }}"></script>
@endsection