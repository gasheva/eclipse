<template>
    <div class="container">
        <div class="card-content white">
            <p class="card-title">{{ title }}</p>
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title'],
};
</script>

<style>

.card-content {
    padding: 0.7em;
    border-radius: 10px;
    margin-bottom: 1em;
}

.card-title {
    color: gray;
    text-align: start;
    padding-left: 0.75rem;
}
</style>