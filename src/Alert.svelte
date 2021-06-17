<script>
    export let text;
    export let status;

</script>

<alert class="{status === 1 ? 'green' : 'red'}">
    {text}
</alert>

<style>
    alert{
position: absolute;
top: 30px;
right: 50%;
transform: translate(50%);
color: #2e3440;
font-weight: bolder;
width: 25vw;
text-align: center;
height: 60px;
display: flex;
justify-content: center;
flex-direction: column;
border-radius: 25px;
    }
    .green{
        background: #a3be8c;
    }
    .red{
        background: #bf616a;
    }
</style>