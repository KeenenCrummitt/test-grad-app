<?php
header("charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("./databaseCredentials.php");

$db = mysqli_connect($host, $databaseUsername, $databasePassword, $database); //Development!! change host to server host


if ($db->connect_error) {
  echo "Database connect failed";
  var_dump($db->connect_error);
  die("Connection failed: " . $conn->connect_error);
}
if ($db->error) {
  echo "Database error";
  var_dump($db->error);
}
if ($db->error_list) {
  echo "Database error list";
  var_dump($db->error_list);
}

$result = $db->query("SELECT * FROM attendees;");

/***************************************************************************/
/***************************** Get Request *********************************/
/***************************************************************************/

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $method = $_GET["method"];

  $sql = null;

  switch ($method) {
      /********************** arrays ***************************/
      //get array of departments
    case 'GET_DEPARTMENTS':
      $sql = "SELECT * FROM departments;";
      break;

      // get array of students
    case 'GET_ATTENDEES':
      $sql = "SELECT * FROM attendees";
      break;

      // get array of graduates
    case 'GET_GRADUATES':
      $sql = "SELECT * FROM graduates";
      break;

      // get array of faculty
    case 'GET_FACULTY':
      $sql = "SELECT * FROM faculty";
      break;

      // get array of faculty
    case 'GET_MANAGERS':
      $sql = "SELECT * FROM managers";
      break;

      /********************** prediction ***************************/

      // get array of faculty
    case 'GET_MATCHING_GRADUATES':
      $enteredName = strtolower(htmlspecialchars($_GET['enteredName']));
      $nameLength = strlen($enteredName);

      $sql = "
      SELECT * 
      FROM graduates
      WHERE 
      LEFT(
        LOWER(
          CONCAT(graduates.firstName, ' ', graduates.lastName)
          ), 
        " . $nameLength . ")
      ='" . $enteredName . "'
      OR
      LEFT(
        LOWER(
          CONCAT(graduates.lastName, ' ', graduates.firstName)
          ), 
        " . $nameLength . ")
      ='" . $enteredName . "'
      ";
      break;

      // get array of faculty
    case 'GET_MATCHING_FACULTY':
      $enteredName = strtolower(htmlspecialchars($_GET['enteredName']));
      $nameLength = strlen($enteredName);

      $sql = "
      SELECT * 
      FROM faculty
      WHERE 
      LEFT(
        LOWER(
          CONCAT(faculty.firstName, ' ', faculty.lastName)
          ), 
        " . $nameLength . ")
      ='" . $enteredName . "'
      OR
      LEFT(
        LOWER(
          CONCAT(faculty.lastName, ' ', faculty.firstName)
          ), 
        " . $nameLength . ")
      ='" . $enteredName . "'
      ";
      break;

    case 'GET_MATCHING_DEPARTMENTS':
      $enteredName = strtolower(htmlspecialchars($_GET['enteredName']));
      $nameLength = strlen($enteredName);

      $sql = "
      SELECT * 
      FROM departments
      WHERE 
      LEFT(
        LOWER(
          departments.department
          ), 
        " . $nameLength . ")
      ='" . $enteredName . "'
      ";
      // echo $sql;
      break;

      /******************** Individual *********************/

      // get single graduate with id
    case 'GET_GRADUATE':
      $id = $_GET["id"];
      $sql = "SELECT * FROM graduates WHERE id='" . $id . "';";
      break;

      // get single faculty with id
    case 'GET_FACULTY_MEMBER':
      $id = $_GET["id"];
      $sql = "SELECT * FROM faculty WHERE id='" . $id . "';";
      break;

      // get single department with id
    case 'GET_DEPARTMENT':
      $id = $_GET["id"];
      $sql = "SELECT * FROM departments WHERE id='" . $id . "';";
      break;

      // get single manager with id
    case 'GET_MANAGER':
      $id = htmlspecialchars($_GET["id"]);
      $sql = "SELECT * FROM managers WHERE email='" . $id . "';";
      break;

    default:
      echo "Invalid request method. Check the request's method parameter.";
      break;
  }
  $result = $db->query($sql);


  $data = array();

  // add data to array
  while ($row = mysqli_fetch_assoc($result)) {
    array_push($data, $row);
  }

  // return data
  echo json_encode($data);
}

