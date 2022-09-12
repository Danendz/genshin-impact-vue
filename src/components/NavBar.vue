<template>
    <nav :class="[{show: showNav}]">
        <ul>
            <li>
                <router-link :to="{name: 'event'}">
                    <img alt="event link" src="@/assets/NavIcons/Icon_Event.webp" />
                </router-link>
            </li>
            <li>
                <router-link :to="{name: 'wish'}">
                    <img alt="wish link" src="@/assets/NavIcons/Icon_Wish.webp" />
                </router-link>
            </li>
            <li>
                <router-link :to="{name: 'inventory'}">
                    <img alt="inventory link" src="@/assets/NavIcons/Icon_Inventory.webp" />
                </router-link>
            </li>
        </ul>
        <button :class="['arrow', {rotateArrow: showNav}]" @click="toggleNav">></button>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showNav = ref(false)
const toggleNav = () => {
    showNav.value = !showNav.value;
}

</script>
<style lang="scss">
nav {
  position: fixed;
  transform: translateY(-100%);
  transition: 0.3s;
  top: 0;
  color: black;
  z-index: 101;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  background: #e5e2db96;
  padding: 3px 0;

  .arrow {
    transition: 0.3s;
    cursor: pointer;
    width: 35px;
    text-align: center;
    background: #e5e2dbb4;
    font-size: 20px;
    border: 1px solid black;
    font-weight: 600;
    position: absolute;
    bottom: -20px;
  }
  ul {
    padding: 5px 0;
    display: flex;
    gap: 15px;
    list-style: none;
    img {
      width: 40px;
      height: 40px;
      transition: 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
.show {
  transform: translateY(0);
}
.rotateArrow {
  transform: rotate(180deg);
}
@media only screen and (max-width: 960px) {
  nav {
    padding: 3px 0;
    li {
      padding: 5px 0;
      display: flex;
      gap: 15px;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>