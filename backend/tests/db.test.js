const mongoose = require("mongoose");
const connectDB = require("../db");

// Mock environment variable
process.env.MONGODB_URI = "mongodb://fake-mongo-uri";

jest.mock("mongoose", () => ({
    connect: jest.fn(),
}));

describe("ConnectDB", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should log 'Connected to MongoDB' on successful connection", async () => {
        // Mock a successful connection
        mongoose.connect.mockResolvedValueOnce();

        // Spy on console.log to check if it was called with the correct message
        const consoleLogSpy = jest.spyOn(console, "log");

        await connectDB();

        expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URI)
        expect(consoleLogSpy).toHaveBeenCalledWith("Connected to MongoDB");

        consoleLogSpy.mockRestore();
    });

    it("Should log an error message if connection fails", async () => {
        // Mock a connection failure
        const mockError = new Error("Failed to connect");
        mongoose.connect.mockRejectedValueOnce(mockError);

        // Spy on console.log to check if it logs the error message
        const consoleLogSpy = jest.spyOn(console, "log");

        await connectDB();

        expect(consoleLogSpy).toHaveBeenCalledWith("Error connecting to MongoDB:", mockError);

        consoleLogSpy.mockRestore();
    });
});
