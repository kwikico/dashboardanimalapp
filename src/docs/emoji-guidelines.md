# Emoji UI Guidelines

This document provides guidelines for using emojis throughout the Dog Breeder application to enhance visual communication and user experience.

## Purpose of Emojis in Our UI

Emojis in our application serve to:
1. Enhance visual communication and user engagement
2. Create intuitive navigation cues
3. Add personality while maintaining professionalism
4. Support accessibility by providing visual cues alongside text

## Implementation Guidelines

### Navigation & Headers

- Each main section has a dedicated emoji in the sidebar navigation
- Page headers include relevant emojis to reinforce the section context
- Consistent emoji usage helps users quickly identify sections

### Data Visualization

- Dog gender is indicated with ♂️ (male) and ♀️ (female) symbols
- Health status uses color-coded heart emojis (💚, 💙, 💛, ❤️)
- Achievement types are distinguished with different medal/trophy emojis (🏆, 🥇, 🏅)

### Status Indicators

- ✅ Completed
- ⏳ In Progress
- 📅 Scheduled
- ❌ Cancelled/Failed

### Action Buttons

- Add actions use ➕
- Edit actions use ✏️
- Delete actions use 🗑️
- Save actions use 💾

## Emoji Component Usage

We've created a reusable `Emoji` component and constants to ensure consistent emoji usage:

```tsx
import { Emoji, EMOJIS } from '@/components/ui/Emoji';

// Using the component
<Emoji symbol={EMOJIS.DOG} label="Dog" />

// Using emoji constants directly
<span>{EMOJIS.TROPHY} Achievements</span>
```

## Accessibility Considerations

- All emojis should have appropriate ARIA labels when used as standalone UI elements
- Emojis should complement text, not replace it for critical information
- Consider users with screen readers by using the `Emoji` component which includes proper accessibility attributes

## Emoji Selection Guidelines

When selecting emojis for new features:

1. Check the `EMOJIS` constant for existing options first
2. Choose emojis that clearly represent the content or action
3. Ensure cross-platform compatibility of selected emojis
4. Limit to 1-2 emojis per element to prevent visual clutter
5. Consider cultural context and avoid potentially confusing emojis

## Adding New Emojis

When adding new emojis to the application:

1. Add the emoji to the `EMOJIS` constant in `src/components/ui/Emoji.tsx`
2. Include a descriptive constant name in UPPERCASE
3. Group with similar emojis (animals, actions, status, etc.)
4. Document the new emoji in this guide if it represents a new category 