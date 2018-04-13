<?php
    $ip = "0.0.0.0";
    $port = 9000;
    $server = stream_socket_server("tcp://$ip:$port", $errno, $errstr);
    $connections = array();
    echo "create ServerSocket".$ip.":".$port."\n";
    while(true) {
        while($conn = @stream_socket_accept($server, 0)) {
            $clientID = hash('sha1', uniqid('', true));
            echo $clientID."connected \n";
            $connections[$clientID] = $conn;
        }

        if($connections) {
            $read = $connections;
            $write = array();
            $except = array();

            if(false === ($num_changed_streams = stream_select($read, $write, $except, 1)) ) {
                echo "error";
            }elseif ($num_changed_streams > 0){
                foreach($read as $stream) {

                        $clientID = array_search($stream, $connections);
                        $input = fgets($stream);
                        if (strlen($input) === 0) {
                            echo "$clientID closed\n";
                            fclose($stream);
                            unset($connections[$clientID]);
                            continue;
                        }
                        echo "{$clientID} just said {$input}";
                        callback($input, $stream);
                    // try{
                    //     fputs($stream, "serverBack:$input");
                    // }catch(Exception $e){
                    //     echo $e;
                    //     stream_socket_shutdown($read, STREAM_SHUT_RDWR);
                    // }

                }
            }
        }
    }
    fclose($server);

function callback($data, $stream){
    // $SocketData=SocketData::getInstance();
    // array_push( $SocketData->$activeSocket,(int)$activeSocket);
    echo "===callback data:".$data;
    $sting = explode("&",$data);
    $cdtp = explode("=",$sting['0']);
    if($sting['0']=='act=login'){
        echo "act=login";
        if($sting['1'] == 'acces_key=9051446702807dec53d521c1e5cf3493'){
            $status='status=1&status_code=0';
            $hdid=explode("=",$sting['3']);
            $pkno=explode("=",$sting['2']);
            // $SocketData->$hdid=$hdid['1'];
            // $SocketData->$pkno=$pkno['1'];
            fputs($stream, $status);
          // return $status;
        }else{
          $status='status=2&status_code=1';
          // return $status;
          fputs($stream, $status);
        }
    }else if($sting['0']=='act=change_info') {
        echo "act=change_info";
        $time=explode("=",$sting['2']);
        $time=bcsub(strtotime($tmie['2']),time());
        // $SocketData->$time=$time;
        $status='success=1';
        // return $status;
        fputs($stream, $status);
    }else if($cdtp['0'] == 'cdtp'){
        echo "cdtp";
        $cost=explode("=",isset($sting['2']));
        $intim=explode("=",isset($sting['3']));
        if($cost['0']=='cost' && $intim['0']=='intim'){
         //socket_write($SocketData->$cloudSocket, $data);
        // echo '打印'.$data;
        //curl
        }
    }
}




// 对于websocket发送到socket服务器的数据都是被编码过的，所以我们需要对数据进行解码
function decode($requestData)
{
    $len = $masks = $data = $decoded = null;
    $len = ord($requestData[1]) & 127;

    if ($len === 126) {
        $masks = substr($requestData, 4, 4);
        $data = substr($requestData, 8);
    } elseif ($len === 127) {
        $masks = substr($requestData, 10, 4);
        $data = substr($requestData, 14);
    } else {
        $masks = substr($requestData, 2, 4);
        $data = substr($requestData, 6);
    }
    for ($index = 0; $index < strlen($data); $index++) {
        $decoded .= $data[$index] ^ $masks[$index % 4];
    }
    return $decoded;
}

// 同样，socket要发送到客户端的数据也是要进行编码的，所以我们需要对数据进行编码
function encode($s)
{
    $a = str_split($s, 125);
    $ns = "";
    foreach ($a as $o) {
        $ns .= "\x81" . chr(strlen($o)) . $o;
    }
    return $ns;
}
?>