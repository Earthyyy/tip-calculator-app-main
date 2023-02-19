const billInput = document.querySelector('#bill');
const tipValue = document.getElementsByName('tip');
const customTip = document.querySelector('#custom');
const peopleNumber = document.querySelector('#people');
const peopleNumberFieldset = document.querySelector('.tip-calculator__people-number')
const resetBtn = document.querySelector('#reset-btn');

const tipAmount = document.querySelector('.tip-amount p');
const totalAmount = document.querySelector('.total p');

const form = document.querySelector('.tip-calculator__user-input');


/* Utility Functions */
const resetRadio = () => {
    tipValue.forEach(radio => {
        radio.checked = false;
    })
}

const radioValue = () => {
    for (let i = 0; i < tipValue.length; i++) {
        if (tipValue[i].checked) return parseInt(tipValue[i].value);
    }
    return 0;
}



/* Restricting Inputs to allow only numbers */
billInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
})

peopleNumber.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
})


customTip.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
})




/* Toggling between defined tip values and custom one */
customTip.addEventListener('focus', () => {
    resetRadio();
})


tipValue.forEach(radioBtn => {
    radioBtn.onclick = () => {
        customTip.value = "";
    }
})









/* Calculating Tip Amount and Total Amount by person */
form.addEventListener('change', () => {
    resetBtn.disabled = false;

    const billInputValue = billInput.value ? parseFloat(billInput.value) : 0;
    const {value: customTipValue} = customTip;
    const peopleNumberValue = peopleNumber.value ? parseInt(peopleNumber.value) : 0;

    console.log(billInputValue)
    console.log(peopleNumberValue)



    const tipValue = parseFloat(customTipValue) || radioValue() || 0;

    if (peopleNumberValue && billInputValue) {
        let calculatedTip = (billInputValue * ( tipValue / 100 ) / peopleNumberValue)
        tipAmount.textContent = "$" + calculatedTip.toFixed(2);

        let calculatedTotal = (billInputValue / peopleNumberValue) + calculatedTip
        totalAmount.textContent = "$" + calculatedTotal.toFixed(2);
    } else {
        tipAmount.textContent = "$0.00";
        totalAmount.textContent = "$0.00";
    }

    
})





/* Resetting the form */
resetBtn.addEventListener('click', () => {
    form.reset();
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
    resetBtn.disabled = true;
})


/* Validating people's number */
peopleNumber.addEventListener('blur', ({target : {value}}) => {
    if (value && value === "0") peopleNumberFieldset.classList.add('error-state');
    else {
        peopleNumberFieldset.classList.remove('error-state');
    }
})