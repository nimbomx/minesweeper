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
