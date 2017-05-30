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
            if($i<=$mines){
            $square=1;//add mines
        }else{
            $square=0;//add empty squares
        }
        $squares[]=$square;

        //CREATE GRID

        $game->grid=serialize($grid);
        $game->save();
        
        return $game;
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
        //
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
}
