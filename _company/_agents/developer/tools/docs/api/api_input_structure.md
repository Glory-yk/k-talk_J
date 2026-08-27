# 🔌 API Input Interface Specification

## 1. Overview
This specification defines the structure for sending instructions to the Agent Swarm via API.

## 2. Request Payload Format (JSON)
```json
{
  "request_id": "uuid-v4",
  "timestamp": "ISO8601",
  "instruction": "Detailed instruction for the agent",
  "target_agents": ["agent_id_1", "agent_id_2"],
  "priority": "high | medium | low",
  "context": {
    "reference_files": ["path/to/file.md"],
    "previous_decision_id": "decision-id",
    "additional_params": {}
  },
  "expected_output_format": "markdown | json | code"
}
```

## 3. Field Definitions
- **instruction**: The core command to be executed.
- **target_agents**: List of agent IDs to participate in this task.
- **priority**: Determines the urgency in the global scheduler.
- **context**: Metadata to provide necessary background without bloating the prompt.
