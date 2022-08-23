const result_elem = document.getElementById('result');
const result_value = document.getElementById('result-value');
const intro_elem = document.getElementById('intro');
const new_calc_btn = document.getElementById('new-calc');
const calc_elem = document.getElementById('calc-data');
new_calc_btn.addEventListener('click', newCalculation);
calc_elem.addEventListener('submit', setupCalculationData);

function setupCalculationData(e) {
    e = e || window.event;
    e.preventDefault();

    /* ---- */
    const lat1 = calc_elem.elements['lat1'].value;
    const lng1 = calc_elem.elements['lng1'].value;
    /* ---- */
    const lat2 = calc_elem.elements['lat2'].value;
    const lng2 = calc_elem.elements['lng2'].value;
    /* ---- */
    const unit = conversion.options[conversion.selectedIndex].value;
    const distance = calculate(lat1, lng1, lat2, lng2, unit);

    if (distance) {
        result_elem.style.display = 'block';
        calc_elem.style.display = 'none';
        intro_elem.style.display = 'none';
        showResult(distance, unit, calc_elem.elements);
    }
}

function calculate(lat1, lng1, lat2, lng2, unit) {
    let s;
    switch (unit) {
        case 'nm':
            s = 0.5399;
            break;
        case 'km':
            s = 1;
            break;
    }

    const p = 0.017453292519943295;
    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + (Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lng2 - lng1) * p))) / 2;
    r = Math.round(12742 * s * Math.asin(Math.sqrt(a)) * 1000) / 1000;
    return r;
}

function showResult(d, u, e) {
    result_value.innerText = `${d} ${u}`;
    Array.from(e).forEach((element) => {
        if (element.type === 'text') {
            element.value = '';
        }
    });
}

function newCalculation() {
    result_elem.style.display = 'none';
    calc_elem.style.display = 'block';
    intro_elem.style.display = 'block';
}