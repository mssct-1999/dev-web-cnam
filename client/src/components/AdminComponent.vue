<template>
    <div style="display:flex;justify-content:center;align-items:center;height:60vh;">
        {{ this.$session.get('identite') }}
    </div>
</template>

<script>
// import axios from 'axios'
export default {
     /* eslint-disable */
    name:"AdminComponent",
    props: ['user'],
    data:function() {
        return {
            
        }
    },
    beforeCreate: function() {
        if (!this.session.exists()) {
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