
    
        
            WebFontConfig = {
                google:{
                    families: ['Share Tech Mono']
                }
            };

        (function(){
            let webfontScript = document.createElement('script');
    
            webfontScript.src=(
                'https:' == document.location.protocol ? 'https' : 'http') +
                '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                webfontScript.type = 'text/javascript';
                webfontScript.async = 'true';
                let script = document.getElementsByTagName('script')[0];
             script.parentNode.insertBefore(webfontScript, script);
        })();

  

    


