# Toxicity Detection API

A simple HTTP API for detecting toxic content in text using TensorFlow.js and the toxicity classification model. Built with Deno for fast, secure execution.

## Features

- 🔍 **Real-time toxicity detection** - Analyze text for 7 different toxicity categories
- ⚡ **Fast inference** - Powered by TensorFlow.js with optimized model loading
- 🌐 **HTTP API** - Simple REST endpoint for easy integration
- 🛡️ **Secure** - Built with Deno for enhanced security
- 📊 **Detailed results** - Returns probability scores for each toxicity category
- 🧪 **Tested** - Includes basic model loading tests

## Toxicity Categories

The API analyzes text for the following 7 categories:

- **Identity Attack** - Hate speech targeting specific groups
- **Insult** - Rude or offensive language
- **Obscene** - Profane or vulgar content
- **Severe Toxicity** - Extremely toxic content
- **Sexual Explicit** - Sexually suggestive content
- **Threat** - Violent or threatening language
- **Toxicity** - General toxic content

## Prerequisites

- [Deno](https://deno.land/) (version 1.0 or higher)

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd test-model
   ```

## Usage

### Start the Server

```bash
deno task start
```

Or run directly:
```bash
deno run --allow-net mod.ts
```

The server will start on `http://localhost:8000`

### API Endpoint

**GET** `/`

**Query Parameters:**
- `text` (required): The text to analyze for toxicity

**Example Request:**
```bash
curl "http://localhost:8000?text=hello%20world"
```

**Example Response:**
```json
{
  "text": "hello world",
  "results": [
    {
      "label": "identity_attack",
      "results": [
        {
          "probabilities": {
            "0": 0.9998371601104736,
            "1": 0.00016279754345305264
          },
          "match": false
        }
      ]
    },
    {
      "label": "insult",
      "results": [
        {
          "probabilities": {
            "0": 0.9985218644142151,
            "1": 0.0014781667850911617
          },
          "match": false
        }
      ]
    }
    // ... additional categories
  ]
}
```

### Response Format

Each toxicity category returns:
- `label`: The category name
- `results[0].probabilities.0`: Probability of NOT being toxic (0-1)
- `results[0].probabilities.1`: Probability of BEING toxic (0-1)
- `results[0].match`: Boolean indicating if the text matches the category (based on 0.8 threshold)

## Configuration

### Model Threshold

The toxicity classification threshold is set to 0.8 (80% confidence) in `mod.ts`:

```typescript
model = await toxicity.load(0.8, [
  "identity_attack", "insult", "obscene", "severe_toxicity",
  "sexual_explicit", "threat", "toxicity"
]); // Adjust threshold value as needed
```

### Import Map

Dependencies are managed through Deno's import map in `deno.json`:

```json
{
  "imports": {
    "@tensorflow/tfjs": "https://esm.sh/@tensorflow/tfjs",
    "@tensorflow-models/toxicity": "https://esm.sh/@tensorflow-models/toxicity"
  }
}
```

## Development

### Project Structure

```
test-model/
├── mod.ts          # Main API server
├── mod_test.ts     # Basic model loading tests
├── deno.json       # Deno configuration and import map
├── deno.lock       # Dependency lock file
├── LICENSE         # MIT License
└── README.md       # This file
```

### Available Tasks

```bash
deno task start     # Start the development server
```

### Testing

Run the tests to verify the model loads correctly:

```bash
deno test -A
```

The tests verify that:
- The toxicity model can be loaded successfully
- The model is properly initialized

### Permissions

The server requires network permissions to:
- Download the TensorFlow.js model on first run
- Accept HTTP connections

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Missing `text` parameter
- **500 Internal Server Error**: Model loading or inference errors

## Performance Notes

- The TensorFlow.js model is loaded once and cached in memory
- First request may be slower due to model download
- Subsequent requests are fast and efficient

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests! 