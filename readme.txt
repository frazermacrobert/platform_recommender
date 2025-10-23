EX Platform Recommender
=======================

What this is
------------
A tiny single-page web app to recommend intranet/EX platforms based on your top three priorities. It applies weighting (×1.4, ×1.2, ×1.1) to your chosen priorities, ranks platforms, shows the top 3, and names a Top Priority Winner.

How to use
----------
1) Upload the folder contents to a GitHub repo (or any static host).
2) Open index.html in your browser.
3) Pick Priority 1, Priority 2, Priority 3 (dropdowns remove chosen items).
4) Click "Get recommendations".
5) Review the Top 3 and the Top Priority Winner.
6) Click "What do these categories mean?" to view category explainers with arrows. 
7) Use "Restart" to reset the form.

Editing scores or categories
----------------------------
Edit data.js:
- Update the CATEGORIES array (names & descriptions).
- Update the PLATFORMS array (scores 0–5 per category).

Tie-break logic
---------------
- Primary ranking is by weighted total across the 3 selected categories.
- If totals tie, we compare the sum across all categories (unweighted).
- If still tied, we fall back to alphabetical order.
- The Top Priority Winner is the platform with the highest score in Priority 1;
  if tied, we use the weighted total as the tie-breaker (then alphabetical).

Design
------
- Beige background with subtle pastel gradients; red accents for buttons.
- Fully client-side, no dependencies.

Made with ❤️ for quick client conversations.
