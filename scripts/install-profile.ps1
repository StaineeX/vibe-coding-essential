[CmdletBinding(SupportsShouldProcess)]
param(
  [Parameter(Mandatory=$true)] [ValidateSet('core','quality','context','integrations','engineering','frontend','browser','media','discovery','security','experimental')] [string]$Profile
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$manifest = Get-Content -Raw (Join-Path $root 'manifests\skills.json') | ConvertFrom-Json
$profiles = Get-Content -Raw (Join-Path $root 'manifests\profiles.json') | ConvertFrom-Json
$wanted = @($profiles.$Profile)
foreach ($id in $wanted) {
  $entry = @($manifest.entries | Where-Object id -eq $id)[0]
  if ($null -eq $entry) { throw "Unknown skill '$id'" }
  Write-Output "[$Profile] $($entry.id) :: $($entry.install)"
  if ($PSCmdlet.ShouldProcess($entry.source, "Install $($entry.id) for Claude Code and Codex")) {
    Write-Warning "Review and run manually: $($entry.install)"
  }
}
Write-Output "Profile '$Profile' reviewed. Remote installers remain explicit by design."

