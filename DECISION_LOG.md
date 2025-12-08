## Decision Log

Mins coercion: When fetching sessions, each mins value from the JSON is coerced to Number(item.mins) in the store at the point of ingress. This keeps all data-shape corrections at the boundary of the system (where you would expect them), allowing the rest of the app to rely on strongly-typed, consistent data.

Debounce implementation: The search input uses a simple debounce utility that wraps the handler with setTimeout and clears the previous timer on each keystroke. This approach achieves the objective of reducing unnecessary computations, prevents race conditions in rapid typing, without introducing unnecessary complexity in the process. It is framework agnostic and provides relatively straightforward type safety.

Stable sort guarantee: Sessions are sorted by popularity while preserving the original order for items with equal popularity. The sort is made stable by pairing each session with its original index. When popularity ties, the comparator falls back to the original index (`a.idx - b.idx`) preserving the initial order.

Accessibility for toggle: The status toggle uses a native checkbox for minimal overhead, and is augmented by accessible label and aria-live announcements. Using a native control ensures best compatibility with screen readers and keyboard interactions, while focus events and state changes are handled automatically in a predictable manner.

Race-condition note: Not applicable in this implementation. All session data is fetched once on mount, and filtering is synchronous in-memory. No real network requests exist, so race conditions cannot occur. This makes implementing the “race-condition safety” stretch goal somewhat of a red herring, for a real API-driven search, I wouldd use `AbortController` or a version-counter strategy to prevent older stale responses from overwriting newer results.
