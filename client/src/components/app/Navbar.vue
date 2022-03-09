<template>
    <nav class="sticky">
        <div class="nav-wrapper navbar">
            <ul class="right">
                <router-link
                    :to="{ name: 'Converter' }"
                    custom
                    v-slot="{ href, navigate }"
                >
                    <li>
                        <a
                            :href="href"
                            @click="navigate"
                            class="waves-effect waves-orange pointer"
                        >Конвертер</a
                        >
                    </li>
                </router-link>
                <router-link
                    :to="{ name: 'Currencies' }"
                    custom
                    v-slot="{ href, navigate }"
                >
                    <li>
                        <a
                            :href="href"
                            @click="navigate"
                            class="waves-effect waves-orange pointer"
                        >Валюты</a
                        >
                    </li>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<style>
.navbar {
    background-color: #212e53;
}
</style>