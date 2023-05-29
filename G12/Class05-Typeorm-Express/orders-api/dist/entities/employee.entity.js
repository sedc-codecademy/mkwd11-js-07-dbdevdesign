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
exports.Employee = void 0;
var typeorm_1 = require("typeorm");
var Employee = exports.Employee = /** @class */ (function () {
    function Employee() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Employee.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: "firstname",
        }),
        __metadata("design:type", String)
    ], Employee.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: "lastname",
        }),
        __metadata("design:type", String)
    ], Employee.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: "dateofbirth",
            type: "date",
        }),
        __metadata("design:type", String)
    ], Employee.prototype, "dateOfBirth", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Employee.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: "hiredate",
            type: "date",
        }),
        __metadata("design:type", String)
    ], Employee.prototype, "hireDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: "nationalidnumber",
        }),
        __metadata("design:type", String)
    ], Employee.prototype, "nationalIdNumber", void 0);
    Employee = __decorate([
        (0, typeorm_1.Entity)()
    ], Employee);
    return Employee;
}());
