$ErrorActionPreference = 'Stop'
$manifest = Get-Content -Raw (Join-Path $PSScriptRoot '..\manifests\skills.json') | ConvertFrom-Json
$profiles = Get-Content -Raw (Join-Path $PSScriptRoot '..\manifests\profiles.json') | ConvertFrom-Json
$ids = @($manifest.entries | ForEach-Object id)
$duplicates = $ids | Group-Object | Where-Object Count -gt 1
if ($duplicates) { throw "Duplicate manifest IDs: $($duplicates.Name -join ', ')" }
$profileNames = $profiles.PSObject.Properties.Name
foreach ($profileName in $profileNames) {
  foreach ($id in @($profiles.$profileName)) {
    if ($ids -notcontains $id) { throw "Profile '$profileName' references unknown skill '$id'" }
  }
}
foreach ($entry in $manifest.entries) {
  foreach ($field in 'id','profile','kind','source','url','license','agents','install') {
    if ($null -eq $entry.$field -or "$($entry.$field)" -eq '') { throw "Missing '$field' for '$($entry.id)'" }
  }
}
Write-Output "Manifest valid: $($manifest.entries.Count) entries, $($profileNames.Count) profiles."

