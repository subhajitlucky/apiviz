export default {
  title: 'Authorization Models',
  path: 'security',
  definition: 'Authorization determines what actions a verified user can perform. It answers "What can you do?" and is enforced after authentication succeeds.',
  analogy: 'Like ticket classes at a stadium - authenticated users still need proper authorization (VIP, general admission, etc.) to access different areas.',
  keyPoints: [
    '<span class="code-highlight">RBAC</span>: Role-Based Access Control',
    '<span class="code-highlight">ABAC</span>: Attribute-Based policies',
    '<span class="code-highlight">PBAC</span>: Permission-Based checks',
    '<span class="code-highlight">Always validate on the server</span>',
    'Principle of least privilege: grant minimum needed'
  ],
  codeExamples: {
    rbac: `// Role-Based Access Control
const <span class="code-highlight">permissions</span> = {
  admin: [<span class="code-highlight">'read'</span>, <span class="code-highlight">'write'</span>, <span class="code-highlight">'delete'</span>, 'admin'],
  user: [<span class="code-highlight">'read'</span>, <span class="code-highlight">'write'</span>],
  guest: [<span class="code-highlight">'read'</span>]
};

function <span class="code-highlight">checkPermission</span>(user, action) {
  return permissions[user.role]?.includes(action);
}`,
    middleware: `// Authorization middleware
<span class="code-highlight">authorize</span>(['admin', 'editor'])
async function deletePost(req, res) {
  // Only admins/editors can delete
  await Post.delete(req.params.id);
}`
  }
};
