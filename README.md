# WebEx Frontend side

## How to create a sprite sheet?

1. Open [sprite site](http://responsive-css.spritegen.com/)
    * Click "Choose Files" and upload all files
    * Output Type: "PNG-Recommended"
    * CSS Class Prefix: "sprite-flags-"
    * Padding between images: "0px"
    * Click "Create Sprite"
2. After redirection save sprite with name "sprite-flags" and move it file to "src\images"
3. In site find section "Your CSS" copy all rules after "{ max-width: 100%; background-size: 100%; background-image: url('png.png'); }" 
and into "src\styles\flags\sprite-flags.scss" replace with a line 7.
