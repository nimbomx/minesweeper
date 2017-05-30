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
    		cell.revealed=1;
    		if(cell.mine){
				alert('Bum!')
				//[ MAKE AN GAME OVER SCREEN ]
			}
    	}
    }
});
