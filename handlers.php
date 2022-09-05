<?php
function getRightDate ($data1,$data2) { // выбор непустой даты
    if (!empty($data1) && empty($data2)) {
        return $data1;
    }
    else {
        return $data2;
    }
}

function formatDate($data) { // преобразование даты к формату дд.мм.гггг хх:хх
    if (preg_match('/^([1-2][0-9]{3})\-([0-9]{2})\-([0-9]{2})T([0-2][0-9]):([0-5][0-9])$/',$data)) { /*преобразование к 1 виду даты*/
        $data=str_replace('-','.',$data);
        $data=str_replace('T',' ',$data);
        $helpstr=substr_replace($data,'',10);
        $data=explode('.',$helpstr)[2].'.'.explode('.',$helpstr)[1].'.'.explode('.',$helpstr)[0].' '.explode(' ',$data)[1];
        return $data;
    }
    else {
        return $data;
    }
}
?>