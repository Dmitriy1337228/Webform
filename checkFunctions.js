
// функции для ограничения ввода в input поля
function checkPhone(key) {
    return (key >= '0' && key <= '9') ||  key == '(' || key == ')' || key == '-' ||
      key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
  }

function checkFIO(key) {
    let rex = new RegExp('[а-я]|Backspace| |-','gi');
    if (rex.test(key)) {
        return true
        
    }
    else {
        return false
        
    }   
}  

function checkDate(key) {
    return (key >= '0' && key <= '9') || key ==' ' || key =='.' || key ==':' ||key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace'; 
} 




