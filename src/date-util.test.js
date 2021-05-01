const util = require("./date-util");
test("Test minute range", () => {
    const now = new Date();
    const minutes = util.getMinutes(now.setMinutes(now.getMinutes() - 60), now.setMinutes(now.getMinutes() - 10));    
});
