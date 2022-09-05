import * as lib from './validateFunctions.js';

window.onload=function() {
    document.getElementById('secondTable').style.width=document.getElementById('firstTable').offsetWidth+"px"; // делаем формы одной ширины
    document.getElementsByName('dataVer2')[0].hidden = 'true';
    document.getElementById('cal1').addEventListener('change',lib.showCal1); // показать/убрать 1 календарь

    document.getElementsByName('dataVer4')[0].hidden = 'true';
    document.getElementById('cal2').addEventListener('change',lib.showCal2);// показать/убрать 2 календарь
    
    regForm.onsubmit = async function (e) {
        let formData = new FormData(regForm);
    
        let person = await lib.getPerson(formData); // считываем поля формы
        let birthDate = await lib.getBirthDate(formData);
        let phoneNumber = await lib.getPhoneNumber(formData,'phoneNumber');
        let INN = await lib.getINN(formData);
        let email = await lib.getEmail(formData);
        let appointDate = await lib.getAppointDate(formData);
        let validator = new lib.phoneValidatorFlag(phoneNumber);
        Promise.all([lib.validateFIO(person),lib.validateBirthDate(birthDate),validator.getFlag('Некорректный формат телефона','phoneNumber'),lib.validateINN(INN),lib.validateEmail(email),lib.validateAppointDate(appointDate)])
        .then(  () => { // дожидаемся валлидацию всех полей 
            if (!lib.calculateIsValid()) {	 // если хотя бы 1 не прошло проверку - не отправляем форму
                e.preventDefault();
                console.log('e.preventDefault()');
            }
            else {
                fetch('checkPost.php',{ // при успешном заполнении отправляем
                    method: 'POST',
                    body: formData 
                }).then( (response) => {
                    response.text().then(function(text){alert(text)}) 
                })
                }  
        }).catch( (err) => {
            e.preventDefault();
            alert('Ошибка при отправке формы');
        })     
    }
    findForm.onsubmit = async function (e) {  
        let findFormData = new FormData(findForm);
        let findPhone = await lib.getPhoneNumber(findFormData,'phoneNumberFind'); // считываем телефон
        let validator = new lib.phoneValidator(findPhone);
        let res = await validator.check('Некорректный формат телефона для поиска','phoneNumberFind');
        if (!res) { // если некорректный - не отправляем
            e.preventDefault();
        }
    }
}

