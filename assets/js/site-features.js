/**
 * SITE FEATURE FLAGS (main portfolio).
 *
 * gameLimit: show only the first `count` game cards (the ones with a "Play in browser" link), top to bottom.
 *   enabled: false -> every game is shown.
 *   enabled: true  -> only the first `count` games are shown in the Portfolio section (game cards only);
 *                     other portfolio projects are never affected.
 */
window.SITE_FEATURES = {
  gameLimit: { enabled: false, count: 10 }
};
