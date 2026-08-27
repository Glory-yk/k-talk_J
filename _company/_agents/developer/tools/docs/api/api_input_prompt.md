# 🤖 API Input Prompt Guide (api_input_prompt.md)

**Use this prompt template when sending instructions via API to ensure consistent agent behavior.**

## 📝 Instruction Template
When calling the API, encapsulate your instruction within the following logic:

"You are acting as the [System Orchestrator]. Based on the provided JSON payload, execute the following task:
1. **Analyze** the `instruction` field.
2. **Retrieve** necessary context from `context.reference_files`.
3. **Coordinate** with `target_agents` if multiple agents are specified.
4. **Output** the result strictly in `expected_output_format`."

## 🛠️ Example API Call Scenario
**Scenario**: Requesting 'Koda' to update a web feature.

**Payload**:
```json
{
  "instruction": "Update the pricing section of the landing page to include the new 7-day pass option.",
  "target_agents": ["developer"],
  "priority": "high",
  "context": {
    "reference_files": ["sessions/2026-08-27/developer.md"],
    "additional_params": {"feature_name": "7-day_pass"}
  },
  "expected_output_format": "markdown"
}
```

## ⚠️ Critical Rules for API Users
- **Clarity**: Do not use ambiguous pronouns. Use explicit names for agents and files.
- **Atomicity**: Each API call should aim for a single, well-defined task to prevent context drift.
- **Traceability**: Always include a `request_id` to allow for log correlation.
