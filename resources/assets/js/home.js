const app = new Vue({
    el: '#app',
    data:{
        route:apiRoute,
    	games:[]
    },
    mounted(){
    	this.listGames();
    },
    methods:{
    	listGames(){
    		axios.get(apiRoute+'/api/game').then((response) => {
				this.games=response.data;
			});
    	},
        deleteGame(id){
            if(!confirm('Delete the game?')) return false;
            axios.delete(apiRoute+'/api/game/'+id).then((response) => {
                this.listGames();
            });
        }
    }
});
