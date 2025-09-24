# AI Context Engineering Structure

This directory contains AI context engineering files for the Sanovias website project. These files help maintain consistent AI interactions by preserving important context, prompts, and conversation history.

## Directory Structure

```
.ai/
├── contexts/            # Reusable context files for AI interactions
│   ├── brand-voice.md   # Brand voice guidelines
│   ├── styling.md       # Design system notes
│   └── seo.md           # SEO guidelines
├── prompts/             # Effective prompts that have worked well
│   ├── layout-prompts.md
│   └── content-prompts.md
└── history/             # Important conversation history
    ├── rebrand-implementation.md
    ├── design-system-implementation.md
    └── seo-implementation.md
```

## Usage Guidelines

### When to Reference These Files

- **Starting New Features**: Reference relevant context files to ensure consistency
- **Making Design Decisions**: Check the styling guidelines and design system history
- **Content Creation**: Use the brand voice guidelines and content prompts
- **Problem Solving**: Review history files to understand previous decisions

### How to Use with AI

1. **Include Context**: When working with AI tools, include relevant sections from context files
2. **Reference History**: Point to specific history files when discussing related features
3. **Use Proven Prompts**: Adapt the prompt templates to your specific needs
4. **Maintain and Update**: Add new context, prompts, or history as the project evolves

### Example Workflow

When asking AI to help with a new feature:

```
I'm working on [FEATURE]. Please reference our:
- Brand voice guidelines (.ai/contexts/brand-voice.md)
- Design system (.ai/contexts/styling.md)
- Related history (.ai/history/design-system-implementation.md)

[YOUR SPECIFIC REQUEST]
```

## Maintenance

These files should be maintained and updated as the project evolves:

- Add new context files when establishing new guidelines
- Update existing files when guidelines change
- Document important decisions in history files
- Add successful prompts to the prompts directory