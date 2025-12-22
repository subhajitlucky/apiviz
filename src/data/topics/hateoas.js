export default {
  title: 'HATEOAS',
  path: 'rest-mastery',
  definition: 'HATEOAS (Hypertext As The Engine Of Application State) means responses include hypermedia links to related actions. This allows clients to discover available operations dynamically, making APIs self-documenting and navigable.',
  analogy: 'Like a treasure map that tells you where to go next based on what you just found, rather than needing the complete journey planned in advance.',
  keyPoints: [
    'Responses include <span class="code-highlight">hypermedia links</span>',
    'Clients navigate the API by <span class="code-highlight">following links</span>',
    'Makes APIs <span class="code-highlight">self-documenting</span>',
    'Reduces coupling between client and server versions',
    'Common in media types: HAL, JSON-LD, Collection+JSON'
  ],
  codeExamples: {
    response: `{
  "id": 123,
  "name": "Alice",
  "_links": {
    "<span class="code-highlight">self</span>": { "href": "/users/123" },
    "<span class="code-highlight">posts</span>": { "href": "/users/123/posts" },
    "<span class="code-highlight">update</span>": { "href": "/users/123", "method": "PUT" },
    "<span class="code-highlight">delete</span>": { "href": "/users/123", "method": "DELETE" }
  }
}`
  }
};
