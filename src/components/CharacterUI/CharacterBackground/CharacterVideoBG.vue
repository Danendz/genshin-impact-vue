<template>
    <transition name="fade">
        <section v-if="store.currentCharacter"
            class="character-background-container character-background-container_video" v-show="showDemoBGVideo.show">
            <transition name="fade" appear>
                <LoaderSpinner v-if="videoLoading" />
            </transition>
            <transition name="fade">
                <video class="character-background-container__video" @ended="showDemoBGVideo.show = false"
                    :key="store.currentCharacter.name_key" ref="bgVideo">
                    <source
                        :src="store.currentCharacter.name_key.includes('traveler') ? videos['traveler'] : videos[store.currentCharacter.name_key]">
                </video>
            </transition>
        </section>
    </transition>
</template>

<script setup lang="ts">
//components
import LoaderSpinner from '@/components/UI/LoaderSpinner.vue'

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useShowDemoBGVideo } from '@/store/showDemoBGVideo';

//vue
import { watch, ref } from 'vue'

const store = useCurrentCharacter();
const showDemoBGVideo = useShowDemoBGVideo()

const bgVideo = ref<HTMLVideoElement>()
const videoLoading = ref(false)

watch(bgVideo, () => {
    if (bgVideo.value) {
        bgVideo.value.volume = 0.2
    }
})
watch(() => store.currentCharacter, () => {
    if (bgVideo.value) {
        if (showDemoBGVideo.show) {
            showDemoBGVideo.show = false
        }
    }
})

const convertLink = (link: string): string => {
    return "https://dl.dropboxusercontent.com/s/" + link
}

