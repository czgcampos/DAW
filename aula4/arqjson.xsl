<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="text" indent="yes"/>
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="website/json/{generate-id()}.json">
            {
                "id":"<xsl:value-of select="IDENTI"/>",
                "desc":"<xsl:value-of select="DESCRI"/>",
                "lugar":"<xsl:value-of select="LUGAR"/>",
                "freguesia":"<xsl:value-of select="FREGUE"/>",
                "concelho":"<xsl:value-of select="CONCEL"/>",
                "acesso":"<xsl:value-of select="ACESSO"/>",
                "quadro":"<xsl:value-of select="QUADRO"/>",
                "descarq":"<xsl:value-of select="DESARQ"/>"
            }
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>