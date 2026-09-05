# AI / ML Plan

## Gemini AI

Gemini is used as the conversational intelligence layer.

### Planned pipeline

```text
User symptoms
    |
    v
Input validation
    |
    v
Prompt + safety instructions
    |
    v
Gemini
    |
    v
Structured response
    |
    +--> general guidance
    +--> possible specialty
    +--> safety/disclaimer
```

The AI must not claim to diagnose a disease.

## Doctor recommendation

```text
AI specialty suggestion
        |
        v
Doctor candidates
        |
        +--> specialty match
        +--> availability
        +--> rating
        |
        v
Ranked recommendations
```

## ML

Two planned predictive areas are no-show prediction and crowd prediction.

The repository contains the engineering structure for these models but does not invent a dataset, trained weights or performance numbers. Those must be produced from project-approved data.
