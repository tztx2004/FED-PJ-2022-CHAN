<!-- html 템플릿코드 -->
<template>
    <div class="mytemp">
        <span class="tit">{{ txt }}</span>
    </div>
</template>

<!-- 자바스크립트 코드 -->
<script>
    export default(await import("vue").undefineComponent({
        name:"myTemp",
        deta(){
            return{
                txt: "연습이에요~!"
            }
        }
    }));
</script>

<!-- 스타일 시트 코드 -->
<style scoped>
    span.tit{color:red}
</style>