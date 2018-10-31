<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">

    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Arquivo Musical Digital</title>
            </head>
            <body>
                <h1>Arquivo Digital de Música</h1>
                <table width="100%">
                    <tr>
                        <td width="20%" valign="top">
                            <h2><a name="indice"></a>Índice</h2>
                            <ol>
                                <xsl:apply-templates select="//obra" mode="indice">
                                    <xsl:sort select="titulo"/>
                                </xsl:apply-templates>
                            </ol>
                        </td>
                        <td width="80%">
                            <xsl:apply-templates/>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="obra" mode="indice">
        <li>
            <a href="#{count(preceding-sibling::*)+1}">
                <xsl:value-of select="titulo"/>
            </a>
        </li>
    </xsl:template>

    <xsl:template match="obra">
        <hr />
        <div>
            <a name="{count(preceding-sibling::*)+1}"/>
            <h3>
                <xsl:value-of select="titulo"/>
                (<xsl:value-of select="@id"/>)
            </h3>
            <h4>
                <xsl:value-of select="tipo"/>
            </h4>
            <xsl:if test="compositor">
                <h4>
                    <xsl:value-of select="compositor"/>
                </h4>
            </xsl:if>
            <table border="1">
                <tr>
                    <th>Instrumento</th>
                    <th>Voz</th>
                    <th>Clave</th>
                    <th>Afinação</th>
                </tr>
                <xsl:apply-templates select=".//instrumento">
                    <xsl:sort select="designacao"/>
                </xsl:apply-templates>
            </table>
            <h6>[<a href="#indice">Voltar ao inicio</a>]</h6>
        </div>
    </xsl:template>

    <xsl:template match="instrumento">
        <tr>
            <td>
                <xsl:value-of select="designacao"/>
            </td>
            <td>
                <xsl:value-of select="partitura/@voz"/>
            </td>
            <td>
                <xsl:value-of select="partitura/@clave"/>
            </td>
            <td>
                <xsl:value-of select="partitura/@afinacao"/>
            </td>
        </tr>
    </xsl:template>
    
</xsl:stylesheet>