<?php
function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}

try {
    $conn = new PDO("sqlsrv:server = tcp:mirarlol.database.windows.net,1433; Database = champion_db", "joacoenriqueconrado1", "Siempregptarqui1");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->query("EXEC GetStatistics");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    debug_to_console($result); // Log the result to the web console
    
    echo json_encode($result);
} catch (PDOException $e) {
    die("Error connecting to SQL Server: " . $e->getMessage());
}
?>
