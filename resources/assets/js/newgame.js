const app = new Vue({
    el: '#app',
    data:{
    	game:null,
        newParams:{
            rows:10,
            cells:10,
            mines:15,
        }
    },
    mounted(){

    },
    methods:{
    	createGame(){
            axios.post(apiRoute+'/api/game/create',this.newParams).then((response) => {
                window.location=apiRoute+'/game/'+response.data.id;
            });
        },
    
    }
});
