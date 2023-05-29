"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetails = void 0;
var typeorm_1 = require("typeorm");
var product_entity_1 = require("./product.entity");
var order_entity_1 = require("./order.entity");
var OrderDetails = exports.OrderDetails = /** @class */ (function () {
    function OrderDetails() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], OrderDetails.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], OrderDetails.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], OrderDetails.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_entity_1.Product; }),
        (0, typeorm_1.JoinColumn)({
            name: "productid",
        }),
        __metadata("design:type", product_entity_1.Product)
    ], OrderDetails.prototype, "product", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return order_entity_1.Order; }, function (order) { return order.orderDetails; }),
        (0, typeorm_1.JoinColumn)({
            name: "orderid",
        }),
        __metadata("design:type", order_entity_1.Order)
    ], OrderDetails.prototype, "order", void 0);
    OrderDetails = __decorate([
        (0, typeorm_1.Entity)({
            name: "orderdetails",
        })
    ], OrderDetails);
    return OrderDetails;
}());
