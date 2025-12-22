export default {
  title: 'Protocol Buffers',
  path: 'grpc',
  definition: 'Protocol Buffers (protobuf) is a language-neutral, platform-neutral binary serialization format. Its smaller and faster than JSON, with compile-time type checking.',
  analogy: 'Like packing for a trip with vacuum-sealed bags - everything is compressed and organized efficiently.',
  keyPoints: [
    '<span class="code-highlight">Binary format</span>: Smaller than JSON',
    '<span class="code-highlight">Schema-defined</span>: .proto files',
    '<span class="code-highlight">Backward compatible</span>: Field numbers',
    '<span class="code-highlight">Code generation</span>: Many languages',
    'Supports: primitives, enums, nested messages'
  ],
  codeExamples: {
    syntax: `// Protobuf v3 syntax
syntax = "proto3";

message <span class="code-highlight">User</span> {
  string id = 1;           // String field
  string name = 2;
  optional string email = 3;  // Optional field
  bool active = 4;          // Boolean
  int32 age = 5;            // Integer
  repeated string tags = 6; // List/array
  Address address = 7;      // Nested message

  enum <span class="code-highlight">Role</span> {
    UNKNOWN = 0;
    USER = 1;
    ADMIN = 2;
  }
  Role role = 8;
}

message <span class="code-highlight">Address</span> {
  string street = 1;
  string city = 2;
  string country = 3;
}`,
    comparison: `# JSON vs Protocol Buffer size
# JSON (87 bytes)
{"id": "123", "name": "Alice", "email": "alice@example.com", "active": true}

# Protocol Buffer (~33 bytes)
# 0x0a 0x07 0x41 0x6c 0x69 0x63 0x65 0x10 0x01

# Protobuf advantages:
# - <span class="code-highlight">3x smaller</span> than JSON
# - <span class="code-highlight">10x faster</span> parsing
# - <span class="code-highlight">Type-safe</span> compilation
# - <span class="code-highlight">No field names</span> in wire format`
  }
};
