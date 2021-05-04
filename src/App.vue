<template>
  <NotificationContainer/>
  <router-view/>
</template>
<script>
import NotificationContainer from './plugins/notification/components/NotificationContainer'

export default {
  components: {NotificationContainer}
}
</script>
