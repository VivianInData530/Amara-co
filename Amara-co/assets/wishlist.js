class Wishlist {
  constructor() {
    this.storageKey = 'amara-wishlist';
    this.items = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
  add(productId) { if (!this.items.includes(productId)) { this.items.push(productId); this.save(); } }
  remove(productId) { this.items = this.items.filter(id => id !== productId); this.save(); }
  save() { localStorage.setItem(this.storageKey, JSON.stringify(this.items)); }
  has(productId) { return this.items.includes(productId); }
}
window.wishlist = new Wishlist();