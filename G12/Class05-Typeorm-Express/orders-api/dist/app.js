"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_data_source_1 = require("./app.data-source");
var customer_entity_1 = require("./entities/customer.entity");
var employee_entity_1 = require("./entities/employee.entity");
var product_entity_1 = require("./entities/product.entity");
var busines_entity_entity_1 = require("./entities/busines-entity.entity");
var order_details_entity_1 = require("./entities/order-details.entity");
var order_entity_1 = require("./entities/order.entity");
var customer_orders_view_entity_1 = require("./entities/customer-orders.view-entity");
var max_price_view_entity_1 = require("./entities/max-price.view-entity");
var app = express();
app.use(express.json());
app_data_source_1.dataSource
    .initialize()
    .then(function () {
    console.log("Connected to database");
})
    .catch(function (err) {
    console.log("Something went wrong. ".concat(err));
});
// Get all customers
app.get("/customers", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, customerData, customerCount, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = app_data_source_1.dataSource.getRepository(customer_entity_1.Customer);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, repo
                        .createQueryBuilder("c") // this methods accepts the alias we want to use for the table
                        .select("c.name", "customer_name")
                        .addSelect("c.accountnumber", "customer_account") // select gets all the columns in the table
                        .getRawMany()];
            case 2:
                customerData = _a.sent();
                return [4 /*yield*/, repo.createQueryBuilder().getCount()];
            case 3:
                customerCount = _a.sent();
                res.json({
                    customers: customerData,
                    totalCount: customerCount,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Get all employees
app.get("/employees", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, employeeData, employeeCount, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = app_data_source_1.dataSource.getRepository(employee_entity_1.Employee);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, repo.find({})];
            case 2:
                employeeData = _a.sent();
                return [4 /*yield*/, repo.createQueryBuilder().getCount()];
            case 3:
                employeeCount = _a.sent();
                res.json({
                    employees: employeeData,
                    totalCount: employeeCount,
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Get all products
app.get("/products", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, _a, _b, pageNum, _c, perPage, productData, productCount, _d, _e, error_3;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                repo = app_data_source_1.dataSource.getRepository(product_entity_1.Product);
                _a = req.query, _b = _a.pageNum, pageNum = _b === void 0 ? 1 : _b, _c = _a.perPage, perPage = _c === void 0 ? 10 : _c;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 5, , 6]);
                return [4 /*yield*/, repo.find({
                        take: Number(perPage),
                        skip: (Number(pageNum) - 1) * Number(perPage),
                    })];
            case 2:
                productData = _f.sent();
                return [4 /*yield*/, repo.createQueryBuilder().getCount()];
            case 3:
                productCount = _f.sent();
                _e = (_d = console).log;
                return [4 /*yield*/, app_data_source_1.dataSource.query("SELECT format_product_name(1)")];
            case 4:
                _e.apply(_d, [_f.sent()]);
                res.json({
                    products: productData,
                    totalCount: productCount,
                });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _f.sent();
                console.log(error_3);
                res.sendStatus(500);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Get all business entities
app.get("/business-entities", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, businessEntityData, businessEntityCount, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = app_data_source_1.dataSource.getRepository(busines_entity_entity_1.BusinessEntity);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, repo.find({})];
            case 2:
                businessEntityData = _a.sent();
                return [4 /*yield*/, repo.createQueryBuilder().getCount()];
            case 3:
                businessEntityCount = _a.sent();
                res.json({
                    businessEntities: businessEntityData,
                    totalCount: businessEntityCount,
                });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Get order details by id
app.get("/order-details/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, id, orderDetailsData, queryOrderDetailsData, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = app_data_source_1.dataSource.getRepository(order_details_entity_1.OrderDetails);
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, repo.findOne({
                        where: { id: Number(id) },
                        relations: {
                            product: true,
                            order: true,
                        },
                    })];
            case 2:
                orderDetailsData = _a.sent();
                return [4 /*yield*/, repo
                        .createQueryBuilder("od")
                        .leftJoinAndSelect("od.product", "p")
                        .leftJoinAndSelect("od.order", "o")
                        // using the ":" syntax will allow us to map properties form the raw sql query to the object we use to pass arguments
                        .where("od.id = :orderDetailsId", { orderDetailsId: Number(id) })
                        .getOne()];
            case 3:
                queryOrderDetailsData = _a.sent();
                if (!orderDetailsData)
                    throw new Error();
                res.json(queryOrderDetailsData);
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.log(error_5);
                res.sendStatus(404);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Get orders
app.get("/orders", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, _a, _b, pageNum, _c, perPage, orderData, orderCount, aggregateData, error_6;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                repo = app_data_source_1.dataSource.getRepository(order_entity_1.Order);
                _a = req.query, _b = _a.pageNum, pageNum = _b === void 0 ? 1 : _b, _c = _a.perPage, perPage = _c === void 0 ? 10 : _c;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                return [4 /*yield*/, repo.find({
                        take: Number(perPage),
                        skip: (Number(pageNum) - 1) * Number(perPage),
                    })];
            case 2:
                orderData = _d.sent();
                return [4 /*yield*/, repo.createQueryBuilder().getCount()];
            case 3:
                orderCount = _d.sent();
                return [4 /*yield*/, repo
                        .createQueryBuilder("o")
                        .select("AVG(o.totalprice)", "totalPriceAvg")
                        .addSelect("MAX(o.totalprice)", "totalPriceMax")
                        // .addSelect("COUNT(*)", "orderCount")
                        .getRawOne()];
            case 4:
                aggregateData = _d.sent();
                res.json(__assign({ orders: orderData, totalCount: orderCount }, aggregateData));
                return [3 /*break*/, 6];
            case 5:
                error_6 = _d.sent();
                console.log(error_6);
                res.sendStatus(500);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Get full order data by id
app.get("/orders/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, repo, orderData, queryOrderData, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.params.id);
                repo = app_data_source_1.dataSource.getRepository(order_entity_1.Order);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, repo.findOne({
                        where: { id: id },
                        relations: {
                            employee: true,
                            customer: true,
                            businessEntity: true,
                            orderDetails: true,
                        },
                    })];
            case 2:
                orderData = _a.sent();
                return [4 /*yield*/, repo
                        .createQueryBuilder("o")
                        .leftJoinAndSelect("o.businessEntity", "be")
                        .leftJoinAndSelect("o.customer", "c")
                        .leftJoinAndSelect("o.employee", "e")
                        .leftJoinAndSelect("o.orderDetails", "od")
                        .leftJoinAndSelect("od.product", "p")
                        .where("o.id = :orderId", { orderId: id })
                        .getOne()];
            case 3:
                queryOrderData = _a.sent();
                if (!orderData)
                    throw new Error();
                res.json(queryOrderData);
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.log(error_7);
                res.sendStatus(404);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get("/businessentities/max-price", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var minPrice, repo, maxPriceData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                minPrice = 4;
                repo = app_data_source_1.dataSource.getRepository(max_price_view_entity_1.MaxPriceView);
                return [4 /*yield*/, repo.find({})];
            case 1:
                maxPriceData = _a.sent();
                res.json(maxPriceData);
                return [2 /*return*/];
        }
    });
}); });
app.get("/customer-orders", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, viewData, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = app_data_source_1.dataSource.getRepository(customer_orders_view_entity_1.CustomerOrdersView);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, repo.find({})];
            case 2:
                viewData = _a.sent();
                res.json(viewData);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.log(error_8);
                res.sendStatus(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(4000, "0.0.0.0", function () {
    console.log("Server is up at port 4000");
});