const videos: Record<string, string> = {
    "albedo": convertLink("uw99ji1ewwcehf6/albedo.mp4?dl=0"),
    "aloy": convertLink("mhptvfavktsxfvh/aloy.mp4?dl=0"),
    "amber": convertLink("t32wimz7mt9k1r3/amber.mp4?dl=0"),
    "arataki-itto": convertLink("pcmw8i0vg53450a/arattaki-itto.mp4?dl=0"),
    "ayaka": convertLink("7m0ob70mrambfky/ayaka.mp4?dl=0"),
    "ayato": convertLink("27npqfl5ihadfbw/ayato.mp4?dl=0"),
    "barbara": convertLink("97drac3e6af9lck/barbara.mp4?dl=0"),
    "beidou": convertLink("krs7svcid3mffpy/beidou.mp4?dl=0"),
    "bennett": convertLink("4tmh9o9uqcs9wi5/bennet.mp4?dl=0"),
    "chongyun": convertLink("20cuzr0tfq4ws7t/chongyun.mp4?dl=0"),
    "collei": convertLink("nnuyn3cly3kam3a/collei.mp4?dl=0"),
    "diluc": convertLink("xjolwmdbn3j857g/diluc.mp4?dl=0"),
    "diona": convertLink("qhorrch8t4e2aoj/diona.mp4?dl=0"),
    "dori": convertLink("gtgrvrdf4sw1p58/dori.mp4?dl=0"),
    "eula": convertLink("s9mnp5fvg7kggqa/eula.mp4?dl=0"),
    "fischl": convertLink("qupyzbf6mkbboi6/fischl.mp4?dl=0"),
    "ganyu": convertLink("8qucuvha9oounne/ganyu.mp4?dl=0"),
    "gorou": convertLink("fir9woq8es53nuw/gorou.mp4?dl=0"),
    "hu-tao": convertLink("rcqrg0v2vvgj9jv/hu-tao.mp4?dl=0"),
    "jean": convertLink("sq00ml8w3m66ytv/jean.mp4?dl=0"),
    "kaeya": convertLink("siknlzn9xmhkt92/kaeya.mp4?dl=0"),
    "kazuha": convertLink("ahme18ztscj9ahd/kazuha.mp4?dl=0"),
    "keqing": convertLink("fm0sja5kfc4ccii/keqing.mp4?dl=0"),
    "klee": convertLink("tszp1b0vmkwbqyy/klee.mp4?dl=0"),
    "kokomi": convertLink("i7umcn06lbrcyyq/kokomi.mp4?dl=0"),
    "kuki-shinobu": convertLink("0xjfi6lpnfwngsg/kuki.mp4?dl=0"),
    "lisa": convertLink("mt9mx6g79tzrsop/lisa.mp4?dl=0"),
    "mona": convertLink("l16eb53fcsfy22q/mona.mp4?dl=0"),
    "ningguang": convertLink("n2siiqr4fq4f0sd/ningguang.mp4?dl=0"),
    "noelle": convertLink("zvls3qgbqfbbi6l/noelle.mp4?dl=0"),
    "qiqi": convertLink("e8ssnsz0vzjri8w/qiqi.mp4?dl=0"),
    "raiden": convertLink("exa3e5ts0kgfe9b/raiden-ruten.mp4?dl=0"),
    "razor": convertLink("llcqbz99tho032g/razor.mp4?dl=0"),
    "rosaria": convertLink("1nz56krbyhidxzd/rosaria.mp4?dl=0"),
    "sara": convertLink("yzjlegtuwhtkx2c/sara.mp4?dl=0"),
    "sayu": convertLink("pyx0c6zi5wesyzu/sayu.mp4?dl=0"),
    "shenhe": convertLink("gjsc646u2pbxdlb/shenhe.mp4?dl=0"),
    "shikanoin-heizou": convertLink("9jsfa6741fzmstu/heizou.mp4?dl=0"),
    "sucrose": convertLink("c56wybfdukk1i9r/sucrose.mp4?dl=0"),
    "tartaglia": convertLink("vi2nkutqekpdn3m/tartaglia.mp4?dl=0"),
    "thoma": convertLink("yv6nnjfw8vys0ae/thoma.mp4?dl=0"),
    "tighnari": convertLink("1zaf4xd0u5ndstu/tighnari.mp4?dl=0"),
    "venti": convertLink("uou3fw89pkpbl78/venti.mp4?dl=0"),
    "xiangling": convertLink("2wbbfbk5653rg7e/xiangling.mp4?dl=0"),
    "xiao": convertLink("o3k1n2wdxfidjez/xiao.mp4?dl=0"),
    "xingqiu": convertLink("02j6qmopgpzjm91/xingqiu.mp4?dl=0"),
    "xinyan": convertLink("pjspjsj5in2d6mc/xinyan.mp4?dl=0"),
    "yae-miko": convertLink("pd275mrmrdj8num/yae-miko.mp4?dl=0"),
    "yanfei": convertLink("7oevw0auz27lc2x/yanfei.mp4?dl=0"),
    "yelan": convertLink("qaoenan9yeymbxi/yelan.mp4?dl=0"),
    "yoimiya": convertLink("jtl7vpmq4kviv36/yoimiya.mp4?dl=0"),
    "yun-jin": convertLink("pgxqqfpclnbytyr/yun-jin.mp4?dl=0"),
    "zhongli": convertLink("f0yftsp6ai0nscf/zhongli.mp4?dl=0"),
    "traveler": convertLink("rpylkdpsvslasrn/cyberpunk.mp4?dl=0")
}

const stopVideo = () => {
    if (bgVideo.value) {
        videoLoading.value = false

        bgVideo.value.pause()
        bgVideo.value.currentTime = 0
    }
}

const playVideo = () => {
    if (bgVideo.value) {
        if (bgVideo.value.readyState === 4) {
            bgVideo.value.play();
        } else {
            videoLoading.value = true
            const canplay = () => {
                if (showDemoBGVideo.show) {
                    bgVideo.value?.play();
                }
                videoLoading.value = false
                bgVideo.value?.removeEventListener('canplay', canplay)
            }
            bgVideo.value.addEventListener('canplay', canplay)
        }
    }
}

watch(() => showDemoBGVideo.show, () => {
    if (showDemoBGVideo.show) {
        playVideo()
    } else {
        stopVideo();
    }
})

</script>

<style lang="scss">
@import '@/assets/Styles/CharacterUI/CharacterBackground/CharacterBackground';

.character-background-container {
    &_video {
        z-index: -8;
    }

    &__video {
        height: 100%;
        width: 177.77777778vh;
        min-width: 100%;
        min-height: 56.25vw;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
    }
}
</style>