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
    		if(cell.revealed!=0) return false;
    		if(cell.flags>0) return false;
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
    	},
    	flag(cell,e){
    		if(cell.flags==0)cell.flags=1;
    		else if(cell.flags==1)cell.flags=2;
    		else if(cell.flags==2)cell.flags=0;
    		e.preventDefault();
    		axios.get(apiRoute+'/api/square-flag/'+this.game+'/'+cell.id+'/'+cell.flags).then((response) => {
    			console.log('flagged');
			});
    	}
    }
});
