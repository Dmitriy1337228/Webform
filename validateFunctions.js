export function empty(str) // проверка на пустоту
{
    if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === "")
    {
        return true;
    }
    else
    {
        return false;
    }
}
// показать/убрать календари
export function showCal1 (event) {
    let elem = document.getElementsByName('dataVer2')[0];
    elem.hidden = ! elem.hidden;
}

export function showCal2 (event) {
    let elem = document.getElementsByName('dataVer4')[0];
    elem.hidden = ! elem.hidden;
}

export function showErrorMessage(nameOfElem,message) { // Вывод сообщения об ошибке
    let errors = document.getElementsByClassName('msg');
    for (let i=0; i<errors.length; i++) { // проверка что такая ошибка уже есть
        if (errors.item(i).textContent == message) {
            return
        }
    }
    let mes = document.createElement('p');
    mes.className = 'msg';
    mes.textContent = message;
    let elem = document.getElementsByName(nameOfElem)[0];
    elem.after(mes);
    let Parent = elem.parentElement;
    Parent.className='inpErr';
}
export function deleteErrors (message) { // удалить ошибку по ее содержимому
    let errors = document.getElementsByClassName('msg');
    for (let i = 0; i < errors.length ; i++ ) {
        if (errors.item(i).textContent == message) {
            errors.item(i).parentElement.classList.remove('inpErr');
            errors.item(i).remove();
            return
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
export let isValid = false; // глобальный флаг валидности
export let isValidFIO = false;
export let isValidBirthDate = false;
export let isValidPhoneNumber = false;
export let isValidINN = false;
export let isValidEmail = false;
export let isValidAppointDate = false;

 export async function validateFIO (inputStr) {
    if (inputStr === null ) { // аномальные ситуации 
        isValidFIO = false;
        showErrorMessage('person','Введите ФИО');
        return
    }
    inputStr = inputStr.trim();
    if (inputStr.split(' ').length < 3) {
        isValidFIO = false;
        showErrorMessage('person','Введите полное ФИО');
        return;
    } 
    else {
        deleteErrors('Введите ФИО');
        deleteErrors('Введите полное ФИО');
        isValidFIO = true;
        return
    }
}

export async function validateBirthDate (inputStr) {
    if (inputStr === null ) { // аномальные ситуации 
        isValidBirthDate = false;
        showErrorMessage('dataVer2','Необходимо заполнить одно поле');
        return
    }
    let regex1 = new RegExp("^([0-9]{2})\.([0-9]{2})\.([1-2][0-9]{3})$"); // ручной ввод
    let regex2 = new RegExp("^([1-2][0-9]{3})\-([0-9]{2})\-([0-9]{2})$"); // ввод с календаря
    if (regex1.test(inputStr) === true) {
         // если дата ручная надо проверить корректность дня и месяца
        let rexRes = regex1.exec(inputStr);
        let day = parseInt(rexRes[1],10);
        let month = parseInt(rexRes[2],10);
        if (day > 31 || day < 1 || month > 12 || month < 1) {
            isValidBirthDate= false;
            showErrorMessage('dataVer2','Некорректная дата');
            return
        }
    }
    else if (regex2.test(inputStr) === true) {
        deleteErrors('Необходимо заполнить одно поле'); // при успешном заполнении удаляем ошибки
        deleteErrors('Некорректная дата');
        deleteErrors('Некорректный формат даты');
        isValidBirthDate = true;
        return // если дата с календаря то все ок
    } else {
         // все остальное на выход
        isValidBirthDate = false;
        showErrorMessage('dataVer2','Некорректный формат даты');
        return
    }
    deleteErrors('Необходимо заполнить одно поле'); // при успешном заполнении удаляем ошибки
    deleteErrors('Некорректная дата');
    deleteErrors('Некорректный формат даты');
    isValidBirthDate = true;
    return
}
export class phoneValidator {
    regex = new RegExp("^(8|7)(\\(\\d{3}\\))-(\\d{3})-(\\d{2})-(\\d{2})$",'g');
    constructor(inputStr) {
        this.inputStr = inputStr;
    }
   async check (errMess,pos) {
        if (this.regex.test(this.inputStr) === true) {
            deleteErrors(errMess);
            console.log('true');
            return true
        }
        else {
            showErrorMessage(pos,errMess);
            console.log('false');
            return false
        }      
    }
}

export class phoneValidatorFlag extends phoneValidator{
    async getFlag (errMess,pos)  {
        isValidPhoneNumber = await this.check(errMess,pos);
        console.log(isValidPhoneNumber);
        return this.isValidPhoneNumber;
    }
}



export async function validateINN (inputStr) {
    if (inputStr.length != 12) {
        showErrorMessage('INN','ИНН - 12 значное число');
        isValidINN = false;
        return
    }
    deleteErrors('ИНН - 12 значное число');
    isValidINN = true;
    return
}

export async function validateEmail(inputStr) {
    if (inputStr === null ) { // аномальные ситуации 
        isValidEmail = false;
        showErrorMessage('email','Пустое поле');
        return
    }
    let regex = new RegExp('^([a-z]+[0-9]*@([a-z]+)\.([a-z]{0,3}))$','gi');
    if (regex.test(inputStr) === true) {
        deleteErrors('Пустое поле');
        deleteErrors('Некорректный email');
        isValidEmail = true;
        return
    }
    else {
        showErrorMessage('email','Некорректный email');
        isValidEmail = false;
        return
    }
}

export async function validateAppointDate(inputStr) {
    if (inputStr === null ) { // аномальные ситуации 
        isValidAppointDate = false;
        showErrorMessage('dataVer4','Заполните 1 поле');
        return
    }
    let currentDate = new Date();
    let newDate = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,currentDate.getDate());
    let regex1 = new RegExp("^([0-9]{2})\.([0-9]{2})\.([1-2][0-9]{3})\\s([0-2][0-9]):([0-5][0-9])$");
    let regex2 = new RegExp("^([1-2][0-9]{3})\-([0-9]{2})\-([0-9]{2})T([0-2][0-9]):([0-5][0-9])$");
    if (regex1.test(inputStr) === true) {
        let Day = parseInt(inputStr.match(regex1)[1],10);
        let Month = parseInt(inputStr.match(regex1)[2],10);
        let Year = parseInt(inputStr.match(regex1)[3],10);
        let Hour = parseInt(inputStr.match(regex1)[4],10);
        let Minutes = parseInt(inputStr.match(regex1)[5],10);
        if ((Day < 1 || Day > 31 )  || (Month < 1 || Month > 12) || (Hour <1 || Hour >24) || (Minutes <1 || Minutes >59)) {
            showErrorMessage('dataVer4','Некорректная дата');
            isValidAppointDate = false;
            return
        }
        let dataStr = Month.toString()+" "+Day.toString()+" "+Year.toString();
        let userDate = new Date(dataStr);
        if (!(Date.parse(userDate) < Date.parse(newDate) && Date.parse(userDate) > Date.parse(currentDate) )) {
            showErrorMessage('dataVer4','Запись доступна только в ближайшие 30 дней');
            isValidAppointDate = false;
            return
        }
        if (userDate.getDate() === 5) {
            showErrorMessage('dataVer4','На 5-е запись не доступна');
            isValidAppointDate = false;
            return
        }
    } 
    else if (regex2.test(inputStr) === true) {
        let userDate = new Date(inputStr);
        if (!(Date.parse(userDate) < Date.parse(newDate) && Date.parse(userDate) > Date.parse(currentDate) )) {
            showErrorMessage('dataVer4','Запись доступна только в ближайшие 30 дней');
            isValidAppointDate = false;
            return
        }
        if (userDate.getDate() === 5) {
            showErrorMessage('dataVer4','На 5.07 запись не доступна');
            isValidAppointDate = false;
            return
        }
    } else {
        showErrorMessage('dataVer4','Некорректный формат даты');
        isValidAppointDate = false;
        return
    }
    deleteErrors('Заполните 1 поле');
    deleteErrors('Укажите время записи');
    deleteErrors('Некорректная дата');
    deleteErrors('Запись доступна только в ближайшие 30 дней');
    deleteErrors('На 5.07 запись не доступна');
    deleteErrors('Некорректный формат даты');
    isValidAppointDate = true;
    return

}

export async function getPerson(formData)  { // такие геттеры для каждой нужной строки формы
    let person = formData.get('person');
    if (empty(person)) {
        return null;
    }  
    return person
}

export async function getBirthDate(formData) {
    let birthDate;
    let birthDate1 = formData.get('dataVer1');
    let birthDate2 = formData.get('dataVer2'); // надо считывать обе версии даты и брать ту, которая не пустая
    if (!empty(birthDate1) && (empty(birthDate2))) {
         birthDate = birthDate1;
    } else if (empty(birthDate1) && (!empty(birthDate2))) {
         birthDate = birthDate2;
    } else if ((!empty(birthDate1) && !empty(birthDate2)) || (empty(birthDate1) && empty(birthDate2)) ) {
        return null
    }
    return birthDate
}

export async function getPhoneNumber(formData,number) {
    let phoneNumber = formData.get(number);
    return phoneNumber
}

export async function getINN(formData) {
    let INN = formData.get('INN');
    return INN
}

export async function getEmail(formData) {
    let email = formData.get('email');
    if (empty(email)) {
        return null
    }
    return email
}

export async function getPlace(formData) {
    let place = formData.get('select');
    return place
}

export async function getAppointDate (formData) {
    let appointDate;
    let appointDate1 = formData.get('dataVer3');
    let appointDate2 = formData.get('dataVer4');
    if (!empty(appointDate1) && (empty(appointDate2))) {
        appointDate = appointDate1;
   } else if (empty(appointDate1) && (!empty(appointDate2))) {
        appointDate = appointDate2;
   } else if ((!empty(appointDate1) && !empty(appointDate2)) || (empty(appointDate1) && empty(appointDate2)) ) {
       return null
   }
   return appointDate

}
export function calculateIsValid() {
    if (!isValidFIO || !isValidBirthDate || !isValidPhoneNumber || !isValidINN || !isValidEmail || !isValidAppointDate)	{
        isValid = false;
    } else {
        isValid = true;
    }  
    return isValid
}