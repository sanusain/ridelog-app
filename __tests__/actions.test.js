import { ActionSetVehicles } from "../Source/Database/Actions"

// creating the sameobject type as of the class
// update the payload of the object with testpayload data
// call the action with with testpayload data, both should match.

describe("Action", () => {
  it("Set Vehicles", () => {
    const testData = {
      vcallsign: "Ghost",
      maker: "Rolls",
      model: "Royce",
      odo: "5000",
      plate: "AGNO23",
      vin: "ALASKA234SF234",
      year: 2024,
    }
    const expectedData = new ActionSetVehicles()
    expectedData.payload = testData
    expect(new ActionSetVehicles(testData)).toEqual(expectedData)
  })
})
