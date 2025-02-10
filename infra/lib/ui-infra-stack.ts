import { CfnParameter, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";

export class UiInfraStack extends Stack {
  constructor(scope: Construct, stage: string, id: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, `AppUiBucket`, {
      bucketName: `${stage}-prescient-properties-app-ui`,
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    const deployment = new s3Deployment.BucketDeployment(
      this,
      "AppUiDeployment",
      {
        sources: [s3Deployment.Source.asset("../app/public")],
        destinationBucket: websiteBucket,
      }
    );

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    websiteBucket.grantRead(originAccessIdentity);

    new Distribution(this, "Distribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new S3Origin(websiteBucket, { originAccessIdentity }),
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });
  }
}

// aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"

// Dev
// aws cloudfront create-invalidation --distribution-id E30KAFBMO0KOSP --paths "/*"

// Prod
// aws cloudfront create-invalidation --distribution-id EM0NGMGW0MWN3 --paths "/*"