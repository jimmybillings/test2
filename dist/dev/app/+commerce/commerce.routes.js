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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tbWVyY2Uucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEseURBQXVEO0FBQ3ZELGdGQUE2RTtBQUU3RSxnRUFBOEQ7QUFDOUQsNEVBQXlFO0FBRXpFLHFFQUFtRTtBQUNuRSw0RUFBeUU7QUFDekUsbUZBQWdGO0FBQ2hGLG1FQUFpRTtBQUNqRSwrRUFBNEU7QUFDNUUscUVBQW1FO0FBRW5FLDJFQUF5RTtBQUN6RSx1RUFBcUU7QUFFckUsNEVBQXlFO0FBQ3pFLDZGQUF5RjtBQUN6Riw2RkFBeUY7QUFDekYscUVBQW1FO0FBQ25FLDZFQUEwRTtBQUMxRSx5RkFBcUY7QUFDckYseUZBQXFGO0FBQ3JGLHFFQUFtRTtBQUNuRSw0RUFBeUU7QUFDekUsNkVBQTBFO0FBQzFFLHVFQUFvRTtBQUd2RCxRQUFBLGVBQWUsR0FBVztJQUNyQztRQUNFLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLDhCQUFhO1FBQ3hCLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSw0QkFBWSxFQUFFO1FBQy9CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRTtLQUNuQztJQUNEO1FBQ0UsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixTQUFTLEVBQUUseUNBQWtCO1FBQzdCLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSx1Q0FBaUIsRUFBRTtRQUNyQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUU7S0FDekM7SUFDRDtRQUNFLElBQUksRUFBRSxRQUFRO1FBQ2QsU0FBUyxFQUFFLGtDQUFlO1FBQzFCLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxnQ0FBYyxFQUFFO1FBQ25DLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRTtLQUNyQztJQUNEO1FBQ0UsSUFBSSxFQUFFLFlBQVk7UUFDbEIsU0FBUyxFQUFFLHlDQUFrQjtRQUM3QixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsOEJBQWEsRUFBRTtRQUNqQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7S0FDcEM7SUFDRDtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsU0FBUyxFQUFFLG9DQUFnQjtRQUMzQixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsa0NBQWUsRUFBRTtRQUNyQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUU7S0FDdEM7SUFDRDtRQUNFLElBQUksRUFBRSx3QkFBd0I7UUFDOUIsU0FBUyxFQUFFLDJDQUFtQjtRQUM5QixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUseUNBQWtCLEVBQUU7UUFDdEMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixFQUFFO0tBQzFDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsUUFBUTtRQUNkLFNBQVMsRUFBRSxrQ0FBZTtRQUMxQixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsZ0NBQWMsRUFBRTtRQUNuQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUU7S0FDckM7SUFDRDtRQUNFLElBQUksRUFBRSxZQUFZO1FBQ2xCLFNBQVMsRUFBRSx5Q0FBa0I7UUFDN0IsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLHVDQUFpQixFQUFFO1FBQ3JDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRTtLQUNwQztJQUNEO1FBQ0UsSUFBSSxFQUFFLHdCQUF3QjtRQUM5QixTQUFTLEVBQUUsb0RBQXVCO1FBQ2xDLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxrREFBc0IsRUFBRTtRQUNuRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUU7S0FDMUM7SUFDRDtRQUNFLElBQUksRUFBRSxjQUFjO1FBQ3BCLFNBQVMsRUFBRSx5Q0FBa0I7UUFDN0IsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLHVDQUFpQixFQUFFO1FBQ3JDLFdBQVcsRUFBRSxDQUFDLGlDQUFjLENBQUM7UUFDN0IsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFO0tBQzNDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsMEJBQTBCO1FBQ2hDLFNBQVMsRUFBRSxvREFBdUI7UUFDbEMsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLGtEQUFzQixFQUFFO1FBQ25ELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSwrQkFBK0IsRUFBRTtLQUNqRDtDQUNGLENBQUMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21tZXJjZS5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBDYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi8rY2FydC9jYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXJ0QXNzZXRDb21wb25lbnQgfSBmcm9tICcuLytjYXJ0L2NvbXBvbmVudHMvY2FydC1hc3NldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FydEd1YXJkIH0gZnJvbSAnLi8rY2FydC9zZXJ2aWNlcy9jYXJ0Lmd1YXJkJztcbmltcG9ydCB7IENhcnRSZXNvbHZlciB9IGZyb20gJy4vK2NhcnQvc2VydmljZXMvY2FydC5yZXNvbHZlcic7XG5pbXBvcnQgeyBDYXJ0QXNzZXRSZXNvbHZlciB9IGZyb20gJy4vK2NhcnQvc2VydmljZXMvY2FydC1hc3NldC5yZXNvbHZlcic7XG5cbmltcG9ydCB7IE9yZGVyc0NvbXBvbmVudCB9IGZyb20gJy4vK29yZGVyLytpbmRleC9vcmRlcnMuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyU2hvd0NvbXBvbmVudCB9IGZyb20gJy4vK29yZGVyLytzaG93L29yZGVyLXNob3cuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyQXNzZXRDb21wb25lbnQgfSBmcm9tICcuLytvcmRlci9jb21wb25lbnRzL29yZGVyLWFzc2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlclJlc29sdmVyIH0gZnJvbSAnLi8rb3JkZXIvc2VydmljZXMvb3JkZXIucmVzb2x2ZXInO1xuaW1wb3J0IHsgT3JkZXJBc3NldFJlc29sdmVyIH0gZnJvbSAnLi8rb3JkZXIvc2VydmljZXMvb3JkZXItYXNzZXQucmVzb2x2ZXInO1xuaW1wb3J0IHsgT3JkZXJzUmVzb2x2ZXIgfSBmcm9tICcuLytvcmRlci9zZXJ2aWNlcy9vcmRlcnMucmVzb2x2ZXInO1xuXG5pbXBvcnQgeyBJbnZvaWNlQ29tcG9uZW50IH0gZnJvbSAnLi8rb3JkZXIvY29tcG9uZW50cy9pbnZvaWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnZvaWNlUmVzb2x2ZXIgfSBmcm9tICcuLytvcmRlci9zZXJ2aWNlcy9pbnZvaWNlLnJlc29sdmVyJztcblxuaW1wb3J0IHsgUXVvdGVTaG93Q29tcG9uZW50IH0gZnJvbSAnLi8rcXVvdGUvK3Nob3cvcXVvdGUtc2hvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVvdGVFZGl0QXNzZXRDb21wb25lbnQgfSBmcm9tICcuLytxdW90ZS9jb21wb25lbnRzL3F1b3RlLWVkaXQtYXNzZXQuY29tcG9uZW50JztcbmltcG9ydCB7IFF1b3RlU2hvd0Fzc2V0Q29tcG9uZW50IH0gZnJvbSAnLi8rcXVvdGUvY29tcG9uZW50cy9xdW90ZS1zaG93LWFzc2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdW90ZXNDb21wb25lbnQgfSBmcm9tICcuLytxdW90ZS8raW5kZXgvcXVvdGVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdW90ZVNob3dSZXNvbHZlciB9IGZyb20gJy4vK3F1b3RlL3NlcnZpY2VzL3F1b3RlLXNob3cucmVzb2x2ZXInO1xuaW1wb3J0IHsgUXVvdGVFZGl0QXNzZXRSZXNvbHZlciB9IGZyb20gJy4vK3F1b3RlL3NlcnZpY2VzL3F1b3RlLWVkaXQtYXNzZXQucmVzb2x2ZXInO1xuaW1wb3J0IHsgUXVvdGVTaG93QXNzZXRSZXNvbHZlciB9IGZyb20gJy4vK3F1b3RlL3NlcnZpY2VzL3F1b3RlLXNob3ctYXNzZXQucmVzb2x2ZXInO1xuaW1wb3J0IHsgUXVvdGVzUmVzb2x2ZXIgfSBmcm9tICcuLytxdW90ZS9zZXJ2aWNlcy9xdW90ZXMucmVzb2x2ZXInO1xuaW1wb3J0IHsgUXVvdGVFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi8rcXVvdGUvK2VkaXQvcXVvdGUtZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVvdGVFZGl0UmVzb2x2ZXIgfSBmcm9tICcuLytxdW90ZS9zZXJ2aWNlcy9xdW90ZS1lZGl0LnJlc29sdmVyJztcbmltcG9ydCB7IFF1b3RlRWRpdEd1YXJkIH0gZnJvbSAnLi8rcXVvdGUvc2VydmljZXMvcXVvdGUtZWRpdC5ndWFyZCc7XG5cblxuZXhwb3J0IGNvbnN0IENPTU1FUkNFX1JPVVRFUzogUm91dGVzID0gW1xuICB7XG4gICAgcGF0aDogJ2NhcnQnLFxuICAgIGNvbXBvbmVudDogQ2FydENvbXBvbmVudCxcbiAgICByZXNvbHZlOiB7IGNhcnQ6IENhcnRSZXNvbHZlciB9LFxuICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLkNBUlQnIH1cbiAgfSxcbiAge1xuICAgIHBhdGg6ICdjYXJ0L2Fzc2V0Lzp1dWlkJyxcbiAgICBjb21wb25lbnQ6IENhcnRBc3NldENvbXBvbmVudCxcbiAgICByZXNvbHZlOiB7IGFzc2V0OiBDYXJ0QXNzZXRSZXNvbHZlciB9LFxuICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLkNBUlRfQVNTRVQnIH1cbiAgfSxcbiAge1xuICAgIHBhdGg6ICdvcmRlcnMnLFxuICAgIGNvbXBvbmVudDogT3JkZXJzQ29tcG9uZW50LFxuICAgIHJlc29sdmU6IHsgb3JkZXJzOiBPcmRlcnNSZXNvbHZlciB9LFxuICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLk9SREVSUycgfVxuICB9LFxuICB7XG4gICAgcGF0aDogJ29yZGVycy86aWQnLFxuICAgIGNvbXBvbmVudDogT3JkZXJTaG93Q29tcG9uZW50LFxuICAgIHJlc29sdmU6IHsgb3JkZXI6IE9yZGVyUmVzb2x2ZXIgfSxcbiAgICBkYXRhOiB7IHRpdGxlOiAnUEFHRV9USVRMRS5PUkRFUicgfVxuICB9LFxuICB7XG4gICAgcGF0aDogJ29yZGVycy86aWQvaW52b2ljZScsXG4gICAgY29tcG9uZW50OiBJbnZvaWNlQ29tcG9uZW50LFxuICAgIHJlc29sdmU6IHsgaW52b2ljZTogSW52b2ljZVJlc29sdmVyIH0sXG4gICAgZGF0YTogeyB0aXRsZTogJ1BBR0VfVElUTEUuSU5WT0lDRScgfVxuICB9LFxuICB7XG4gICAgcGF0aDogJ29yZGVycy86aWQvYXNzZXQvOnV1aWQnLFxuICAgIGNvbXBvbmVudDogT3JkZXJBc3NldENvbXBvbmVudCxcbiAgICByZXNvbHZlOiB7IG9yZGVyOiBPcmRlckFzc2V0UmVzb2x2ZXIgfSxcbiAgICBkYXRhOiB7IHRpdGxlOiAnUEFHRV9USVRMRS5PUkRFUl9BU1NFVCcgfVxuICB9LFxuICB7XG4gICAgcGF0aDogJ3F1b3RlcycsXG4gICAgY29tcG9uZW50OiBRdW90ZXNDb21wb25lbnQsXG4gICAgcmVzb2x2ZTogeyBxdW90ZXM6IFF1b3Rlc1Jlc29sdmVyIH0sXG4gICAgZGF0YTogeyB0aXRsZTogJ1BBR0VfVElUTEUuUVVPVEVTJyB9XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAncXVvdGVzLzppZCcsXG4gICAgY29tcG9uZW50OiBRdW90ZVNob3dDb21wb25lbnQsXG4gICAgcmVzb2x2ZTogeyBxdW90ZTogUXVvdGVTaG93UmVzb2x2ZXIgfSxcbiAgICBkYXRhOiB7IHRpdGxlOiAnUEFHRV9USVRMRS5RVU9URScgfVxuICB9LFxuICB7XG4gICAgcGF0aDogJ3F1b3Rlcy86aWQvYXNzZXQvOnV1aWQnLFxuICAgIGNvbXBvbmVudDogUXVvdGVTaG93QXNzZXRDb21wb25lbnQsXG4gICAgcmVzb2x2ZTogeyBxdW90ZVNob3dBc3NldDogUXVvdGVTaG93QXNzZXRSZXNvbHZlciB9LFxuICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLlFVT1RFX0FTU0VUJyB9XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnYWN0aXZlLXF1b3RlJyxcbiAgICBjb21wb25lbnQ6IFF1b3RlRWRpdENvbXBvbmVudCxcbiAgICByZXNvbHZlOiB7IHF1b3RlOiBRdW90ZUVkaXRSZXNvbHZlciB9LFxuICAgIGNhbkFjdGl2YXRlOiBbUXVvdGVFZGl0R3VhcmRdLFxuICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLkFDVElWRV9RVU9URScgfVxuICB9LFxuICB7XG4gICAgcGF0aDogJ2FjdGl2ZS1xdW90ZS9hc3NldC86dXVpZCcsXG4gICAgY29tcG9uZW50OiBRdW90ZUVkaXRBc3NldENvbXBvbmVudCxcbiAgICByZXNvbHZlOiB7IHF1b3RlRWRpdEFzc2V0OiBRdW90ZUVkaXRBc3NldFJlc29sdmVyIH0sXG4gICAgZGF0YTogeyB0aXRsZTogJ1BBR0VfVElUTEUuQUNUSVZFX1FVT1RFX0FTU0VUJyB9XG4gIH1cbl07XG5cbiJdfQ==
