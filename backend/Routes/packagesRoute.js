const express = require("express");
const router = express.Router();
const packageController = require("../Controllers/packagesController");


router.post("/createPackage/:clubId", packageController.createPackage);

router.get("/getAllPackages/:clubId", packageController.getPackages);

router.get("/getsinglePackage/:id", packageController.getPackageById);

router.put("/updatePackage/:id", packageController.updatePackage);

router.delete("/deletePackage/:id", packageController.deletePackage);

module.exports = router;
