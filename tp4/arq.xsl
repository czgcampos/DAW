<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h2>Arquiositios do NW português</h2>
                    <hr/>
                    <ol>
                        <xsl:apply-templates select="//CONCEL[not(.=preceding::CONCEL)]">
                            <xsl:sort select="."/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates mode="arquelems"/>
    </xsl:template>
    
    <!--Templates para as paginas indiviudais-->
    
    <xsl:template match="ARQELEM" mode="arquelems">
        <xsl:result-document href="website/html/{generate-id()}.html">
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
                    <adress>[<a href=" http://localhost:4005/index">Voltar ao inicio</a>]</adress>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <!--Templates para o index.html-->
    
    <xsl:template match="CONCEL">
        <xsl:variable name="c" select="."/>
        <li>
            <xsl:value-of select="."/>
            <ol>
                <xsl:for-each select="//ARQELEM[$c=CONCEL]">
                    <xsl:sort select="IDENTI"/>
                    <li>
                        <a href=" http://localhost:4005/arq?id={generate-id()}">
                            <xsl:value-of select="IDENTI"/>
                        </a>
                    </li>
                </xsl:for-each>
            </ol>
        </li>
    </xsl:template>
    
</xsl:stylesheet>