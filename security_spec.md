# Security Specification — Yi Lai Plastics CMS & Storefront

## 1. Data Invariants
- Every document in `/products/{productId}` and `/blogPosts/{postId}` must have a valid `authorUid` matching `request.auth.uid`, validated on create and immutable on update.
- `createdAt` and `updatedAt` timestamps must strictly equal `request.time` (server timestamps). `createdAt` is immutable on update.
- Document IDs (`productId`, `postId`, `configId`, `adminUid`) must match `^[a-zA-Z0-9_-]+$` and stay within 128 characters.
- Public storefront `list` queries never return `archived` products or `draft` blog posts unless executed by a verified admin.
- Only verified primary admin (`vvx71336@gmail.com` with `email_verified == true`) or explicitly registered admins in `/admins/{uid}` may create, edit, or delete products, blog posts, or `/siteConfig`.
- Default-deny catch-all (`match /{document=**} { allow read, write: if false; }`) blocks every undeclared path.

## 2. Adversarial "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)
1. **Unauthenticated Product Create**: Anonymous client attempts `setDoc(/products/yl-hack, {...})`.
2. **Non-Admin Signed-In Create**: Verified third-party user (`other@gmail.com`) attempts to create a product or blog post.
3. **Unverified Admin Email Spoof**: Token with `email: 'vvx71336@gmail.com'` and `email_verified: false` attempts to write to `/products` or `/blogPosts`.
4. **Shadow Ghost Field Injection**: Admin sends `{ ...validProduct, isFeaturedOverride: true }` — rejected by `keys().hasOnly(...)`.
5. **Author UID Spoofing**: Admin sends `authorUid: 'someone-else'` on create or alters `authorUid` on update.
6. **Timestamp Spoofing**: Client sends a custom `Date` for `createdAt` or `updatedAt` instead of `serverTimestamp()`.
7. **Immutable Field Mutation**: Update attempts to change `createdAt` or `authorUid`.
8. **ID Poisoning Attack**: Document ID contains spaces, slashes, or >128 characters (`'../admin'`, 200-char ID).
9. **Oversized Array / String DoS**: `description` exceeds 2000 chars or `features` array exceeds 10 items.
10. **Invalid Status / Category Enum**: Product `status: 'deleted'` or `categoryId: 'unknown'`.
11. **Draft Blog Post Scraping**: Public user tries `get(/blogPosts/draft-id)` or `list` without `status == 'published'` filter.
12. **Self-Privilege Escalation**: Authenticated non-admin attempts `setDoc(/admins/{uid}, { role: 'admin', email: ... })`.
