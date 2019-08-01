<template>
  <div>
    <div class="page-title">
      <h3>{{ 'profileTitle' | localizeFilter }}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: ($v.name.$dirty && !$v.name.required) }"
        />
        <label for="description">{{ 'profileName' | localizeFilter }}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >Name is required</small>
      </div>

      <div class="switch">
        <label>
          Eng
          <input type="checkbox" v-model="isUaLocale" />
          <span class="lever"></span>
          Укр
        </label>
      </div>

      <br />

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'profileBtn' | localizeFilter }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    name: '',
    isUaLocale: true
  }),
  validations: {
    name: { required }
  },
  methods: {
    ...mapActions(['updateInfo']),
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isUaLocale ? 'ua-UA' : 'en-US'
        })
      } catch (e) {}
    }
  },
  mounted() {
    this.name = this.info.name
    this.isUaLocale = this.info.locale === 'ua-UA'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>
