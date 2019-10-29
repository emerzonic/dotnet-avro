(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"3c0v":function(e,a,t){"use strict";t.r(a);t("f3/d");var l=t("EFgV"),n=t("Wbzz"),r=t("q1tI"),c=t.n(r),o=t("TJpk"),m=t("rCNW"),s=t("w+gZ");a.default=function(){var e=l.data,a=e.allCliVerb.nodes,t=e.site.siteMetadata,r=t.latestRelease,i=t.projectName;return c.a.createElement(c.a.Fragment,null,c.a.createElement(o.Helmet,null,c.a.createElement("title",null,"CLI reference")),c.a.createElement("h1",null,"CLI reference"),c.a.createElement("p",null,"The ",i," CLI is a ",c.a.createElement(s.a,{to:"https://docs.microsoft.com/en-us/dotnet/core/tools"},".NET Core CLI tool")," that automates schema creation, registry operations, and more. To install:"),c.a.createElement(m.a,{language:"shell"},"$ dotnet tool install Chr.Avro.Cli --global\nTool 'chr.avro.cli' (version '"+r+"') was successfully installed."),c.a.createElement("p",null,"Once the CLI is installed, use ",c.a.createElement("code",null,"help")," to see available commands and options:"),c.a.createElement(m.a,{language:"shell"},"$ dotnet avro help\nChr.Avro.Cli "+r+"\nCopyright (C) 2019 C.H. Robinson\n..."),c.a.createElement("p",null,"The same information is also available here:"),c.a.createElement("table",null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Verb"),c.a.createElement("th",null,"Summary"))),c.a.createElement("tbody",null,a.map((function(e){return c.a.createElement("tr",{key:e.id},c.a.createElement("td",null,c.a.createElement(n.a,{to:"/cli/"+e.name},c.a.createElement("code",null,e.name))),c.a.createElement("td",null,e.summary))})))))}},EFgV:function(e){e.exports=JSON.parse('{"data":{"allCliVerb":{"nodes":[{"id":"121609c1-e5cc-51ef-bba7-8661eee81ce1","name":"create","summary":"Create an Avro schema for a .NET type."},{"id":"3ac0cd83-8d6c-508d-9e12-2c6de0833a01","name":"generate","summary":"Generates C# code for a schema from the Schema Registry."},{"id":"23476e87-4e79-5578-9fc6-800f3fba539e","name":"registry-get","summary":"Retrieve a schema from the Schema Registry."},{"id":"f058a551-3688-5b62-bec6-be39f79f8352","name":"registry-test","summary":"Verify that a .NET type is compatible with a schema in the Schema Registry."}]},"site":{"siteMetadata":{"latestRelease":"3.1.0","projectName":"Chr.Avro"}}}}')}}]);
//# sourceMappingURL=component---src-pages-cli-js-0cc24e356f07f4b38ce3.js.map