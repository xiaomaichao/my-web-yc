Add-Type -AssemblyName System.Drawing

$sourceRoot = 'F:\肉鸽游戏'
$outputRoot = Join-Path $PSScriptRoot '..\public\assets'

$files = [ordered]@{
    '01_主线闯关\主界面.png' = 'flow-main.jpg'
    '01_主线闯关\任务界面.png' = 'flow-task.jpg'
    '01_主线闯关\战斗场景.png' = 'flow-battle.jpg'
    '01_主线闯关\战斗获得.png' = 'flow-reward.jpg'
    '01_主线闯关\闯关成功.png' = 'flow-success.jpg'
    '04_商城付费\商场.png' = 'flow-shop.jpg'
    '02_角色养成\角色.png' = 'flow-role.jpg'
    '03_营地挑战\营地.png.png' = 'flow-camp.jpg'
    '03_营地挑战\深渊入口.png.png' = 'flow-challenge.jpg'
    '04_商城付费\首充.png' = 'flow-first-charge.jpg'
    '04_商城付费\特权.png' = 'flow-privilege.jpg'
    '04_商城付费\免广.png' = 'flow-no-ads.jpg'
    '05_活动福利\活动.png.png' = 'flow-event.jpg'
    '04_商城付费\角色礼包.png' = 'flow-character-pack.jpg'
    '04_商城付费\基金.png' = 'flow-fund.jpg'
    '05_活动福利\7日赠礼.png.png' = 'flow-seven-day.jpg'
    '05_活动福利\签到.png' = 'flow-sign-in.jpg'
    '05_活动福利\挂机奖励.png' = 'flow-idle-reward.jpg'
}

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
foreach ($entry in $files.GetEnumerator()) {
    $sourcePath = Join-Path $sourceRoot $entry.Key
    $outputPath = Join-Path $outputRoot $entry.Value
    $source = [System.Drawing.Image]::FromFile($sourcePath)
    try {
        $width = 480
        $height = [Math]::Max(1, [int][Math]::Round($source.Height * $width / $source.Width))
        $bitmap = [System.Drawing.Bitmap]::new($width, $height)
        try {
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            try {
                $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $graphics.DrawImage($source, 0, 0, $width, $height)
            }
            finally { $graphics.Dispose() }
            $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
            $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]82)
            $bitmap.Save($outputPath, $encoder, $parameters)
        }
        finally { $bitmap.Dispose() }
    }
    finally { $source.Dispose() }
}

Get-ChildItem -LiteralPath $outputRoot -Filter 'flow-*.jpg' | Sort-Object Name | Select-Object Name, Length
