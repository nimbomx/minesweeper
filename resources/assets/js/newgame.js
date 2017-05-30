const app = new Vue({
    el: '#app',
    data:{
    	grid:[],
    	game:null
    },
    mounted(){
    	if(!this.game){
    		this.createGame();
    	}
    	// [SAVE IN LOCAL STORAGE LAST GAME ID FOR AUTLOAD ON REFRESH BROWSER]
    },
    methods:{
    	createGame(){
    		axios.get(apiRoute+'/api/game/create').then((response) => {
				this.grid=response.data.grid;
				this.game=response.data.id;
                window.history.pushState('playgame', 'PlayGame', apiRoute+'/game/'+this.game);
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
                if(response.data.adjacents==0){
                    this.loadGame();
                }

            });

        }
    }
});
