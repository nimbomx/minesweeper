const app = new Vue({
    el: '#app',
    data:{
    	grid:[],
    	game:loadGame
    },
    mounted(){
    	this.loadGame();
    },
    methods:{
    	loadGame(){
    		axios.get(apiRoute+'/api/game/'+this.game).then((response) => {
				this.grid=response.data.grid;
			});
    	},

    	reveal(cell){
    		axios.get(apiRoute+'/api/square-reveal/'+this.game+'/'+cell.id).then((response) => {

				cell.revealed=response.data.revealed;
				cell.mine=response.data.mine;
				cell.adjacents=response.data.adjacents;
				if(response.data.mine){
					alert('Bum!');
					//[ MAKE AN GAME OVER SCREEN ]
				}

			});

    	}
    }
});
