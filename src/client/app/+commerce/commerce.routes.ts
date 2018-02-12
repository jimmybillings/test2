import { Routes } from '@angular/router';

import { CartComponent } from './+cart/cart.component';
import { CartAssetComponent } from './+cart/components/cart-asset.component';
import { CartGuard } from './+cart/services/cart.guard';
import { CartResolver } from './+cart/services/cart.resolver';
import { CartAssetResolver } from './+cart/services/cart-asset.resolver';

import { OrdersComponent } from './+order/+index/orders.component';
import { OrderShowComponent } from './+order/+show/order-show.component';
import { OrderAssetComponent } from './+order/components/order-asset.component';
import { OrderResolver } from './+order/services/order.resolver';
import { OrderAssetResolver } from './+order/services/order-asset.resolver';
import { OrdersResolver } from './+order/services/orders.resolver';

import { InvoiceComponent } from './+order/components/invoice.component';
import { InvoiceResolver } from './+order/services/invoice.resolver';

import { QuoteShowComponent } from './+quote/+show/quote-show.component';
import { QuoteEditAssetComponent } from './+quote/components/quote-edit-asset.component';
import { QuoteShowAssetComponent } from './+quote/components/quote-show-asset.component';
import { QuotesComponent } from './+quote/+index/quotes.component';
import { QuoteShowResolver } from './+quote/services/quote-show.resolver';
import { QuoteEditAssetResolver } from './+quote/services/quote-edit-asset.resolver';
import { QuoteShowAssetResolver } from './+quote/services/quote-show-asset.resolver';
import { QuotesResolver } from './+quote/services/quotes.resolver';
import { QuoteEditComponent } from './+quote/+edit/quote-edit.component';
import { QuoteEditResolver } from './+quote/services/quote-edit.resolver';
import { QuoteEditGuard } from './+quote/services/quote-edit.guard';


export const COMMERCE_ROUTES: Routes = [
  {
    path: 'cart',
    component: CartComponent,
    resolve: { cart: CartResolver },
    data: { title: 'PAGE_TITLE.CART' }
  },
  {
    path: 'cart/asset/:uuid',
    component: CartAssetComponent,
    resolve: { asset: CartAssetResolver },
    data: { title: 'PAGE_TITLE.CART_ASSET' }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    resolve: { orders: OrdersResolver },
    data: { title: 'PAGE_TITLE.ORDERS' }
  },
  {
    path: 'orders/:id',
    component: OrderShowComponent,
    resolve: { order: OrderResolver },
    data: { title: 'PAGE_TITLE.ORDER' }
  },
  {
    path: 'orders/:id/invoice',
    component: InvoiceComponent,
    resolve: { invoice: InvoiceResolver },
    data: { title: 'PAGE_TITLE.INVOICE' }
  },
  {
    path: 'orders/:id/asset/:uuid',
    component: OrderAssetComponent,
    resolve: { order: OrderAssetResolver },
    data: { title: 'PAGE_TITLE.ORDER_ASSET' }
  },
  {
    path: 'quotes',
    component: QuotesComponent,
    resolve: { quotes: QuotesResolver },
    data: { title: 'PAGE_TITLE.QUOTES' }
  },
  {
    path: 'quotes/:id',
    component: QuoteShowComponent,
    resolve: { quote: QuoteShowResolver },
    data: { title: 'PAGE_TITLE.QUOTE' }
  },
  {
    path: 'quotes/:id/asset/:uuid',
    component: QuoteShowAssetComponent,
    resolve: { quoteShowAsset: QuoteShowAssetResolver },
    data: { title: 'PAGE_TITLE.QUOTE_ASSET' }
  },
  {
    path: 'active-quote',
    component: QuoteEditComponent,
    resolve: { quote: QuoteEditResolver },
    canActivate: [QuoteEditGuard],
    data: { title: 'PAGE_TITLE.ACTIVE_QUOTE' }
  },
  {
    path: 'active-quote/asset/:uuid',
    component: QuoteEditAssetComponent,
    resolve: { quoteEditAsset: QuoteEditAssetResolver },
    data: { title: 'PAGE_TITLE.ACTIVE_QUOTE_ASSET' }
  }
];

