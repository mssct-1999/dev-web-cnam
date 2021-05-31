<template>
    <div>
        <h1 class="mg-l-40 mg-t-40">Bienvenue {{ this.$session.get('identite') }}</h1>
    </div>
</template>

<script>
// import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name:"AdminComponent",
    props: ['user'],
    data:function() {
        return {
            
        }
    },
    beforeCreate: function() {
        if (!this.$session.exists()) {
            Swal.fire({
                title:"Accès refusée",
                text:'Vous devez être connecté pour accéder à cette page',
                icon:'error',
                confirmButtonText:'Ok'
            })
            this.$router.push('/')
        }
    },
    methods: {
        // empty
    }
}
</script>

<style scoped>

</style>