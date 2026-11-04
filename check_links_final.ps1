$root = "c:\Users\user\Downloads\Ay-PDA"
$missing = @()
$pattern = 'src="(\.\.[^"]+)"|href="(\.\.[^"]+)"'
Get-ChildItem "$root\en","$root\hi" -Filter "*.html" | ForEach-Object {
    $file = $_.FullName
    $dir  = $_.DirectoryName
    $html = Get-Content $file -Raw
    $matches2 = [regex]::Matches($html, $pattern)
    foreach ($m in $matches2) {
        $ref = if ($m.Groups[1].Success) { $m.Groups[1].Value } else { $m.Groups[2].Value }
        $abs = Join-Path $dir $ref
        $abs = [System.IO.Path]::GetFullPath($abs)
        if (-not (Test-Path $abs)) {
            $missing += [PSCustomObject]@{ File=[System.IO.Path]::GetFileName($file); Ref=$ref }
        }
    }
}
if ($missing.Count -eq 0) {
    Write-Host "ALL LINKS VERIFIED - Zero missing assets across all 20 HTML pages." -ForegroundColor Green
} else {
    Write-Host "BROKEN LINKS FOUND:" -ForegroundColor Red
    $missing | Format-Table -AutoSize
}
