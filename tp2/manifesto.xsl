<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="manifesto">
        <html>
            <head>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <h1 style="text-align:center">Manifesto</h1>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <hr />
            <xsl:apply-templates/>
        <hr />
    </xsl:template>
    
    <xsl:template match="identificador">
        <strong>Identificador: </strong>
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="titulo">
        <strong>Título: </strong>
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="subtitulo">
        <strong>Sub-Título: </strong>
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="dinicio">
        <strong>Data de Início: </strong>
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="dfim">
        <strong>Data de Fim: </strong>
        <xsl:value-of select="."/>
        <br/>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <strong>Supervisor: </strong>
        <a href="{website}">
            <xsl:value-of select="nome"/>
        </a>
        <a> -> </a>
        <a href="mailto:{email}">
            Enviar Correio
        </a>
        <br />
    </xsl:template>
    
    <xsl:template match="equipa">
        <hr />
        <h2>Equipa</h2>
        <ol>
            <xsl:apply-templates/>
        </ol>
        <hr />
    </xsl:template>
    
    <xsl:template match="membro">
        <li>
            <xsl:apply-templates/>
        </li>
    </xsl:template>
    
    <xsl:template match="nome">
        <strong>Nome: </strong>
        <a href="{../website}">
            <xsl:value-of select="."/>
        </a>
        <a> -> </a>
    </xsl:template>
    
    <xsl:template match="email">
        <a href="mailto:{.}">
            Enviar Correio
        </a>
        <br />
    </xsl:template>
    
    <xsl:template match="website"></xsl:template>
    
    <xsl:template match="foto">
        <img src="{@caminho}" alt="{.}" />
        <br />
    </xsl:template>
    
    <xsl:template match="resumo">
        <hr />
        <h2>Resumo</h2>
        <xsl:apply-templates/>
        <hr />
    </xsl:template>
    
    <xsl:template match="para">
        <xsl:apply-templates/>
        <br /><br />
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:value-of select="."/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:value-of select="."/></i>
    </xsl:template>
    
    <xsl:template match="resultados">
        <hr />
        <h2>Resultados</h2>
        <ul>
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    
    <xsl:template match="resultado">
        <li>
            <a href="{@url}">
                <xsl:value-of select="."/>
            </a>
        </li>
    </xsl:template>
    
</xsl:stylesheet>