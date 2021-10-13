//Variables
const inputBill = document.querySelector('#input-bill'),
inputPeople = document.querySelector('#input-people'),
inputCustom = document.querySelector('.input-tip'),
btnReset = document.querySelector('.btn-reset'),
buttonsTip = document.querySelectorAll('.btn-tip'),
inputs = document.querySelectorAll('input');
let total = 0;

let dataObj = {
    bill: 0,
    tip: 0,
    custom: 0,
    people: 0
};

let resultsObj = {
    totalTip: 0,
    totalPerson: 0
}

const expressions = {
    bill: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/,
    peopleNumber: /^[1-9][0-9]*$/,
    customInput: /^[1-9][0-9]*$/
}

const fields = {
    bill: false,
    tip: false,
    custom: false,
    peopleNumber: false
}

btnReset.disabled = true;
//Functions
const validateField = (e) => {
    switch(e.target.name){
        case 'bill':
            if(expressions.bill.test(e.target.value)){
                document.querySelector('.message__error-bill').classList.add('display-none');
                inputBill.classList.remove('group__input-error');
                dataObj.bill = parseInt(e.target.value);
                fields.bill = true;
                getCalculation();
            }else{
                document.querySelector('.message__error-bill').classList.remove('display-none');
                inputBill.classList.add('group__input-error');
                fields.bill = false;
            }
            break;
        case 'people':
            if(expressions.peopleNumber.test(e.target.value)){
                document.querySelector('.message__error-people').classList.add('display-none');
                inputPeople.classList.remove('group__input-error');
                dataObj.people = parseInt(e.target.value);
                fields.peopleNumber = true;
                getCalculation();
            }else{
                document.querySelector('.message__error-people').classList.remove('display-none');
                inputPeople.classList.add('group__input-error');
                fields.peopleNumber = false;
            }
            break;
        case 'custom':
            if(expressions.customInput.test(e.target.value)){
                document.querySelector('.input-tip').classList.remove('error__input-tip');
                buttonsTip.forEach(button =>{
                    button.classList.remove('btn-tip-link');
                })
                dataObj.custom = parseInt(e.target.value);
                dataObj.tip = 0;
                fields.custom = true;
                fields.tip = false;
                getCalculation();
            }else{
                document.querySelector('.input-tip').classList.add('error__input-tip');
            }
            break;
    }
}

//Functions
const cleanHTML = () => {
    btnReset.disabled = false;
    inputBill.value = '';
    inputBill.disabled = true;
    inputPeople.value = '';
    inputPeople.disabled = true;
    inputCustom.value = '';
    inputCustom.disabled = true;
    buttonsTip.forEach(button =>{
        button.classList.remove('btn-tip-link');
        button.disabled = true;
    });
    /* dataObj = {
        bill: 0,
        tip: 0,
        custom: 0,
        people: 0
    }; */
}
const calculate = (number) => {
    total = (dataObj.bill + number);
    let totalPerson = (total / dataObj.people);
    let totalPercentage = ((number*dataObj.bill) / 100);
    let totalTipPerson = (totalPercentage / dataObj.people);
    resultsObj.totalTip = totalTipPerson;
    resultsObj.totalPerson = totalPerson;
    return resultsObj;
}



const getCalculation = () => {
    if(fields.bill && fields.peopleNumber && (fields.tip || fields.custom)){
        console.log(dataObj);
        if(fields.tip){
            let obj = calculate(dataObj.tip);
            console.log(obj);
            document.querySelector('.person__tip').textContent = obj.totalTip.toFixed(2);
            document.querySelector('.person__total').textContent = obj.totalPerson.toFixed(2);
            setTimeout(() => {
                cleanHTML();
            },1000);
            
            return;
        }
        if(fields.custom){
            let obj = calculate(dataObj.custom);
            console.log(obj);
            document.querySelector('.person__tip').textContent = obj.totalTip.toFixed(2);
            document.querySelector('.person__total').textContent = obj.totalPerson.toFixed(2);
            setTimeout(() => {
                cleanHTML();
            },1000);
            return;
        }
    }else{
        console.log('El objeto esta vacio');
    }  
}

//Validar inputs
inputs.forEach(input => {
    input.addEventListener('keyup', validateField);
    input.addEventListener('change', validateField);
})

//Validate Buttons with Event Delegation
document.addEventListener('click', e => {
    if(e.target.matches('.amount-tip')){
        /* console.log(e.target.textContent); */
        buttonsTip.forEach(button =>{
            button.classList.remove('btn-tip-link');
        });
        e.target.classList.add('btn-tip-link');
        let numberTip = parseInt(e.target.textContent.substring(0, e.target.textContent.length - 1));
        /* console.log(numberTip); */
        document.querySelector('.input-tip').placeholder = 'Custom';
       /*  document.querySelector('.input-tip').value = 0; */
        dataObj.tip = numberTip;
        dataObj.custom = 0;
        fields.tip = true;
        fields.custom = false;
        getCalculation();
    }
    if(e.target.matches('.btn-reset')){
        document.querySelector('.person__tip').textContent = '$0.00';
        document.querySelector('.person__total').textContent = '$0.00';
        btnReset.disabled = true;
        dataObj = {
            bill: 0,
            tip: 0,
            custom: 0,
            people: 0
        };
        let resultsObj = {
            totalTip: 0,
            totalPerson: 0
        }
        location.reload();
        console.log('RESET', dataObj);
        console.log('RESULTS', resultsObj);
    }
});

//Valido que dataObj esté lleno y llamo a función para hacer el cálculo
