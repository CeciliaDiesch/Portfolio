<?php

header("Access-Control-Allow-Origin: https://diesch-dev.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: content-type");

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"):
        exit;
        case("POST"):
            $json = file_get_contents('php://input');
            $params = json_decode($json);
    
            $email = $params->email;
            $name = $params->name;
            $message = $params->message;
    
            $recipient = 'ceciliadiesch@yahoo.com';  
            $subject = "Contact From <$email>";
            $message = "From:" . $name . "<br>" . $message ;
    
            $headers   = array();
            $headers[] = 'MIME-Version: 1.0';
            $headers[] = 'Content-type: text/html; charset=utf-8';

            $headers[] = "From: noreply@diesch-dev.com";

            $success = mail($recipient, $subject, $message, implode("\r\n", $headers));
            echo json_encode(["success" => true]);

            break;
        default:
            header("Allow: POST", true, 405);
            exit;
    } 
