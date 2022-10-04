const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('change', (a) => calcGemRecipe(a))
});

function calcGemRecipe() {

    const gems = {
        "wFR": document.querySelector('#wantFR').valueAsNumber,
        "hR": document.querySelector('#haveR').valueAsNumber,
        "hFI": document.querySelector('#haveFI').valueAsNumber,
        "hI": document.querySelector('#haveI').valueAsNumber,
        "hM": document.querySelector('#haveM').valueAsNumber,
        "rR": 0, "rFI": 0, "rI": 0, "rM": 0
    };

    gems.rR = Math.max(0, gems.wFR * 3 - gems.hR);
    gems.rFI = Math.max(0, gems.rR * 3 - gems.hFI);
    gems.rI = Math.max(0, gems.rFI * 3 - gems.hI);
    gems.rM = Math.max(0, gems.rI * 3 - gems.hM);

    printGemRecipe(gems);
}

function printGemRecipe(gems) {
    const recipeCard = document.getElementById('recipeCard');
    recipeCard.innerHTML = "";

    if (gems.rM != 0) {
        recipeCard.innerHTML = "You need " + (gems.rM) + " more Marquise gem" + (gems.rM == 1 ? "" : "s") + ".";
    } else {
        if (gems.rI > 0) { recipeCard.innerHTML = recipeCard.innerHTML + '<p>' + "Create " + gems.rI + " Imperial gem" + (gems.rI == 1 ? "" : "s") + "." + '</p>'; }
        if (gems.rFI > 0) { recipeCard.innerHTML = recipeCard.innerHTML + '<p>' + "Create " + gems.rFI + " Flawless Imperial gem" + (gems.rFI == 1 ? "" : "s") + "." + '</p>'; }
        if (gems.rR > 0) { recipeCard.innerHTML = recipeCard.innerHTML + '<p>' + "Create " + gems.rR + " Royal gem" + (gems.rR == 1 ? "" : "s") + "." + '</p>'; }
        recipeCard.innerHTML = recipeCard.innerHTML + '<p>' + "Create " + gems.wFR + " Flawless Royal gem" + (gems.wFR == 1 ? "" : "s") + "." + '</p>';
    }
}