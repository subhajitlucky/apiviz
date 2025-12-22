export default {
  title: 'Introduction to gRPC',
  path: 'grpc',
  definition: 'gRPC is a high-performance RPC (Remote Procedure Call) framework that uses HTTP/2 for transport and Protocol Buffers for serialization. Its ideal for microservices and mobile APIs.',
  analogy: 'Like ordering at a fast-food counter - you place a specific order and get exactly what you asked for, quickly and efficiently.',
  keyPoints: [
    '<span class="code-highlight">HTTP/2</span>: Multiplexed streams',
    '<span class="code-highlight">Protocol Buffers</span>: Binary, not JSON',
    '<span class="code-highlight">Strong contracts</span>.proto files',
    '<span class="code-highlight">Code generation</span> for many languages',
    'Great for: Internal microservices, mobile apps'
  ],
  codeExamples: {
    proto: `// Define service in .proto file
service <span class="code-highlight">UserService</span> {
  // Unary call - like regular HTTP
  rpc <span class="code-highlight">GetUser</span>(GetUserRequest) returns (User);

  // Server streaming
  rpc <span class="code-highlight">ListUsers</span>(ListUsersRequest) returns (stream User);

  // Client streaming
  rpc <span class="code-highlight">CreateUsers</span>(stream CreateUserRequest) returns (CreateUsersResponse);
}

message <span class="code-highlight">GetUserRequest</span> {
  string user_id = 1;
}

message <span class="code-highlight">User</span> {
  string id = 1;
  string name = 2;
  string email = 3;
}`,
    client: `// Generated client code
const client = new <span class="code-highlight">UserServiceClient</span>(
  'https://api.example.com',
  credentials.createSsl()
);

// Unary call
const <span class="code-highlight">user</span> = await new Promise((resolve, reject) => {
  client.getUser(
    { user_id: '123' },
    (error, response) => {
      if (error) reject(error);
      else resolve(response);
    }
  );
});

console.log(user.name); // Alice`
  }
};
