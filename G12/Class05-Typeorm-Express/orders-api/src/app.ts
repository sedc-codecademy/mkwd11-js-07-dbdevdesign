import * as express from "express";
import { Request, Response } from "express";
import { dataSource } from "./app.data-source";
import { Customer } from "./entities/customer.entity";
import { Employee } from "./entities/employee.entity";
import { Product } from "./entities/product.entity";
import { BusinessEntity } from "./entities/busines-entity.entity";
import { OrderDetails } from "./entities/order-details.entity";
import { Order } from "./entities/order.entity";
import { CustomerOrdersView } from "./entities/customer-orders.view-entity";
import { MaxPriceView } from "./entities/max-price.view-entity";

const app = express();
app.use(express.json());

dataSource
  .initialize()
  .then(() => {
    console.log("Connected to database");
  })
  .catch(err => {
    console.log(`Something went wrong. ${err}`);
  });

// Get all customers
app.get("/customers", async (req: Request, res: Response) => {
  const repo = dataSource.getRepository(Customer);

  try {
    // const customerData = await repo.find({});

    // When creating custom tables with custom table names be careful of using get many as it returns entity instances instead of the raw sql, use raw methods when you want to create something custom

    const customerData = await repo
      .createQueryBuilder("c") // this methods accepts the alias we want to use for the table
      .select("c.name", "customer_name")
      .addSelect("c.accountnumber", "customer_account") // select gets all the columns in the table
      .getRawMany(); // Returns raw data from the databse
    // .getMany(); //Returns entity objects

    const customerCount = await repo.createQueryBuilder().getCount();

    res.json({
      customers: customerData,
      totalCount: customerCount,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get all employees
app.get("/employees", async (req: Request, res: Response) => {
  const repo = dataSource.getRepository(Employee);

  try {
    const employeeData = await repo.find({});

    const employeeCount = await repo.createQueryBuilder().getCount();

    res.json({
      employees: employeeData,
      totalCount: employeeCount,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get all products
app.get("/products", async (req: Request, res: Response) => {
  const repo = dataSource.getRepository(Product);
  const { pageNum = 1, perPage = 10 } = req.query;

  try {
    const productData = await repo.find({
      take: Number(perPage),
      skip: (Number(pageNum) - 1) * Number(perPage),
    });

    const productCount = await repo.createQueryBuilder().getCount();

    console.log(await dataSource.query("SELECT format_product_name(1)"));

    res.json({
      products: productData,
      totalCount: productCount,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get all business entities
app.get("/business-entities", async (req: Request, res: Response) => {
  const repo = dataSource.getRepository(BusinessEntity);

  try {
    const businessEntityData = await repo.find({});

    const businessEntityCount = await repo.createQueryBuilder().getCount();

    res.json({
      businessEntities: businessEntityData,
      totalCount: businessEntityCount,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get order details by id
app.get("/order-details/:id", async (req: Request, res: Response) => {
  const repo = dataSource.getRepository(OrderDetails);
  const id = req.params.id;

  try {
    const orderDetailsData = await repo.findOne({
      where: { id: Number(id) },
      relations: {
        product: true,
        order: true,
      },
    });

    const queryOrderDetailsData = await repo
      .createQueryBuilder("od")
      .leftJoinAndSelect("od.product", "p")
      .leftJoinAndSelect("od.order", "o")
      // using the ":" syntax will allow us to map properties form the raw sql query to the object we use to pass arguments
      .where("od.id = :orderDetailsId", { orderDetailsId: Number(id) })
      .getOne();

    if (!orderDetailsData) throw new Error();

    res.json(queryOrderDetailsData);
    // res.json(orderDetailsData);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

// Get orders
app.get("/orders", async (req: Request, res: Response) => {
  const repo = dataSource.getRepository(Order);
  const { pageNum = 1, perPage = 10 } = req.query;

  try {
    const orderData = await repo.find({
      take: Number(perPage),
      skip: (Number(pageNum) - 1) * Number(perPage),
    });

    const orderCount = await repo.createQueryBuilder().getCount();

    // When using aggregate function in the query builder the same rules as in sql apply, we cannot select normal columns without a group by statement, and in order to get the custom values we have to use the getRawOne or getRawMany functions otherwise we will get an empty array if we use the getOne and the getMany functions as they are build only to work with entities

    const aggregateData = await repo
      .createQueryBuilder("o")
      .select("AVG(o.totalprice)", "totalPriceAvg")
      .addSelect("MAX(o.totalprice)", "totalPriceMax")
      // .addSelect("COUNT(*)", "orderCount")
      .getRawOne();

    res.json({
      orders: orderData,
      totalCount: orderCount,
      ...aggregateData,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get full order data by id
app.get("/orders/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const repo = dataSource.getRepository(Order);

  try {
    const orderData = await repo.findOne({
      where: { id },
      relations: {
        employee: true,
        customer: true,
        businessEntity: true,
        orderDetails: true,
      },
    });

    const queryOrderData = await repo
      .createQueryBuilder("o")
      .leftJoinAndSelect("o.businessEntity", "be")
      .leftJoinAndSelect("o.customer", "c")
      .leftJoinAndSelect("o.employee", "e")
      .leftJoinAndSelect("o.orderDetails", "od")
      .leftJoinAndSelect("od.product", "p")
      .where("o.id = :orderId", { orderId: id })
      .getOne();

    if (!orderData) throw new Error();

    res.json(queryOrderData);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

app.get("/businessentities/max-price", async (req: Request, res: Response) => {
  const minPrice = 4;

  // const repo = dataSource.getRepository(BusinessEntity);

  // const maxPriceData = await repo
  //   .createQueryBuilder("be")
  //   .leftJoinAndSelect("be.orders", "o")
  //   .select("be.id", "id")
  //   .addSelect("be.name", "name")
  //   .addSelect("MAX(o.totalprice)", "maxPrice")
  //   .addSelect("MIN(o.totalprice)", "minPrice")
  //   .groupBy("be.id")
  //   .having("MIN(o.totalprice) < :minPrice", { minPrice })
  //   .getRawMany();

  const repo = dataSource.getRepository(MaxPriceView);

  const maxPriceData = await repo.find({});

  res.json(maxPriceData);
});

app.get("/customer-orders", async (req: Request, res: Response) => {
  const repo = dataSource.getRepository(CustomerOrdersView);

  try {
    const viewData = await repo.find({});

    res.json(viewData);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server is up at port 4000");
});
