# UrbanTrace AI — Operator Control Room

## Build
- Replace the starter screen with a 1440 × 900 map-first operator dashboard using the supplied palette and Manrope typography.
- Use the generated aerial city map and camera imagery as the visual foundation.
- Add a floating vehicle/location search, active and offline camera pins, cyan current trajectory, muted historical routes, timestamp markers, map labels, and an open live-camera card.
- Add the expanded live-alert feed with five sample Indian vehicle alerts and clear cyan, amber, and controlled red status treatments.
- Add the open evidence drawer for the selected blacklist alert, including plate evidence, similarity meter, route evidence, reviewer note, and audit-safe actions.
- Make the visible controls interactive: alert filters and selection, camera popup close/reopen, drawer close/reopen, and reviewer action feedback.

## Technical details
- Keep everything on the `/` screen with no global navigation.
- Define all colors, typography, shadows, and motion as semantic design tokens in the shared stylesheet.
- Use generated local image assets rather than external map or stock-image links.
- Add page-specific metadata and verify the 1440 × 900 composition in the live preview.
