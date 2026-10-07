@echo off
setlocal EnableDelayedExpansion

echo Inverting colors for JPG/PNG/TIF/WEBP/BMP/AVIF files...
echo Creates *_inverted.* copies (originals untouched)
echo Transparency in PNG/AVIF is preserved!
echo.

for /r %%F in (*.jpg *.jpeg *.png *.tif *.tiff *.webp *.bmp *.avif) do (
    set "dir=%%~dpF"
    set "name=%%~nF"
    set "ext=%%~xF"
    
    echo Processing: %%F
    magick "%%F" -channel RGB -negate "!dir!!name!_inverted!ext!"
)

echo.
echo Finished! Look for *_inverted files in each folder.
pause