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
exports.MaxPriceView = void 0;
var typeorm_1 = require("typeorm");
var busines_entity_entity_1 = require("./busines-entity.entity");
var MaxPriceView = exports.MaxPriceView = /** @class */ (function () {
    function MaxPriceView() {
    }
    __decorate([
        (0, typeorm_1.ViewColumn)(),
        __metadata("design:type", Number)
    ], MaxPriceView.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ViewColumn)(),
        __metadata("design:type", String)
    ], MaxPriceView.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.ViewColumn)(),
        __metadata("design:type", Number)
    ], MaxPriceView.prototype, "maxPrice", void 0);
    __decorate([
        (0, typeorm_1.ViewColumn)(),
        __metadata("design:type", Number)
    ], MaxPriceView.prototype, "minPrice", void 0);
    MaxPriceView = __decorate([
        (0, typeorm_1.ViewEntity)({
            name: "vw_max_price",
            expression: function (dataSource) {
                return dataSource
                    .createQueryBuilder(busines_entity_entity_1.BusinessEntity, "be")
                    .leftJoinAndSelect("be.orders", "o")
                    .select("be.id", "id")
                    .addSelect("be.name", "name")
                    .addSelect("MAX(o.totalprice)", "maxPrice")
                    .addSelect("MIN(o.totalprice)", "minPrice")
                    .groupBy("be.id");
            },
        })
    ], MaxPriceView);
    return MaxPriceView;
}());
