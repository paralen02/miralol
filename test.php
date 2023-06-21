<?php
try {
    $conn = new PDO("sqlsrv:server = tcp:mirarlol.database.windows.net,1433; Database = champion_db", "joacoenriqueconrado1", "Siempregptarqui1");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->query("EXEC GetStatistics");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    header('Content-Type: application/json'); // Set the response content type to JSON
    echo json_encode($result); // Encode the result as JSON and echo it
} catch (PDOException $e) {
    die("Error connecting to SQL Server: " . $e->getMessage());
}
?>
