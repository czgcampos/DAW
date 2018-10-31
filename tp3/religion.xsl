<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title>The Quran</title>
                </head>
                <body>
                    <h1 style="text-align:center">The Quran</h1>
                    <table width="100%">
                        <tr>
                            <td width="20%">
                                <h2>Index</h2>
                                <ul>
                                    <xsl:apply-templates select="//sura" mode="index">
                                        <xsl:sort select="bktlong"/>
                                    </xsl:apply-templates>
                                </ul>
                            </td>
                            <td width="80%" valign="top">
                                <xsl:apply-templates select="//coverpg"/>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="sura" mode="index">
        <li>
            <a href="{generate-id()}.html">
                <xsl:value-of select="bktlong"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="sura">
        <xsl:result-document href="website/{generate-id()}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title><xsl:value-of select="bktlong"/></title>
                </head>
                <body>
                    <h1><xsl:value-of select="bktlong"/></h1>
                    <h2><xsl:value-of select="bktshort"/></h2>
                    <xsl:apply-templates select=".//v"/>
                    <adress>[<a href="index.html">Back to index</a>]</adress>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="v">
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <xsl:template match="title"></xsl:template>
    
    <xsl:template match="title2">
        <h3><xsl:value-of select="."/></h3>
    </xsl:template>
    
    <xsl:template match="subtitle">
        <h4><xsl:value-of select="."/></h4>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="p">
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
</xsl:stylesheet>