<template>
    <div>
    <BaseDialog :show="!!error" title="Error">
        <p>{{ error }}</p>
    </BaseDialog>
    <section>
        <CoachFilter @change-filter="setFilter"></CoachFilter>
    </section>
    <base-card>
    <Section>
        <div class="controls">
            <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
            <base-button v-if="!isCoach && !isLoading"  link to="/register">Register a coach</base-button>
        </div>
        <div v-if="isLoading">
            <BaseSpinner></BaseSpinner>
        </div>
        <ul v-else-if="hasCoaches">
            <CoachIteam v-for="coach in filteredCoaches" :key="coach.id"
            :id="coach.id" 
            :first-name="coach.firstName" 
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :actions="coach.actions"
            :areas="coach.areas"
            >

            </CoachIteam>
        </ul>
        <h3 v-else>No coaches found.</h3>
    </Section>
    </base-card>
    </div>
</template>


<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachIteam from '../../components/coaches/CoachIteam.vue';
export default {
    components:{
    CoachIteam,
    CoachFilter,
},
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                carrer: true
            }
        }
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => {
                if(this.activeFilters.frontend && coach.areas.includes('frontend')){
                    return true;
                }
                if(this.activeFilters.backend && coach.areas.includes('backend')){
                    return true;
                }
                if(this.activeFilters.career && coach.areas.includes('career')){
                    return true;
                }
                return false;
            })
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        }
    },
    methods: {
        setFilter(updatedFilters){
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false){
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh});
            } catch(error) {
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        }
    },
    created(){
        this.loadCoaches();
    }
}

</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>