<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::middleware('auth:api')->post('square-reveal/{game}/{id}','GameController@reveal');
Route::middleware('auth:api')->post('square-flag/{game}/{id}/{flag}','GameController@flag');
Route::middleware('auth:api')->post('auto-save/{game}','GameController@autoSave');
Route::middleware('auth:api')->post('game/create','GameController@create');
Route::middleware('auth:api')->resource('game','GameController');