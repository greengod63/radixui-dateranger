#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { UiInfraStack } from "../lib/ui-infra-stack";

const app = new cdk.App();

new UiInfraStack(app, "dev", "DevUiInfraStack", {
  env: { account: "227941039661", region: "ap-southeast-2" },
});

new UiInfraStack(app, "prod", "ProdUiInfraStack", {
  env: { account: "227941039661", region: "ap-southeast-2" },
});
