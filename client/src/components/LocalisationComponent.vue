<template>
    <div id="main-LocalisationComponent">
        <h1 class="main-title mg-b-50">Où suis-je ?</h1>
        <div id="gmap-container">    
            <GmapMap
            :center='center'
            :zoom='18'
            style='width:70%;  height: 400px;'
            >
                <GmapMarker
                    :position="center"
                />  
            </GmapMap>
            <div class="custom-card">
                <div class="custom-card-header">
                    <h3>
                        Mutualité de Troyes 
                    </h3>
                </div>
                <div class="custom-card-body">
                    <div class="card-element">
                        <i class="fas fa-map-marker-alt"></i>
                        18 rue Emile Zola, 10 000 Troyes
                    </div>
                    <div class="card-element">
                        <i class="fas fa-phone-alt"></i>
                        03.25.25.25.25
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"LocalisationComponent",
        data:function() {
            return {
                center: {lat: 48.2974861, lng:4.0763884},
            }
        },
    }
</script>

<style scoped>
    #main-LocalisationComponent {
        /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
        padding:50px;
    } 
    #gmap-container {
        display:flex;
        justify-content: space-around;
    }
</style>