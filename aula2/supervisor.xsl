<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <p>
            <a href="{website}">
                <xsl:value-of select="nome"/>
            </a>
        </p>
        <p>
            <a href="mailto:{email}">
                Enviar Correio
            </a>
        </p>
    </xsl:template>
    
</xsl:stylesheet>