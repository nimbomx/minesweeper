const app = new Vue({
	el: '#app',
	data:{
		grid:[],
		game:loadGame,
		mines:null,
		newParams:{
            rows:10,
            cells:10,
            mines:15,
		}
	},
	mounted(){
		this.loadGame();
	},
	methods:{
		createGame(){
    		axios.post(apiRoute+'/api/game/create',this.newParams).then((response) => {
                window.location=apiRoute+'/game/'+response.data.id;
			});
    	},
		loadGame(){
			axios.get(apiRoute+'/api/game/'+this.game).then((response) => {
				this.grid=response.data.grid;
				this.mines=response.data.mines;
			});
		},

		reveal(cell){
			if(cell.revealed!=0) return false;
			if(cell.flags>0) return false;
			axios.get(apiRoute+'/api/square-reveal/'+this.game+'/'+cell.id).then((response) => {
				cell.revealed=response.data.revealed;
				cell.mine=response.data.mine;
				cell.adjacents=response.data.adjacents;
				window.closedS=0;
				this.grid.forEach(function(row){
					row.forEach(function(square){
						if(square.revealed==0){
							window.closedS++;
						}
					})
				})
				if(window.closedS==this.mines){
                    this.winner();
                }
                if(response.data.mine){
                    this.looser();
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
		},
		winner(){
            console.log('win');
            //[ MAKE AN WIN SCREEN ]
        },
        looser(){
            console.log('loose');
            //[ MAKE AN GAME OVER SCREEN ]
        }
	}
});
