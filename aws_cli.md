# AWS CLI Commands

This document provides basic AWS CLI commands for managing your AWS infrastructure, including creating VPCs, subnets, instances, route tables, internet gateways, load balancers, target groups, and more.

## Prerequisites

- AWS CLI installed and configured with necessary permissions
- Basic understanding of AWS services

## Commands

### 1. Create a VPC

```sh
aws ec2 create-vpc --cidr-block <CIDR_BLOCK>
```

Example:

```sh
aws ec2 create-vpc --cidr-block 10.0.0.0/16
```

### 2. Create a Subnet

```sh
aws ec2 create-subnet --vpc-id <VPC_ID> --cidr-block <CIDR_BLOCK>
```

Example:

```sh
aws ec2 create-subnet --vpc-id vpc-0abcd1234efgh5678 --cidr-block 10.0.1.0/24
```

### 3. Launch an EC2 Instance

```sh
aws ec2 run-instances --image-id <AMI_ID> --count 1 --instance-type <INSTANCE_TYPE> --key-name <KEY_PAIR_NAME> --subnet-id <SUBNET_ID> --security-group-ids <SECURITY_GROUP_ID>
```

Example:

```sh
aws ec2 run-instances --image-id ami-0abcdef1234567890 --count 1 --instance-type t2.micro --key-name MyKeyPair --subnet-id subnet-0abcd1234efgh5678 --security-group-ids sg-0abcd1234efgh5678
```

### 4. Create an Internet Gateway

```sh
aws ec2 create-internet-gateway
```

Example:

```sh
aws ec2 create-internet-gateway
```

### 5. Attach Internet Gateway to VPC

```sh
aws ec2 attach-internet-gateway --internet-gateway-id <IGW_ID> --vpc-id <VPC_ID>
```

Example:

```sh
aws ec2 attach-internet-gateway --internet-gateway-id igw-0abcd1234efgh5678 --vpc-id vpc-0abcd1234efgh5678
```

### 6. Create a Route Table

```sh
aws ec2 create-route-table --vpc-id <VPC_ID>
```

Example:

```sh
aws ec2 create-route-table --vpc-id vpc-0abcd1234efgh5678
```

### 7. Create a Route to the Internet Gateway

```sh
aws ec2 create-route --route-table-id <ROUTE_TABLE_ID> --destination-cidr-block 0.0.0.0/0 --gateway-id <IGW_ID>
```

Example:

```sh
aws ec2 create-route --route-table-id rtb-0abcd1234efgh5678 --destination-cidr-block 0.0.0.0/0 --gateway-id igw-0abcd1234efgh5678
```

### 8. Associate Route Table with Subnet

```sh
aws ec2 associate-route-table --subnet-id <SUBNET_ID> --route-table-id <ROUTE_TABLE_ID>
```

Example:

```sh
aws ec2 associate-route-table --subnet-id subnet-0abcd1234efgh5678 --route-table-id rtb-0abcd1234efgh5678
```

### 9. Allocate an Elastic IP Address

```sh
aws ec2 allocate-address --domain vpc
```

Example:

```sh
aws ec2 allocate-address --domain vpc
```

### 10. Associate Elastic IP Address with Instance

```sh
aws ec2 associate-address --instance-id <INSTANCE_ID> --allocation-id <ALLOCATION_ID>
```

Example:

```sh
aws ec2 associate-address --instance-id i-0abcd1234efgh5678 --allocation-id eipalloc-0abcd1234efgh5678
```

### 11. Create a Security Group

```sh
aws ec2 create-security-group --group-name <GROUP_NAME> --description <DESCRIPTION> --vpc-id <VPC_ID>
```

Example:

```sh
aws ec2 create-security-group --group-name MySecurityGroup --description "My security group" --vpc-id vpc-0abcd1234efgh5678
```

### 12. Add Inbound Rules to Security Group

```sh
aws ec2 authorize-security-group-ingress --group-id <SECURITY_GROUP_ID> --protocol <PROTOCOL> --port <PORT> --cidr <CIDR_BLOCK>
```

Example:

```sh
aws ec2 authorize-security-group-ingress --group-id sg-0abcd1234efgh5678 --protocol tcp --port 22 --cidr 0.0.0.0/0
```

### 13. Create a Load Balancer

```sh
aws elbv2 create-load-balancer --name <LOAD_BALANCER_NAME> --subnets <SUBNET_ID1> <SUBNET_ID2> --security-groups <SECURITY_GROUP_ID>
```

Example:

```sh
aws elbv2 create-load-balancer --name my-load-balancer --subnets subnet-0abcd1234efgh5678 subnet-0abcd1234ijkl8901 --security-groups sg-0abcd1234efgh5678
```

### 14. Create a Target Group

```sh
aws elbv2 create-target-group --name <TARGET_GROUP_NAME> --protocol HTTP --port 80 --vpc-id <VPC_ID>
```

Example:

```sh
aws elbv2 create-target-group --name my-targets --protocol HTTP --port 80 --vpc-id vpc-0abcd1234efgh5678
```

### 15. Register Targets with Target Group

```sh
aws elbv2 register-targets --target-group-arn <TARGET_GROUP_ARN> --targets Id=<INSTANCE_ID1> Id=<INSTANCE_ID2>
```

Example:

```sh
aws elbv2 register-targets --target-group-arn arn:aws:elasticloadbalancing:region:account-id:targetgroup/my-targets/abcd1234efgh5678 --targets Id=i-0abcd1234efgh5678 Id=i-0ijkl8901mnop2345
```

### 16. Create a Listener for the Load Balancer

```sh
aws elbv2 create-listener --load-balancer-arn <LOAD_BALANCER_ARN> --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=<TARGET_GROUP_ARN>
```

Example:

```sh
aws elbv2 create-listener --load-balancer-arn arn:aws:elasticloadbalancing:region:account-id:loadbalancer/app/my-load-balancer/abcd1234efgh5678 --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:region:account-id:targetgroup/my-targets/abcd1234efgh5678
```

## Additional Commands

- Describe VPCs

  ```sh
  aws ec2 describe-vpcs
  ```

- Describe Subnets

  ```sh
  aws ec2 describe-subnets
  ```

- Describe Instances

  ```sh
  aws ec2 describe-instances
  ```

- Describe Internet Gateways

  ```sh
  aws ec2 describe-internet-gateways
  ```

- Describe Route Tables

  ```sh
  aws ec2 describe-route-tables
  ```

- Describe Security Groups

  ```sh
  aws ec2 describe-security-groups
  ```

- Describe Load Balancers

  ```sh
  aws elbv2 describe-load-balancers
  ```

- Describe Target Groups
  ```sh
  aws elbv2 describe-target-groups
  ```

For more information, refer to the [AWS CLI Command Reference](https://docs.aws.amazon.com/cli/latest/reference/).
