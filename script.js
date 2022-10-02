const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('change', (a) => dothething(a) )
});

function dothething(gemArray) {
    document.getElementById('recipeCard').innerHTML = document.getElementById('recipeCard').innerHTML + '<br>' + gemArray.target.id + " " + gemArray.target.value;
    // console.log(gemArray.target.id + " " + gemArray.target.value);

    console.log(gemArray)
}