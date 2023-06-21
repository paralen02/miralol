<?php
// PHP Data Objects(PDO) Sample Code:
try {
    $conn = new PDO("sqlsrv:server = tcp:mirarlol.database.windows.net,1433; Database = champion_db", "joacoenriqueconrado1", "Siempregptarqui1");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Execute the GetStatistics procedure
    $stmt = $conn->query("EXEC GetStatistics");
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Log the result in the console
    echo '<script>console.log(' . json_encode($result) . ');</script>';
} catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "joacoenriqueconrado1", "pwd" => "Siempregptarqui1", "Database" => "champion_db", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:mirarlol.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);
?>
