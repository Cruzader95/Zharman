<?php
  global $storage;

  $inputJSON = file_get_contents('php://input');
  $user = json_decode( $inputJSON );

  if (isset($user->name) && isset($user->name[4]) &&
    isset($user->nickname) && isset($user->nickname[3]) &&
    isset($user->email) && isset($user->email[4]) &&
    isset($user->password) && isset($user->password[5])) {

    $db = json_decode( file_get_contents( $storage.'/users.json' ) );

    $found = false;
    foreach ($db->users as $index => $existentUser) {
      if ($existentUser->name == $user->name || $existentUser->email == $user->email) {
        $found = true;
      }
    }

    if ($found === false) {
      $user->active = true;
      $user->hash = base64_encode($user->password);
      $user->id = $db->settings->nextID;
      $user->created_at = date('c');
      $user->created_by = 999;
      $db->settings->nextID = $db->settings->nextID + 1;
      unset($user->password);

      array_push($db->users, $user);

      file_put_contents($storage.'/users.json', json_encode($db, JSON_PRETTY_PRINT));
      echo json_encode($user);
    } else {
      http_response_code(409);
      array_push($messages, 'Duplicated user email or name.');
    }
  } else {
    http_response_code(406);
    if (!isset($user->name) || !(isset($user->name[4]))) array_push($messages, 'Name is required!');
    if (!isset($user->nickname) || !(isset($user->nickname[3]))) array_push($messages, 'Nickname is required!');
    if (!isset($user->level) || !(isset($user->level[0]))) array_push($messages, 'Level is required!');
    if (!isset($user->email) || !(isset($user->email[4]))) array_push($messages, 'Email is required!');
    if (!isset($user->password) || !(isset($user->password[5]))) array_push($messages, 'Password is required!');
  };
