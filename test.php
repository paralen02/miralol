<?php
// PHP Data Objects(PDO) Sample Code:
try {
    $conn = new PDO("sqlsrv:server = tcp:mirarlol.database.windows.net,1433; Database = champion_db", "joacoenriqueconrado1", "Siempregptarqui1");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Execute the DataStatistics procedure
    $stmt = $conn->query("EXEC DataStatistics");

    // Fetch all rows from the result set
    $rows = [];
    while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $result;
    }

    // Send JSON response
    header('Content-Type: application/json');
    echo json_encode($rows);
} catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "joacoenriqueconrado1", "pwd" => "Siempregptarqui1", "Database" => "champion_db", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:mirarlol.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);
?>
