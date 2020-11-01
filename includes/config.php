<?php
session_start(); // För att starta sessionen

// För att få felmeddelanden
error_reporting(E_ALL);
ini_set("display_errors", 1);

// Automatisk laddning av klasser
function __autoload($class_name)
{
 include "classes/" . $class_name . ".class.php";
}