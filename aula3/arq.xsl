<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title>Arqueossitios</title>
                </head>
                <body>
                    <h1>Arqueossitios do NW português</h1>
                    <h2>Índice</h2>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="website/{generate-id()}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <h1><xsl:value-of select="IDENTI"/></h1>
                    <h2><xsl:value-of select="DESCRI"/></h2>
                    <dl>
                        <dt>Lugar:</dt>
                        <dd><xsl:value-of select="LUGAR"/></dd>
                        <dt>Freguesia:</dt>
                        <dd><xsl:value-of select="FREGUE"/></dd>
                        <dt>Concelho:</dt>
                        <dd><xsl:value-of select="CONCEL"/></dd>
                    </dl>
                    <p>
                        <xsl:value-of select="ACESSO"/>
                    </p>
                    <p>
                        <xsl:value-of select="QUADRO"/>
                    </p>
                    <p>
                        <xsl:value-of select="DESARQ"/>
                    </p>
                    <adress>[<a href="index.html">Voltar ao inicio</a>]</adress>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>