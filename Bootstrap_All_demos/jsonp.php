<?php
//header('Content-Type: application/json');
header('Content-Type: application/javascript');

$cb = $_REQUEST['callback'];

$arr = ['name'=>'King', 'age'=>50];
$str = json_encode($arr);

echo $cb.'(' .$str. ')' ;   //f1({"name":"Tom","age":20})  f1(data)