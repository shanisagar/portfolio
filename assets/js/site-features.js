/**
 * SITE FEATURE FLAGS (main portfolio).
 *
 * gameLimit: show only the first `count` game cards (the ones with a "Play in browser" link), top to bottom.
 *   first: game ids pinned to the top, in this order (they always count toward `count`).
 *   enabled: false -> every game is shown, in the normal order.
 *   enabled: true  -> only the first `count` games are shown in the Portfolio section (game cards only);
 *                     other portfolio projects are never affected.
 */
window.SITE_FEATURES = {
  gameLimit: { enabled: true, count: 5, first: ["arrowpuzzle"] }
};
