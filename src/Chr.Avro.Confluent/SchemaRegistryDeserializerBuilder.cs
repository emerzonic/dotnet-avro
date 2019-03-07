using Chr.Avro.Representation;
using Confluent.Kafka;
using Confluent.SchemaRegistry;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Chr.Avro.Confluent
{
    /// <summary>
    /// Builds <see cref="T:IDeserializer{T}" />s that are locked into specific schemas from a
    /// Schema Registry.
    /// </summary>
    public class SchemaRegistryDeserializerBuilder : IDisposable
    {
        private readonly Serialization.IBinaryDeserializerBuilder _builder;

        private readonly bool _disposeRegistryClient;

        private readonly IJsonSchemaReader _reader;

        /// <summary>
        /// The client to use for Schema Registry operations.
        /// </summary>
        protected readonly ISchemaRegistryClient RegistryClient;

        /// <summary>
        /// Creates a deserializer builder.
        /// </summary>
        /// <param name="registryConfiguration">
        /// Schema Registry configuration. Using the <see cref="SchemaRegistryConfig" /> class is
        /// highly recommended.
        /// </param>
        /// <param name="builder">
        /// A deserializer builder (used to build deserialization functions for C# types). If none
        /// is provided, the default deserializer builder will be used.
        /// </param>
        /// <param name="reader">
        /// A JSON schema reader (used to convert schemas received from the registry into abstract
        /// representations). If none is provided, the default schema reader will be used.
        /// </param>
        public SchemaRegistryDeserializerBuilder(
            IEnumerable<KeyValuePair<string, string>> registryConfiguration,
            Serialization.IBinaryDeserializerBuilder builder = null,
            IJsonSchemaReader reader = null
        ) : this(new CachedSchemaRegistryClient(registryConfiguration), builder, reader)
        {
            _disposeRegistryClient = true;
        }

        /// <summary>
        /// Creates a deserializer builder.
        /// </summary>
        /// <param name="registryClient">
        /// A client to use for Schema Registry operations. (The client will not be disposed.)
        /// </param>
        /// <param name="builder">
        /// A deserializer builder (used to build deserialization functions for C# types). If none
        /// is provided, the default deserializer builder will be used.
        /// </param>
        /// <param name="reader">
        /// A JSON schema reader (used to convert schemas received from the registry into abstract
        /// representations). If none is provided, the default schema reader will be used.
        /// </param>
        /// <exception cref="ArgumentNullException">
        /// Thrown when the registry client is null.
        /// </exception>
        public SchemaRegistryDeserializerBuilder(
            ISchemaRegistryClient registryClient,
            Serialization.IBinaryDeserializerBuilder builder = null,
            IJsonSchemaReader reader = null
        ) {
            RegistryClient = registryClient ?? throw new ArgumentNullException(nameof(registryClient));

            _builder = builder ?? new Serialization.BinaryDeserializerBuilder();
            _disposeRegistryClient = false;
            _reader = reader ?? new JsonSchemaReader();
        }

        /// <summary>
        /// Builds a deserializer for a specific schema.
        /// </summary>
        /// <param name="id">
        /// The ID of the schema that should be used to deserialize data.
        /// </param>
        /// <exception cref="UnsupportedTypeException">
        /// Thrown when the type is incompatible with the retrieved schema.
        /// </exception>
        public async Task<IDeserializer<T>> BuildDeserializer<T>(int id)
        {
            return BuildDeserializer<T>(id, await RegistryClient.GetSchemaAsync(id));
        }

        /// <summary>
        /// Builds a deserializer for a specific schema.
        /// </summary>
        /// <param name="subject">
        /// The subject of the schema that should be used to deserialize data. The latest version
        /// of the subject will be resolved.
        /// </param>
        /// <exception cref="UnsupportedTypeException">
        /// Thrown when the type is incompatible with the retrieved schema.
        /// </exception>
        public async Task<IDeserializer<T>> BuildDeserializer<T>(string subject)
        {
            var schema = await RegistryClient.GetLatestSchemaAsync(subject);

            return BuildDeserializer<T>(schema.Id, schema.SchemaString);
        }

        /// <summary>
        /// Builds a deserializer for a specific schema.
        /// </summary>
        /// <param name="subject">
        /// The subject of the schema that should be used to deserialize data.
        /// </param>
        /// <param name="version">
        /// The version of the subject to be resolved.
        /// </param>
        /// <exception cref="UnsupportedTypeException">
        /// Thrown when the type is incompatible with the retrieved schema.
        /// </exception>
        public async Task<IDeserializer<T>> BuildDeserializer<T>(string subject, int version)
        {
            var schema = await RegistryClient.GetSchemaAsync(subject, version);
            var id = await RegistryClient.GetSchemaIdAsync(subject, schema);

            return BuildDeserializer<T>(id, schema);
        }

        /// <summary>
        /// Disposes the builder, freeing up any resources.
        /// </summary>
        public void Dispose()
        {
            if (_disposeRegistryClient)
            {
                RegistryClient?.Dispose();
            }
        }

        private IDeserializer<T> BuildDeserializer<T>(int id, string schema)
        {
            var deserialize = _builder.BuildDelegate<T>(_reader.Read(schema));

            return new DelegateDeserializer<T>(stream =>
            {
                var bytes = new byte[4];

                if (stream.ReadByte() != 0x00 || stream.Read(bytes, 0, bytes.Length) != bytes.Length)
                {
                    throw new InvalidDataException("Data does not conform to the Confluent wire format.");
                }

                if (BitConverter.IsLittleEndian)
                {
                    Array.Reverse(bytes);
                }

                var received = BitConverter.ToInt32(bytes, 0);

                if (received != id)
                {
                    throw new InvalidDataException($"The received schema ({received}) does not match the specified schema ({id}).");
                }

                return deserialize(stream);
            });
        }
    }
}