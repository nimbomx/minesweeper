const app = new Vue({
	el: '#app',
	data:{
		grid:[],
		game:loadGame,
		mines:null,
		enlapsed_time:0,
		newParams:{
            rows:10,
            cells:10,
            mines:15,
		},
		timer:null,
		game_over:true
	},
	mounted(){
		this.loadGame();
		
	},
	methods:{
		createGame(){
			this.stopTimer();
    		axios.post(apiRoute+'/api/game/create',this.newParams).then((response) => {
                window.location=apiRoute+'/game/'+response.data.id;
			});
    	},
		loadGame(){
			this.stopTimer();
			axios.get(apiRoute+'/api/game/'+this.game).then((response) => {
				this.grid=response.data.grid;
				this.mines=response.data.mines;
				this.game_over=false;
				this.startTimer();
			});
		},
		reloadGame(){
			axios.get(apiRoute+'/api/game/'+this.game).then((response) => {
				this.grid=response.data.grid;
			});
		},

		reveal(cell){
			if(this.game_over) return false;
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
                    this.reloadGame();
                }
			});
		},
		flag(cell,e){
			if(this.game_over) return false;
			if(cell.revealed!=0) return false;
			if(cell.flags==0)cell.flags=1;
			else if(cell.flags==1)cell.flags=2;
			else if(cell.flags==2)cell.flags=0;
			e.preventDefault();
			axios.get(apiRoute+'/api/square-flag/'+this.game+'/'+cell.id+'/'+cell.flags).then((response) => {
				console.log('flagged');
			});
		},

		startTimer(){
			this.timer=setInterval(this.updateTime, 1000);
		},
		stopTimer(){
			clearInterval(this.timer);
		},
		updateTime(){
			this.enlapsed_time++;
		},

		winner(){
			this.game_over=true;
			this.stopTimer();
            console.log('win');
            //[ MAKE AN WIN SCREEN ]
        },
        looser(){
        	this.game_over=true;
        	this.stopTimer();
            console.log('loose');
            //[ MAKE AN GAME OVER SCREEN ]
        }
	}
});
