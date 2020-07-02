import { DataService } from "../../src/common/api.service";
import ApiService from "../../src/common/api.service";

ApiService.init();

describe("GET data/all/", () => {
  
  it("result should be an array of json objects", async () => {
    await DataService.getData().then((data) => {
      expect(data.data).toBeInstanceOf(Array);
    });
  });
  
  it("result should have a status of 200", async () => {
    await DataService.getData().then((data) => {
      expect(data.status).toBe(200);
    });
  });

  it("result should have a property of 'order_name'", async () => {
    await DataService.getData().then((data) => {
      expect(data.data[0]).toHaveProperty('order_name');
    });
  });

  it("result should have a property of 'created_at'", async () => {
    await DataService.getData().then((data) => {
      expect(data.data[0]).toHaveProperty('created_at');
    });
  });

  it("result should have a property of 'delivered_amount'", async () => {
    await DataService.getData().then((data) => {
      expect(data.data[0]).toHaveProperty('delivered_amount');
    });
  });

  it("result should have a property of 'total_amount'", async () => {
    await DataService.getData().then((data) => {
      expect(data.data[0]).toHaveProperty('total_amount');
    });
  });

  it("result should have a property of 'order_items'", async () => {
    await DataService.getData().then((data) => {
      expect(data.data[0]).toHaveProperty('order_items');
    });
  });

  it("result should have a property of 'customer'", async () => {
    await DataService.getData().then((data) => {
      expect(data.data[0]).toHaveProperty('customer');
    });
  });
});
