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

    // Define the file name for the CSV
    $filename = "results.csv";

    // Set the Content-Type and Content-Disposition headers
    header("Content-Type: text/csv");
    header("Content-Disposition: attachment; filename=\"$filename\"");

    // Open a file pointer using the php://output IO stream
    $fp = fopen("php://output", "w");

    // Add the column names as headers to the CSV file
    $columnNames = array_keys($rows[0]);
    fputcsv($fp, $columnNames);

    // Loop through the rows and add them to the CSV file
    foreach ($rows as $row) {
        fputcsv($fp, $row);
    }

    // Close the file pointer
    fclose($fp);
} catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "joacoenriqueconrado1", "pwd" => "Siempregptarqui1", "Database" => "champion_db", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:mirarlol.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);
?>