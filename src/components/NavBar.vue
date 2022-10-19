<template>
  <nav :class="['top-nav' ,{'top-nav_active': activeNav}]">
    <ul class="top-nav__items">

      <li v-for="navLink in navLinks" :key="navLink.name">
        <router-link :to="{name: navLink.name}">
          <img class="top-nav__link" :alt="`${navLink.name} link`"
            :src="CharacterHelper.getGenshinSiteIcons(navLink.imgUrl)" />
        </router-link>

      </li>

    </ul>
    <ButtonWithIcon class="top-nav__arrow" @click="toggleNav" icon="mdi:chevron-down"
      :icon-class="['top-nav__icon', {'top-nav__arrow_active': activeNav}]" />
  </nav>
</template>

<script setup lang="ts">
//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//components
import ButtonWithIcon from '@/components/UI/ButtonWithIcon.vue'

//vue
import { ref } from 'vue';

interface INavLinks {
  name: string,
  imgUrl: string
}

const navLinks: INavLinks[] = [
  {
    name: 'event',
    imgUrl: "nav-icons/Icon_Event"
  },
  {
    name: "wish",
    imgUrl: "nav-icons/Icon_Wish"
  },
  {
    name: "inventory",
    imgUrl: "nav-icons/Icon_Inventory"
  },
  {
    name: "characters",
    imgUrl: "nav-icons/Icon_Character"
  }
]

const activeNav = ref(false)
const toggleNav = () => {
  activeNav.value = !activeNav.value;
}

</script>
<style lang="scss">
.top-nav {
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

  &_active {
    transform: translateY(0);
  }

  &__arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
    width: 35px;
    height: 20px;

    background: #e5e2dbb4;
    overflow: hidden;
    border: 1px solid black;
    font-weight: 600;
    position: absolute;
    bottom: -20px;

    &_active {
      transform: rotate(180deg);
    }

    .top-nav__icon {
      width: 30px;
      height: 30px;
      transition: .3s;
    }
  }

  &__items {
    padding: 5px 0;
    display: flex;
    gap: 15px;
    list-style: none;

    .top-nav__link {
      width: 40px;
      height: 40px;
      transition: 0.3s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}


@media only screen and (max-width: 960px) {
  .top-nav {
    padding: 3px 0;

    &__items {
      padding: 5px 0;
      display: flex;
      gap: 15px;

      .top-nav__link {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>