<?xml version="1.0"?>
<p:declare-step 
	version="1.0" 
	xmlns:p="http://www.w3.org/ns/xproc" 
	xmlns:fn="http://www.w3.org/2005/xpath-functions" 
	xmlns:c="http://www.w3.org/ns/xproc-step" 
	xmlns:drone="http://corbicula.huni.net.au/about/drone" 
	xmlns:oai="http://www.openarchives.org/OAI/2.0/"
>
	<p:import href="corbicula.xpl"/>
	
	<drone:list-all-records
		name="harvest"
		cache-location="/var/corbicula/daao/"/>
		
		<!--
	<drone:list-new-records 
		name="harvest" 
		base-uri="http://oai.daao.org.au/oai/provider" 
		cache-location="/var/corbicula/daao/" 
		metadata-prefix="eac-cpf"/>
		-->
	<!--
	-->
	<!-- TODO replace these steps with steps to crosswalk updates to RDF, and to store 
	and delete records from tripe-store -->
	<!--
	<p:for-each name="deletion">
		<p:iteration-source>
			<p:pipe step="harvest" port="deletions"/>
		</p:iteration-source>
		<p:store>
			<p:with-option name="href" select="concat('/data/xml/daao/deletions/', fn:encode-for-uri(fn:encode-for-uri(/*/@xml:base)))"/>
		</p:store>
	</p:for-each>
	<p:for-each name="update">
		<p:iteration-source>
			<p:pipe step="harvest" port="updates"/>
		</p:iteration-source>
		<p:store>
			<p:with-option name="href" select="concat('/data/xml/daao/updates/', fn:encode-for-uri(fn:encode-for-uri(/*/@xml:base)))"/>
		</p:store>
	</p:for-each>		
	-->
	
	<p:for-each name="transform-record-to-rdf">
		<p:iteration-source>
			<p:pipe step="harvest" port="updates"/>
		</p:iteration-source>
		<p:variable name="xml-base" select="/*/@xml:base"/>
		<drone:xml-to-rdf name="rdf" xslt="eac-cpf-to-rdf.xsl" resource-base-uri="http://corbicula.huni.net.au/data/daao/"/>


		<!--
		<p:store indent="true">
			<p:with-option name="href" select="concat('/data/xml/daao/graphs/', fn:encode-for-uri(fn:encode-for-uri($xml-base)), '.xml')"/>
		</p:store>
		-->
		<drone:store-graph name="put-graph-in-sparql-graph-store">
			<p:with-option name="graph-uri" select="$xml-base"/>
		</drone:store-graph>
	</p:for-each>	
	
</p:declare-step>
