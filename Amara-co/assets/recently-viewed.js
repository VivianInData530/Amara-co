class RecentlyViewed {
  constructor() {
    this.storageKey = 'amara-recently-viewed';
    this.items = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
  add(productId) {
    this.items = this.items.filter(id => id !== productId);
    this.items.unshift(productId);
    if (this.items.length > 5) this.items.pop();
    this.save();
  }
  save() { localStorage.setItem(this.storageKey, JSON.stringify(this.items)); }
}
window.recentlyViewed = new RecentlyViewed();
if (window.Shopify && window.Shopify.product) { window.recentlyViewed.add(window.Shopify.product.id); }