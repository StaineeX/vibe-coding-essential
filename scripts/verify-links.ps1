$ErrorActionPreference = 'Stop'
$manifest = Get-Content -Raw (Join-Path $PSScriptRoot '..\manifests\skills.json') | ConvertFrom-Json
$failed = @()
foreach ($entry in $manifest.entries) {
  try {
    $response = Invoke-WebRequest -Uri $entry.url -Method Head -MaximumRedirection 3 -TimeoutSec 20
    if ($response.StatusCode -ge 400) { $failed += "$($entry.id): HTTP $($response.StatusCode)" }
  } catch { $failed += "$($entry.id): $($_.Exception.Message)" }
}
if ($failed.Count) { $failed | ForEach-Object { Write-Error $_ }; exit 1 }
Write-Output "All $($manifest.entries.Count) upstream links responded successfully."

