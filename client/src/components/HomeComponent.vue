<template>
    <div id="main">
        <div id="second-navbar">
            <PaintComponentImage href="#main-PresentationComponent" class="paint-link" width="130" mgTopPx="10" title="Présentation"></PaintComponentImage>
            <PaintComponentImage class="paint-link" width="130" mgTopPx="50" title="Qui suis-je ?"></PaintComponentImage>
            <PaintComponentImage href="#main-LocalisationComponent" class="paint-link" width="150" mgTopPx="0" title="Où me trouvez ?"></PaintComponentImage>
            <PaintComponentImage class="paint-link" width="130" mgTopPx="50" title="Contact"></PaintComponentImage>
        </div>
        <PresentationComponent></PresentationComponent>
        <LocalisationComponent></LocalisationComponent>
    </div>
</template>

<script>
import PaintComponentImage from "./PaintComponentImage" 
import PresentationComponent from "./PresentationComponent"
import LocalisationComponent from "./LocalisationComponent"

export default {
    components: { PaintComponentImage, PresentationComponent, LocalisationComponent},   
    data() {
        return {
        }
    }
}
</script>

<style scoped>
    #second-navbar {
        display:flex;
        justify-content: center;
        align-items: center;
        padding:50px;
        margin-bottom:50px;
    }

    #second-navbar * {
        margin-right:100px;
    }

    #second-navbar {
        display:flex;
        justify-content: center;
    }
</style>