const app = new Vue({
    el: '#app',
    data:{
    	game:null
    },
    mounted(){

    	this.createGame();

    },
    methods:{
    	createGame(){
    		axios.get(apiRoute+'/api/game/create').then((response) => {
                window.location=apiRoute+'/game/'+response.data.id;
			});
    	},
    
    }
});
