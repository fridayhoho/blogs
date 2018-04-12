<?php
require_once('ServerSocker.php');

$con = Connector::getInstance();
$req = $_GET['cmd'];
$con->sendMsg($req);
$ret = $con->getMsg();
echo $ret;
?>