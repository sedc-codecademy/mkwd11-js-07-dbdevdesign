import * as express from "express";
import { Request, Response } from "express";
import { dataSource } from "./app.data-source";
import { Customer } from "./entities/customer.entity";
import { Employee } from "./entities/employee.entity";
import { Product } from "./entities/product.entity";
import { BusinessEntity } from "./entities/busines-entity.entity";
import { OrderDetails } from "./entities/order-details.entity";

const app = express();
app.use(express.json());

dataSource
  .initialize()
  .then(() => {
    console.log("Connected to databse");
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

    const customerCount = await repo.createQueryBuilder();

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
      },
    });

    const queryOrderDetailsData = await repo
      .createQueryBuilder("od")
      .leftJoinAndSelect("od.product", "p")
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

app.listen(4000, "0.0.0.0", () => {
  console.log("Server is up at port 4000");
});
