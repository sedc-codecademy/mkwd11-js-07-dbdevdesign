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
exports.Order = void 0;
var typeorm_1 = require("typeorm");
var busines_entity_entity_1 = require("./busines-entity.entity");
var employee_entity_1 = require("./employee.entity");
var customer_entity_1 = require("./customer.entity");
var order_details_entity_1 = require("./order-details.entity");
var Order = exports.Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Order.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: "orderdate",
            type: "date",
        }),
        __metadata("design:type", String)
    ], Order.prototype, "orderDate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Order.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: "totalprice",
        }),
        __metadata("design:type", Number)
    ], Order.prototype, "totalPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Order.prototype, "comment", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return busines_entity_entity_1.BusinessEntity; }, function (businessEntity) { return businessEntity.orders; }),
        (0, typeorm_1.JoinColumn)({
            name: "businessentityid",
        }),
        __metadata("design:type", busines_entity_entity_1.BusinessEntity)
    ], Order.prototype, "businessEntity", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return employee_entity_1.Employee; }),
        (0, typeorm_1.JoinColumn)({
            name: "employeeid",
        }),
        __metadata("design:type", employee_entity_1.Employee)
    ], Order.prototype, "employee", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return customer_entity_1.Customer; }),
        (0, typeorm_1.JoinColumn)({
            name: "customerid",
        }),
        __metadata("design:type", customer_entity_1.Customer)
    ], Order.prototype, "customer", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return order_details_entity_1.OrderDetails; }, function (orderDetails) { return orderDetails.order; }),
        __metadata("design:type", order_details_entity_1.OrderDetails)
    ], Order.prototype, "orderDetails", void 0);
    Order = __decorate([
        (0, typeorm_1.Entity)()
    ], Order);
    return Order;
}());
