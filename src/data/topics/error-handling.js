export default {
  title: 'Error Handling & Status Codes',
  path: 'rest-mastery',
  definition: 'Proper error handling uses consistent HTTP status codes and structured error payloads. This helps clients understand what went wrong and how to recover, enabling robust error recovery strategies.',
  analogy: 'Error codes are like doctor diagnoses - they tell you exactly what is wrong so you know how to fix it, rather than just saying "something bad happened."',
  keyPoints: [
    '<span class="code-highlight">400 Bad Request</span>: Client sent invalid data',
    '<span class="code-highlight">401 Unauthorized</span>: Missing/invalid authentication',
    '<span class="code-highlight">403 Forbidden</span>: Authenticated but not authorized',
    '<span class="code-highlight">404 Not Found</span>: Resource does not exist',
    '<span class="code-highlight">500 Internal Server Error</span>: Server failed unexpectedly'
  ],
  codeExamples: {
    errorResponse: `{
  "error": {
    "code": "<span class="code-highlight">VALIDATION_ERROR</span>",
    "message": "Email format is invalid",
    "details": {
      "field": "<span class="code-highlight">email</span>",
      "value": "not-an-email",
      "constraint": "must-be-email-format"
    }
  }
}`,
    statusExamples: `<span class="code-highlight">200</span> - Success
<span class="code-highlight">201</span> - Created (POST successful)
<span class="code-highlight">400</span> - Bad Request (your fault)
<span class="code-highlight">401</span> - Unauthorized (not logged in)
<span class="code-highlight">403</span> - Forbidden (no permission)
<span class="code-highlight">404</span> - Not Found (does not exist)
<span class="code-highlight">429</span> - Too Many Requests (rate limited)
<span class="code-highlight">500</span> - Server Error (not your fault)`
  }
};
