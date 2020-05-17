<template>
    <div class="scaffold">
        <h1>Willkommen</h1>
        <img class="gamma-image" src="../assets/Science-Gamma-icon.png" />
        <p>Wir sind die Gruppe Gamma des Kurses "Datenanalyse im Web" und haben eine kleine Applikation entwickelt, um die Feinstaubkonzentration in Düsseldorf für das Jahr 2018 zu visualisieren.</p>
        <p>Was möchtest du zu erst sehen?</p>
    </div>
</template>

<script>
    export default {
        name: "StartScreen"
    }
</script>

<style lang="scss" scoped>
    .scaffold {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        width: calc(100% - 30px);
        max-width: 1110px;
        padding: 20px 15px;
        text-align: center;

        .gamma-image {
            height: auto;
            max-width: 200px;
            margin: 10px 0;
        }
    }
</style>
