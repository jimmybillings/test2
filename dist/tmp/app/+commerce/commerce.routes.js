"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cart_component_1 = require("./+cart/cart.component");
var cart_asset_component_1 = require("./+cart/components/cart-asset.component");
var cart_resolver_1 = require("./+cart/services/cart.resolver");
var cart_asset_resolver_1 = require("./+cart/services/cart-asset.resolver");
var orders_component_1 = require("./+order/+index/orders.component");
var order_show_component_1 = require("./+order/+show/order-show.component");
var order_asset_component_1 = require("./+order/components/order-asset.component");
var order_resolver_1 = require("./+order/services/order.resolver");
var order_asset_resolver_1 = require("./+order/services/order-asset.resolver");
var orders_resolver_1 = require("./+order/services/orders.resolver");
var invoice_component_1 = require("./+order/components/invoice.component");
var invoice_resolver_1 = require("./+order/services/invoice.resolver");
var quote_show_component_1 = require("./+quote/+show/quote-show.component");
var quote_edit_asset_component_1 = require("./+quote/components/quote-edit-asset.component");
var quote_show_asset_component_1 = require("./+quote/components/quote-show-asset.component");
var quotes_component_1 = require("./+quote/+index/quotes.component");
var quote_show_resolver_1 = require("./+quote/services/quote-show.resolver");
var quote_edit_asset_resolver_1 = require("./+quote/services/quote-edit-asset.resolver");
var quote_show_asset_resolver_1 = require("./+quote/services/quote-show-asset.resolver");
var quotes_resolver_1 = require("./+quote/services/quotes.resolver");
var quote_edit_component_1 = require("./+quote/+edit/quote-edit.component");
var quote_edit_resolver_1 = require("./+quote/services/quote-edit.resolver");
var quote_edit_guard_1 = require("./+quote/services/quote-edit.guard");
exports.COMMERCE_ROUTES = [
    {
        path: 'cart',
        component: cart_component_1.CartComponent,
        resolve: { cart: cart_resolver_1.CartResolver },
        data: { title: 'PAGE_TITLE.CART' }
    },
    {
        path: 'cart/asset/:uuid',
        component: cart_asset_component_1.CartAssetComponent,
        resolve: { asset: cart_asset_resolver_1.CartAssetResolver },
        data: { title: 'PAGE_TITLE.CART_ASSET' }
    },
    {
        path: 'orders',
        component: orders_component_1.OrdersComponent,
        resolve: { orders: orders_resolver_1.OrdersResolver },
        data: { title: 'PAGE_TITLE.ORDERS' }
    },
    {
        path: 'orders/:id',
        component: order_show_component_1.OrderShowComponent,
        resolve: { order: order_resolver_1.OrderResolver },
        data: { title: 'PAGE_TITLE.ORDER' }
    },
    {
        path: 'orders/:id/invoice',
        component: invoice_component_1.InvoiceComponent,
        resolve: { invoice: invoice_resolver_1.InvoiceResolver },
        data: { title: 'PAGE_TITLE.INVOICE' }
    },
    {
        path: 'orders/:id/asset/:uuid',
        component: order_asset_component_1.OrderAssetComponent,
        resolve: { order: order_asset_resolver_1.OrderAssetResolver },
        data: { title: 'PAGE_TITLE.ORDER_ASSET' }
    },
    {
        path: 'quotes',
        component: quotes_component_1.QuotesComponent,
        resolve: { quotes: quotes_resolver_1.QuotesResolver },
        data: { title: 'PAGE_TITLE.QUOTES' }
    },
    {
        path: 'quotes/:id',
        component: quote_show_component_1.QuoteShowComponent,
        resolve: { quote: quote_show_resolver_1.QuoteShowResolver },
        data: { title: 'PAGE_TITLE.QUOTE' }
    },
    {
        path: 'quotes/:id/asset/:uuid',
        component: quote_show_asset_component_1.QuoteShowAssetComponent,
        resolve: { quoteShowAsset: quote_show_asset_resolver_1.QuoteShowAssetResolver },
        data: { title: 'PAGE_TITLE.QUOTE_ASSET' }
    },
    {
        path: 'active-quote',
        component: quote_edit_component_1.QuoteEditComponent,
        resolve: { quote: quote_edit_resolver_1.QuoteEditResolver },
        canActivate: [quote_edit_guard_1.QuoteEditGuard],
        data: { title: 'PAGE_TITLE.ACTIVE_QUOTE' }
    },
    {
        path: 'active-quote/asset/:uuid',
        component: quote_edit_asset_component_1.QuoteEditAssetComponent,
        resolve: { quoteEditAsset: quote_edit_asset_resolver_1.QuoteEditAssetResolver },
        data: { title: 'PAGE_TITLE.ACTIVE_QUOTE_ASSET' }
    }
];
//# sourceMappingURL=commerce.routes.js.map