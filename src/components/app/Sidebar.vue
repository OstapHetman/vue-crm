<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: localizeFilter('menuTitle1'), url: '/', exact: true },
      { title: localizeFilter('menuTitle2'), url: '/history' },
      { title: localizeFilter('menuTitle3'), url: '/planning' },
      { title: localizeFilter('menuTitle4'), url: '/record' },
      { title: localizeFilter('menuTitle5'), url: '/categories' }
    ]
  })
}
</script>

