<?php

namespace App\Http\Controllers;

use App\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $game= new Game();
        $game->rows=5;//30 Number of rows;
        $game->cells=5;//24 Number of cells;
        $game->mines=5;//667 Number of mines;
        $game->user_id=$request->user()->id;

        $grid=[]; //create empty Array for Grid
        $squares= [];

        $square_number=$game->rows*$game->cells; //Calculate number of squares

        //CREATE SQUARES

        for ($i = 1; $i <= ($square_number); $i++) {
            //USE an Object for Square
            $square = (object)["mine"=>0, "revealed"=>0,"id"=>$i, "adjacents"=>0,"flags"=>0];

            if($i<=$game->mines){
                $square->mine=1;//add mines
            }else{
                $square->mine=0;//add empty squares
            }
            $squares[]=$square;
        }


        shuffle($squares); //randomize mines position

        //CREATE GRID
        for ($r = 0; $r < ($game->rows); $r++) {
            for ($c = 0; $c < $game->cells; $c++) {
                $grid[$r][$c]=array_shift($squares);
            }
        }

        //add Adjacents
        foreach($grid as $r=>$row){
            foreach($row as $c=>$cell){
                if($cell->mine){
                    for ($r1 = -1; $r1 < 2; $r1++) {
                        for ($c1 = -1; $c1 < 2; $c1++) {
                            $nr= $r+$r1;
                            $nc=$c+$c1;
                            if(isset($grid[$nr]) && isset($grid[$nr][$nc])){
                                $grid[$nr][$nc]->adjacents+=1;
                            }
                        }
                    }
                }
            }
        }

        $game->grid=json_encode($grid); //Encode as JSON to store
        $game->save();

        return $this->hideInfo($game);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function show(Game $game)
    {
        return $this->hideInfo($game);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function edit(Game $game)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Game $game)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function destroy(Game $game)
    {
        //
    }


    /**
     * Reveal Square.
     *
     * @param  \App\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function reveal(Game $game,$id)
    {
        $current_cell=null;
        $grid=json_decode($game->grid);
        foreach($grid as $row){
            foreach($row as $cell){
                if($id==$cell->id) {
                    $cell->revealed=1;
                    $current_cell=$cell;
                }
            }
        }
        $game->grid=json_encode($grid);
        $game->save();

        //IF ADJACENTS IS EMPTY REVEAL AROUND
        //[TODO] REFACTORIZE "SEARCH EMPTY SQUARES SECTION" 
        if($current_cell->adjacents==0){
            //[TODO] NEED A BETTER WAY TO FOUND THE CELL, MAYBE array_search, Check if works in Multidimencional Array
            foreach($grid as $r=>$row){
                foreach($row as $c=>$cell){
                    if($cell->id==$id){
                        for ($r1 = -1; $r1 < 2; $r1++) {
                            for ($c1 = -1; $c1 < 2; $c1++) {
                                $nr= $r+$r1;
                                $nc=$c+$c1;
                                if(isset($grid[$nr]) && isset($grid[$nr][$nc])){
                                    $grid[$nr][$nc]->revealed=1;
                                    //[TODO] Repeat if Revealed Square Also has 0 adjacents
                                }
                            }
                        }
                    }
                }
            }
            $game->grid=json_encode($grid);
            $game->save();
        }

        return json_encode($current_cell);
    }

    //HELPERS

    private function hideInfo(Game $game){
        $game->grid=json_decode($game->grid);
        foreach($game->grid as $row){
            foreach($row as $cell){
                if(!$cell->revealed) {
                    $cell->mine=null;
                    $cell->adjacents=null;
                }
            }
        }
        return $game;
    }
}