/****************************************************************************/
/***************************** Post Request *********************************/
/****************************************************************************/

else if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  $action = $data['action'];

  $sql = null;

  switch ($action) {

      /******************************* Graduates *********************************/

    case "ADD_GRADUATE":
      $firstName = htmlspecialchars($data['firstName']);
      $lastName = htmlspecialchars($data['lastName']);
      $departmentId = htmlspecialchars($data['departmentId']);
      $email = htmlspecialchars($data['email']);
      $platinum = htmlspecialchars($data['platinum']);

      $sql = "INSERT INTO graduates (firstName, lastName, departmentId, email, platinum) VALUES('" . $firstName . "', '" . $lastName . "', '" . $departmentId . "', '" . $email .  "', '" . $platinum . "');";
      break;

    case "REMOVE_GRADUATE":
      $id = htmlspecialchars($data['id']);

      $sql = "DELETE FROM graduates WHERE id='" . $id . "';";
      break;

    case "REMOVE_ALL_GRADUATES":
      //delete from faculty then delete all attending faculty
      $sql = "DELETE FROM graduates;";
      $result = $db->query($sql);
      echo $result;

      $sql = "DELETE FROM attendees WHERE type='student'";
      break;


      /******************************* Faculty *********************************/

    case "ADD_FACULTY":
      $firstName = htmlspecialchars($data['firstName']);
      $lastName = htmlspecialchars($data['lastName']);
      $departmentId = htmlspecialchars($data['departmentId']);
      $email = htmlspecialchars($data['email']);

      $sql = "INSERT INTO faculty (firstName, lastName, departmentId, email) VALUES('" . $firstName . "', '" . $lastName . "', '" . $departmentId . "', '" . $email . "');";
      break;

    case "REMOVE_FACULTY":
      $id = htmlspecialchars($data['id']);

      $sql = "DELETE FROM faculty WHERE id='" . $id . "';";
      break;

    case "REMOVE_ALL_FACULTY":
      //delete from faculty then delete all attending faculty
      $sql = "DELETE FROM faculty;";
      $result = $db->query($sql);
      echo $result;

      $sql = "DELETE FROM attendees WHERE type='faculty'";
      break;



      /******************************* Attendees *********************************/

    case "ADD_ATTENDEE":
      $id = htmlspecialchars($data['id']);
      $type = htmlspecialchars($data['type']);

      $sql = "INSERT INTO attendees (personId, type) VALUES('" . $id . "', '" . $type . "');";
      break;

    case "REMOVE_ATTENDEE":
      $id = htmlspecialchars($data['id']);

      $sql = "DELETE FROM attendees WHERE id='" . $id . "';";
      break;

      /******************************* Managers *********************************/

    case "ADD_MANAGER":
      $email = htmlspecialchars($data['email']);
      $password = htmlspecialchars($data['password']);
      $admin = htmlspecialchars($data['admin']);

      $sql = "INSERT INTO managers (email, password, admin) VALUES('" . $email . "', '" . $password . "', '" . $admin . "');";
      break;

    case "REMOVE_MANAGER":
      $id = htmlspecialchars($data['id']);

      $sql = "DELETE FROM managers WHERE email='" . $id . "';";
      break;

      /******************************* Departments *********************************/

    case "ADD_DEPARTMENT":
      $name = htmlspecialchars($data['name']);

      $sql = "INSERT INTO departments (department) VALUES('" . $name . "');";
      break;

    case "REMOVE_DEPARTMENT":
      $id = htmlspecialchars($data['id']);

      $sql = "DELETE FROM departments WHERE id='" . $id . "';";
      break;


    case "REMOVE_ATTENDEE_BY_PERSON_ID":
      $id = htmlspecialchars($data['id']);
      $type =
        htmlspecialchars($data['type']);

      $sql = "DELETE FROM attendees WHERE type='" . $type . "' AND personId='" . $id . "';";
      break;

    default:
      echo "Invalid request method. Check the request's method parameter.";
      break;
  }

  $result = $db->query($sql);

  echo $result;
}

// close database
$db->close();
