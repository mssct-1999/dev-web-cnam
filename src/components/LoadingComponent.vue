<template>
    <div id="main">
        <div id="loading">
            <div id="loading-content">
                <span id="brand-text">Sophrofraise'tralala</span>
                <img id="image-loader" src="../assets/img/strawberry.png" />
            </div>
        </div>
        <div class="div-animation" id="div-text-visible">association</div>
        <div class="div-animation" id="div-text-hidden">
            <span>pour répandre le mieux être et le mieux manger</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'LoadingComponent'
}
</script>

<style scoped>
    #main {
        height:100vh;
        display:flex;
        justify-content: center;
        align-items:center;
    }

    #loading {
        background-color:#BAD5CA;
    }

    #loading-content {
        color:black;
    }

    #brand-text {
        font-size:40px;
        font-family:'Pontano Sans',sans-serif;
        font-weight:bolder;
    }

    #image-loader {
        margin-top:-20px;
        margin-left:-20px;
        -webkit-animation: tp-rotateplane 2.5s infinite ease-in-out;
        animation: tp-rotateplane 2.5s infinite ease-in-out;
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        -webkit-animation-fill-mode: none !important;
        animation-fill-mode: none !important;
        width: 90px;
        margin-left:20px;
    }

    #div-text-hidden span {
        margin-left: -355px;
        animation: slidein 15s infinite;
    }

    #div-text-hidden {
        width: 0px;
        animation: reveal 15s infinite;
        font-weight:bolder;
    }

    #div-text-visible {
    animation: showup 15s infinite;
    font-weight:bolder;
}

    .div-animation {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        font-family:'Pontano Sans',sans-serif;
        font-size:20px;
    }

    @keyframes showup {
        0% {opacity:0;}
        20% {opacity:1;}
        80% {opacity:1;}
        100% {opacity:0;}
    }

    @keyframes slidein {
        0% { margin-left:-800px; }
        20% { margin-left:-800px; }
        35% { margin-left:5px; }
        100% { margin-left:5px; }
    }

    @keyframes reveal {
        0% {opacity:0;width:0px;}
        20% {opacity:1;width:0px;}
        30% {width:500px;}
        80% {opacity:1;}
        100% {opacity:0;width:500px;}
    }


    @keyframes tp-rotateplane {
        0% { 
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
        } 50% { 
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
        } 100% { 
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        }
    }

    @-webkit-keyframes tp-rotateplane {
    0% { -webkit-transform: perspective(120px) }
    50% { -webkit-transform: perspective(120px) rotateY(180deg) }
    100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
    }
</style>