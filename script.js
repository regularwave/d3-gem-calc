const inputs = document.querySelectorAll('input[type="number"]');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        const wrapper = input.closest('.gem-control').querySelector('.gem-img-wrapper');
        const val = input.valueAsNumber || 0;

        if (wrapper) {
            if (val > 0) {
                wrapper.style.filter = 'none';
                wrapper.style.opacity = '1';
            } else {
                wrapper.style.filter = 'grayscale(100%)';
                wrapper.style.opacity = '0.3';
            }
        }

        calcGemRecipe();
    });

    input.dispatchEvent(new Event('input'));
});

function calcGemRecipe() {
    const getVal = (id) => document.querySelector(id).valueAsNumber || 0;

    const gems = {
        wFR: getVal('#wantFR'),
        hR: getVal('#haveR'),
        hFI: getVal('#haveFI'),
        hI: getVal('#haveI'),
        hM: getVal('#haveM'),
        rR: 0,
        rFI: 0,
        rI: 0,
        rM: 0
    };

    gems.rR = Math.max(0, gems.wFR * 3 - gems.hR);
    gems.rFI = Math.max(0, gems.rR * 3 - gems.hFI);
    gems.rI = Math.max(0, gems.rFI * 3 - gems.hI);
    gems.rM = Math.max(0, gems.rI * 3 - gems.hM);

    printGemRecipe(gems);
}

function printGemRecipe(gems) {
    const recipeCard = document.getElementById('recipeCard');

    if (gems.wFR === 0) {
        recipeCard.innerHTML = `<p>Enter your goal and current inventory above to see the crafting steps.</p>`;
        return;
    }

    if (gems.rM !== 0) {
        recipeCard.innerHTML = `<p style="color: var(--text-accent);">You need ${gems.rM} more Marquise gem${gems.rM === 1 ? "" : "s"}.</p>`;
    } else {
        let instructions = [];

        if (gems.rI > 0) {
            instructions.push(`<p>> Combine ${gems.rI * 3} Marquise into ${gems.rI} Imperial gem${gems.rI === 1 ? "" : "s"}</p>`);
        }
        if (gems.rFI > 0) {
            instructions.push(`<p>> Combine ${gems.rFI * 3} Imperial into ${gems.rFI} Flawless Imperial gem${gems.rFI === 1 ? "" : "s"}</p>`);
        }
        if (gems.rR > 0) {
            instructions.push(`<p>> Combine ${gems.rR * 3} Flawless Imperial into ${gems.rR} Royal gem${gems.rR === 1 ? "" : "s"}</p>`);
        }
        if (gems.wFR > 0) {
            instructions.push(`<p>> Combine ${gems.wFR * 3} Royal into ${gems.wFR} Flawless Royal gem${gems.wFR === 1 ? "" : "s"}</p>`);
        }

        recipeCard.innerHTML = instructions.join('');
    }
}