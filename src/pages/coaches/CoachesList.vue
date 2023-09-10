<template>
    <section>
        <CoachFilter @change-filter="setFilter"></CoachFilter>
    </section>
    <base-card>
    <Section>
        <div class="controls">
            <base-button mode="outline">Refresh</base-button>
            <base-button v-if="!isCoach"  link to="/register">Register a coach</base-button>
        </div>
        <ul v-if="hasCoaches">
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
</template>


<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachIteam from '../../components/coaches/CoachIteam.vue';
export default {
    components:{
        CoachIteam,
        CoachFilter
    },
    data() {
        return {
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
            return this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        }
    },
    methods: {
        setFilter(updatedFilters){
            this.activeFilters = updatedFilters;
        }
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