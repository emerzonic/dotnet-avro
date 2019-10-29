(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{jW8Q:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),r=t.n(n),l=t("TJpk"),o=t("rCNW"),s=t("KwlC"),i=t("w+gZ"),c="Implementation differences";a.default=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.Helmet,null,r.a.createElement("title",null,c)),r.a.createElement("h1",null,c),r.a.createElement("p",null,"Chr.Avro was created as a flexible alternative to Apache’s C# Avro implementation. This document explains the rationale for the creation of an entirely new library and outlines some of the differences between Chr.Avro and other implementations."),r.a.createElement("h2",null,"Schema representation"),r.a.createElement("p",null,"The main architectural difference between Chr.Avro and other implementations is its abstract schema representation. One of the main drawbacks of the Apache implementation is that its schema respresentations are inextricably bound to JSON. The ",r.a.createElement(s.a,{id:"M:Avro.Schema.Parse(System.String)"},r.a.createElement(o.a,{inline:!0,language:"csharp"},"Parse")," method on the ",r.a.createElement(o.a,{inline:!0,language:"csharp"},"Schema")," class")," is the only publicly exposed factory method, which means that it’s impossible to manipulate a schema without manipulating JSON. Chr.Avro keeps its abstract, binary, and JSON components entirely separate."),r.a.createElement("h2",null,"Development activity"),r.a.createElement("p",null,"The Apache implementation is minimally maintained. Small changes are contributed occasionally; the last major changes were ",r.a.createElement(i.a,{to:"https://github.com/apache/avro/commits/master/lang/csharp/src/apache"},"years ago"),". There doesn’t appear to be any appetite for major changes. ",r.a.createElement(i.a,{to:"https://azure.microsoft.com/en-us/blog/microsoft-avro-library/"},"Microsoft.Hadoop.Avro")," (",r.a.createElement(i.a,{to:"https://github.com/dougmsft/microsoft-avro"},"Microsoft.Avro.Core"),"?) was the only other open source Avro implementation for .NET. It’s been abandoned since 2016."),r.a.createElement("h2",null,"Type mapping"),r.a.createElement("p",null,"The Microsoft implementation made it extremely easy to map Avro records to existing .NET classes, something that Chr.Avro has aimed to imitate. The Apache implementation does not map to existing classes. Instead, users are given a choice between two less flexible options:"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("p",null,"Use the ",r.a.createElement(s.a,{id:"T:Avro.Generic.GenericRecord"},r.a.createElement(o.a,{inline:!0,language:"csharp"},"GenericRecord")," class"),", essentially an untyped dictionary. This approach offers no compile-time guarantees.")),r.a.createElement("li",null,r.a.createElement("p",null,"Use the ",r.a.createElement(i.a,{to:"https://github.com/confluentinc/confluent-kafka-dotnet#working-with-apache-avro"},"avrogen")," tool to generate classes that implement ",r.a.createElement(s.a,{id:"T:Avro.Specific.ISpecificRecord"},r.a.createElement(o.a,{inline:!0,language:"csharp"},"ISpecificRecord")),". While the generated classes offer some compile-time safety, the process is cumbersome, and additional work usually has to be done to map the generated classes to actual model classes."))),r.a.createElement("h2",null,"Undefined behaviors"),r.a.createElement("p",null,"The Avro specification leaves certain behaviors undefined, and in some cases Chr.Avro implements them differently than other libraries. None of these differences are correctness issues—all serialized payloads are correct, and all correct payloads can be deserialized."),r.a.createElement("h3",null,"Block sizes"),r.a.createElement("p",null,"Avro encodes arrays and maps as a series of blocks terminated by an empty block. For example, an array of length 20 could be encoded as 4 blocks with lengths 6, 10, 4, and 0. Chr.Avro doesn’t make any effort to break arrays and maps into chunks; instead, it always encodes all non-empty arrays and maps as two blocks (the first full-length, the second zero-length). This is consistent with most other implementations."),r.a.createElement("h3",null,"Invalid boolean values"),r.a.createElement("p",null,"Avro specifies that booleans should be encoded as a single byte: ",r.a.createElement(o.a,{inline:!0,language:"csharp"},"0x00")," (false) or ",r.a.createElement(o.a,{inline:!0,language:"csharp"},"0x01")," (true). If a value greater than ",r.a.createElement(o.a,{inline:!0,language:"csharp"},"0x01")," is encountered, Chr.Avro decodes the value as true."),r.a.createElement("p",null,"The ",r.a.createElement(i.a,{to:"https://github.com/apache/avro/blob/master/lang/java/avro/src/main/java/org/apache/avro/io/BinaryDecoder.java#L133"},"Apache Java implementation")," decodes all non-",r.a.createElement(o.a,{inline:!0,language:"csharp"},"0x01")," values as false. The ",r.a.createElement(i.a,{to:"https://github.com/apache/avro/blob/master/lang/csharp/src/apache/main/IO/BinaryDecoder.cs#L53"},"Apache C# implementation")," throws an exception if a value other than ",r.a.createElement(o.a,{inline:!0,language:"csharp"},"0x00")," or ",r.a.createElement(o.a,{inline:!0,language:"csharp"},"0x01")," is encountered."))}}}]);
//# sourceMappingURL=component---src-pages-internals-implementation-js-83f601d089a3e570cf3f.js.map