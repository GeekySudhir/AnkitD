import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
 
);
To handle multiple vCenter servers and skip logging in if already logged in, you can maintain a session state. PowerShell sessions can be stored in variables, and you can check whether a session is already established before attempting to reconnect. Here's an example:

```powershell
# Function to connect to vCenter Server
function Connect-ToVCenter {
    param (
        [string]$Server,
        [string]$User,
        [string]$Password
    )

    # Check if already connected
    if ($global:DefaultVIServers -ne $null) {
        $existingServer = $global:DefaultVIServers | Where-Object { $_.Name -eq $Server }
        if ($existingServer -ne $null) {
            Write-Host "Already connected to $Server"
            return
        }
    }

    # Connect to vCenter Server
    Connect-VIServer -Server $Server -User $User -Password $Password -ErrorAction Stop
    Write-Host "Connected to $Server"
}

# List of vCenter servers
$vCenterServers = @(
    @{
        Server = "vcenter1"
        User = "user1"
        Password = "password1"
    },
    @{
        Server = "vcenter2"
        User = "user2"
        Password = "password2"
    },
    # ... Add more vCenter server details as needed
)

# Loop through each vCenter server
foreach ($vCenter in $vCenterServers) {
    Connect-ToVCenter -Server $vCenter.Server -User $vCenter.User -Password $vCenter.Password

    # Your existing code for VM operations can go here
}

# Disconnect from all vCenter Servers
Disconnect-VIServer -Server $global:DefaultVIServers -Confirm:$false
```

This script defines a function `Connect-ToVCenter` that checks if a connection to the specified vCenter server already exists before attempting to reconnect. The list of vCenter servers is stored in an array, and the script loops through each vCenter server, connecting only if not already connected. Adjust the vCenter server details in the `$vCenterServers` array according to your setup.



    ERROR HANDLING



Certainly! To include timestamps in your PowerShell transcript log, you can use the `Get-Date` cmdlet. Here's an example:

```powershell
$LogPath = "C:\Path\To\Your\LogFile.txt"
Start-Transcript -Path $LogPath

# Function to get timestamp
function Get-Timestamp {
    return Get-Date -Format "yyyy-MM-dd HH:mm:ss"
}

# Log the timestamp and execute a command
Write-Output ("[{0}] Starting PowerShell session" -f (Get-Timestamp))
# Your PowerShell commands go here

Stop-Transcript
```

This example defines a `Get-Timestamp` function to retrieve the current timestamp in the specified format. You can customize the timestamp format by adjusting the argument to the `-Format` parameter in the `Get-Date` cmdlet.

Remember to replace "C:\Path\To\Your\LogFile.txt" with the desired path for your log file.




VLAN SEARCH IN CLUSTER###




To check which VLANs are present in a cluster using PowerCLI, you can iterate through the hosts in the cluster and inspect the network configurations. Here's an example script:

```powershell
# Connect to vCenter Server
Connect-VIServer -Server "your_vcenter_server" -User "your_username" -Password "your_password"

# Cluster details
$clusterName = "YourClusterName"

# Get hosts in the cluster
$cluster = Get-Cluster -Name $clusterName
$clusterHosts = Get-Cluster $cluster | Get-VMHost

# Array to store unique VLAN IDs
$vlanIds = @()

# Loop through each host in the cluster
foreach ($host in $clusterHosts) {
    # Get network configurations for the host
    $networkConfig = Get-VMHostNetwork -VMHost $host

    # Extract VLAN IDs from the network configurations
    $vlanIds += $networkConfig.VlanId
}

# Get unique VLAN IDs
$uniqueVlanIds = $vlanIds | Select-Object -Unique

Write-Host "VLANs present in $clusterName:"
foreach ($vlanId in $uniqueVlanIds) {
    Write-Host "VLAN $vlanId"
}

# Disconnect from vCenter Server
Disconnect-VIServer -Confirm:$false
```

Replace "your_vcenter_server", "your_username", and "your_password" with your vCenter Server details. Adjust "YourClusterName" with the name of your cluster.

This script connects to vCenter, retrieves the hosts in the specified cluster, and then iterates through each host to collect VLAN IDs from their network configurations. It then prints out the unique VLAN IDs present in the cluster.

Make sure you have the necessary permissions to access network information on the hosts and adjust the script based on your specific environment.


    ###Erro handling vlan in vluster




Certainly! Here's an updated script with more advanced exception handling:

```powershell
# Function to connect to vCenter Server
function Connect-ToVCenter {
    param (
        [string]$Server,
        [string]$User,
        [string]$Password
    )

    # Check if already connected
    if ($global:DefaultVIServers -ne $null) {
        $existingServer = $global:DefaultVIServers | Where-Object { $_.Name -eq $Server }
        if ($existingServer -ne $null) {
            Write-Host "Already connected to $Server"
            return
        }
    }

    try {
        # Connect to vCenter Server
        Connect-VIServer -Server $Server -User $User -Password $Password -ErrorAction Stop
        Write-Host "Connected to $Server"
    } catch {
        Write-Host "Error connecting to $Server: $_"
    }
}

# Cluster details
$clusterName = "YourClusterName"

try {
    # Connect to vCenter Server
    Connect-ToVCenter -Server "your_vcenter_server" -User "your_username" -Password "your_password"

    # Get hosts in the cluster
    $cluster = Get-Cluster -Name $clusterName
    $clusterHosts = Get-Cluster $cluster | Get-VMHost

    # Array to store unique VLAN IDs
    $vlanIds = @()

    # Loop through each host in the cluster
    foreach ($host in $clusterHosts) {
        # Get network configurations for the host
        $networkConfig = Get-VMHostNetwork -VMHost $host -ErrorAction Stop

        # Extract VLAN IDs from the network configurations
        $vlanIds += $networkConfig.VlanId
    }

    # Get unique VLAN IDs
    $uniqueVlanIds = $vlanIds | Select-Object -Unique

    Write-Host "VLANs present in $clusterName:"
    foreach ($vlanId in $uniqueVlanIds) {
        Write-Host "VLAN $vlanId"
    }

} catch {
    Write-Host "Error: $_"
} finally {
    # Disconnect from vCenter Server
    Disconnect-VIServer -Server $global:DefaultVIServers -Confirm:$false -ErrorAction SilentlyContinue
}
```
# Hello world
This script includes advanced exception handling using `try`, `catch`, and `finally` blocks. It will catch and display errors during connection, gathering network configurations, and other operations. Adjust the script based on your specific environment and error-handling requirements.



    
