const app = new Vue({
    el: '#app',
    data:{
    	grid:[],
    	game:null
    },
    mounted(){
    	//alert('newgame');
    },
    methods:{
    	createGame(){
    		axios.get(apiRoute+'/api/game/create').then((response) => {
				this.grid=response.data.grid;
				this.game=response.data.id;
			});
    	}
    }
});
