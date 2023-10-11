<script setup lang="ts">
import router from '@/router';
import helpers from '@/support/helpers';
import { useRequestToken } from '@/support/requestToken';
import { onBeforeMount } from 'vue';

const { requestToken } = useRequestToken();

onBeforeMount(async () => {
    try {
        await requestToken();
        const { accessToken } = helpers.getLocalStorage()
        if (accessToken) {
            console.log('tudo certo, redirecionando para inicio')
            router.push("/")
        }
    } catch (error) {
        console.log('Error on handle callback: ', error)
    }
})
</script>