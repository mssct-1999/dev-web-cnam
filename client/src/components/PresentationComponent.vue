<template>
  <div id="main-PresentationComponent">
    <h1 class="main-title mg-b-50">Présentation</h1>
      <v-container style="margin-left:0 !important;">
        <v-row>
          <v-card width="400" >
            <v-card-title class="black--text mt-5">
              <v-avatar size="56">
                <img
                  alt="user"
                  src="../assets/img/portrait.png"
                >
              </v-avatar>
              <div style="display:flex;flex-direction:column" class="ml-2">
                <span>Hélène Massicot</span>
                <span style="font-size:10px;position:relative;bottom:10px;">Diététicienne / Sophrologue</span>
              </div>
            </v-card-title>

            <v-card-text>
              <div class="font-weight-bold ml-8 mb-2">
                Aujourd'hui
              </div>

              <v-timeline
                align-top
                dense
              >
                <v-timeline-item
                  v-for="message in timeline"
                  :key="message.annee"
                  :color="message.color"
                  small
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>{{ message.diplome }}</strong> - {{ message.annee }}
                  </div>
                  <div>{{ message.description }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import $ from 'jquery'
// window.onscroll = function() {
//     this.scroll = window.pageYOffset
//     $("#main-PresentationComponent").css("transform","translate3d(0px,-" + this.scroll + "px,0px)")
// }
export default {
    name:"PresentationComponent",
    data:function() {
        return {
          timeline: [
            {
              diplome: "DU Gestion du stress et de l'anxiété",
              ecole:"IUT blabla",
              annee:"2020",
              color:'green',
              description: "Une description"
            }
          ]
        }
    },
}
</script>

<style scoped>
    #main-PresentationComponent {
        /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
        padding:50px;
    }

    .main-title {
        font-family:'Pontano Sans',sans-serif;
        font-weight:bolder;
    }

</style>