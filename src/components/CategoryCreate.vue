<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subname">
        <h4>{{'Create'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
          >
          <label for="name">{{'name'|localize}}</label>
          <span
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
          >{{'Message_Categoryname'|localize}}</span>
        </div>

        <div class="input-field">
          <input
            id="last_name"
            type="text"
            v-model="last_name"
            :class="{invalid: $v.last_name.$dirty && !$v.last_name.required}"
          >
          <label for="name">{{'last_name'|localize}}</label>
          <span
            v-if="$v.last_name.$dirty && !$v.last_name.required"
            class="helper-text invalid"
          >{{'Message_Categoryname'|localize}}</span>
        </div>



        <button class="btn waves-effect waves-light" type="submit">
          {{'Create'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'
export default {
  data: () => ({
    name: '',
    last_name: ''
  }),
  validations: {
    name: { required },
    last_name: { required }
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          name: this.name,
          last_name: this.last_name
        })
        this.name = ''
        this.last_name = ''
        this.$v.$reset()
        this.$message(localizeFilter('Category_HasBeenCreated'))
        this.$emit('created', category)
      } catch (e) {}
    }
  }
}
</script>
