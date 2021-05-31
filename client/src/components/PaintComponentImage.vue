<template>
    <a href="#" :style="cssProps">
        <div id="main-PaintComponentImage" :style="cssProps">
            <span id="text">{{ title }}</span>
        </div>
    </a>
</template>

<script>
export default {
    props:['title','mgTopPx','width'],
    computed: {
        cssProps() {
            return {
                'margin-top': this.mgTopPx + "px",
                'width': this.width + "px",
                'background-size': this.width + "px",
                'height': this.width + "px"
            }
        }
    }
}
</script>

<style scoped>
    #main-PaintComponentImage {
        background-image: url("../assets/img/paint.png");
        /* background-repeat: no-repeat;   */
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s;
        transform: scale3d(1.31861, 1.31861, 1);
    }

    #main-PaintComponentImage:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
    
    #title-image {
        color:white;
    }

    #text {
        color:white;
        font-weight:bolder;
    }

    a:hover {
        text-decoration:none;
    }

    a {
        text-decoration:none;
    }
</style>